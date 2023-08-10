package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

func (k msgServer) SubmitBid(goCtx context.Context, msg *types.MsgSubmitBid) (*types.MsgSubmitBidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate the message creator
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Creator)
	}

	// check that auctionID exists
	auction, found := k.GetAuction(ctx, msg.AuctionID)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrAuctionDoesNotExists, "Auction: %s", &auction)
	}

	// creator of auction is not allowed to bid
	if auction.Creator == msg.Creator {
		return nil, sdkerrors.Wrapf(types.ErrNotAllowedToBid, "Creator: %s", msg.Creator)
	}

	// check that this bid does not exist yet
	bid, found := k.GetBid(ctx, msg.BidID)
	if found {
		return nil, sdkerrors.Wrapf(types.ErrBidExists, "Bid: %s", &bid)
	}

	newBid := types.Bid{
		BidID:     msg.BidID,
		AuctionID: msg.AuctionID,
		BidHash:   msg.BidHash,
		Creator:   msg.Creator,
		CreatedAt: ctx.BlockHeight(),
	}

	// Convert the strings to int64
	bidValue, err := strconv.ParseInt(newBid.BidHash, 10, 64)
	if err != nil {
		return nil, sdkerrors.Wrapf(err, "Failed to convert BidHash: %s to int64", newBid.BidHash)
	}

	minBidValue, err := strconv.ParseInt(auction.MinimumBid, 10, 64)
	if err != nil {
		return nil, sdkerrors.Wrapf(err, "Failed to convert MinimumBid: %s to int64", auction.MinimumBid)
	}

	// Check that the bid value is not less than the minimum bid
	// Compare the int64 values
	if bidValue < minBidValue {
		return nil, sdkerrors.Wrapf(types.ErrBidIsLessThanMinimum, "Bid: %s", msg.BidHash)
	}

	// Check if the bid creation time is older than the auction initiation time.
	// If more than 100 blocks, then return error
	if newBid.CreatedAt > auction.CreatedAt+100 {
		return nil, sdkerrors.Wrapf(types.ErrAuctionDurationIsOver, "Bid: %s", &bid)
	}

	// set to store
	k.SetBid(ctx, msg.BidID, newBid)

	// emit event
	err = ctx.EventManager().EmitTypedEvent(msg)

	return &types.MsgSubmitBidResponse{}, err
}
