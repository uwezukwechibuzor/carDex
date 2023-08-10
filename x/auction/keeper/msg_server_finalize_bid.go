package keeper

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

// FinalizeBid executes and reveals bids after auction duration has ended in the CarDex Chain
func (k msgServer) FinalizeBid(goCtx context.Context, msg *types.MsgFinalizeBid) (*types.MsgFinalizeBidResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate the message creator
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Creator)
	}

	// concatenate a bidvalue and a bidder's address and convert it to bytes
	var bidValueBidderAddressBytes = []byte(msg.BidValue + msg.Creator)

	// find the hash of bidvalue and address
	var bidvalueBidderAdddressHash = sha256.Sum256(bidValueBidderAddressBytes)

	// convert the hash to a string
	var bidvalueBidderAdddressString = hex.EncodeToString(bidvalueBidderAdddressHash[:])

	// try getting a bid using the the hash of bid value and address
	bid, isFound := k.GetBid(ctx, bidvalueBidderAdddressString)
	// return an error if a bid doesn't exist
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Bid with that hash doesn't exists")
	}

	// Convert bid's BidHash to int64
	bidValue, err := strconv.ParseInt(bid.BidHash, 10, 64)
	if err != nil {
		return nil, sdkerrors.Wrapf(err, "Failed to convert BidHash: %s", bid.BidHash)
	}

	// fetch all existing bids in the store
	getAllBids := k.GetAllBid(ctx)

	highestBid := int64(0)

	for _, value := range getAllBids {
		otherBidValue, err := strconv.ParseInt(value.BidHash, 10, 64)
		if err != nil {
			return nil, sdkerrors.Wrapf(err, "Failed to convert BidHash: %s", value.BidHash)
		}

		// Check if the current bid value is greater than the highest bid seen so far
		if otherBidValue > highestBid {
			highestBid = otherBidValue
		}
	}

	// highestBid now contains the highest bid value
	if bidValue != highestBid {
		return nil, sdkerrors.Wrapf(err, "You are not the highest bidder: %s", bid.BidHash)
	}

	// get auction
	auction, _ := k.GetAuction(ctx, bid.AuctionID)

	// check that auction can not be finalised if auction duration has not ended
	if ctx.BlockHeight() < auction.CreatedAt+100 {
		return nil, sdkerrors.Wrapf(err, "Auction Duration has not ended yet: %d", auction.CreatedAt)
	}
	// update auction
	auction.Status = "closed"
	auction.Bid = msg.BidValue

	// transfer bid to the creator of the auction
	// parse tokens from a string to sdk.Coins
	bidAmount, err := sdk.ParseCoinsNormalized(msg.BidValue)
	if err != nil {
		panic(err)
	}

	// send tokens from a bidder's account to the seller
	sdkError := k.bankKeeper.SendCoins(ctx, sdk.AccAddress(msg.Creator), sdk.AccAddress(auction.Creator), bidAmount)
	if sdkError != nil {
		return nil, sdkError
	}

	// set to store
	k.SetAuction(ctx, auction.AuctionID, auction)

	// emit event
	err = ctx.EventManager().EmitTypedEvent(msg)

	return &types.MsgFinalizeBidResponse{}, err
}
