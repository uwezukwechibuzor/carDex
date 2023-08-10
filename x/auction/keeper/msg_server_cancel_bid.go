package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

// CancelBid cancels bid in the CarDex Chain
func (k msgServer) CancelBid(goCtx context.Context, msg *types.MsgCancelBid) (*types.MsgCancelBidResponse, error) {
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

	// check that allows bid to be cancelled only during the auction duration
	auction, _ := k.GetAuction(ctx, bid.AuctionID)
	if bid.CreatedAt < auction.CreatedAt+100 {
		return nil, sdkerrors.Wrapf(err, "you are not allowed to cancel bids that the auction duration has expired %s", &auction)
	}

	// set to store
	k.RemoveBid(ctx, msg.BidID)

	// emit event
	err = ctx.EventManager().EmitTypedEvent(msg)

	return &types.MsgCancelBidResponse{}, err
}
