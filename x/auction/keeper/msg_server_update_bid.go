package keeper

import (
	"context"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

func (k msgServer) UpdateBid(goCtx context.Context, msg *types.MsgUpdateBid) (*types.MsgUpdateBidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate the message creator
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Creator)
	}

	// check that this bid exist
	bid, found := k.GetBid(ctx, msg.BidID)
	if !found {
		return nil, sdkerrors.Wrapf(err, "Bid does not exist: %s", &bid)
	}

	// check that only the bid owner can update the bid
	if bid.Creator != msg.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %s user not allowed to submit bid", msg.Creator))
	}

	// check that auctionID exists
	auction, found := k.GetAuction(ctx, msg.AuctionID)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrAuctionDoesNotExists, "Auction: %s", &auction)
	}

	// Convert the strings to int64
	bidValue, err := strconv.ParseInt(msg.BidHash, 10, 64)
	if err != nil {
		return nil, sdkerrors.Wrapf(err, "Failed to convert BidHash: %s to int64", bid.BidHash)
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
	// updating is only allowed if auction duration has not expired
	if bid.CreatedAt > auction.CreatedAt+100 {
		return nil, sdkerrors.Wrapf(types.ErrAuctionDurationIsOver, "Bid: %s", &bid)
	}

	// update the bid
	bid.BidID = msg.BidID
	bid.AuctionID = msg.AuctionID
	bid.BidHash = msg.BidHash
	bid.Creator = msg.Creator
	bid.CreatedAt = ctx.BlockHeight()

	// emit event
	err = ctx.EventManager().EmitTypedEvent(msg)

	return &types.MsgUpdateBidResponse{}, err
}
