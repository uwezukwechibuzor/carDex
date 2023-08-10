package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

// InitiateAuction is used by the seller to initiate an auction with the some initial parameters on CarDex Chain
func (k msgServer) InitiateAuction(goCtx context.Context, msg *types.MsgInitiateAuction) (*types.MsgInitiateAuctionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Validate the message creator
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Creator)
	}

	// check that auctionID does not exist yet
	auction, found := k.GetAuction(ctx, msg.AuctionID)
	if found {
		return nil, sdkerrors.Wrapf(types.ErrAuctionExists, "Auction: %s", &auction)
	}

	newAuction := types.Auction{
		AuctionID:       msg.AuctionID,
		MinimumBid:      msg.MinimumBid,
		Bid:             msg.Bid,
		AuctionDuration: msg.AuctionDuration,
		CarDescription:  msg.CarDescription,
		CarPictureUrl:   msg.CarPictureUrl,
		Status:          msg.Status,
		CreatedAt:       msg.CreatedAt,
		Creator:         msg.Creator,
	}

	// set status to OPEN at the point of initiating the auction
	newAuction.Status = "open"

	// bidding should not be possible if it exceeds more than 100 blocks from the point the auction was initiated
	newAuction.CreatedAt = ctx.BlockHeight()

	// set to store
	k.SetAuction(ctx, msg.AuctionID, newAuction)

	// emit event
	err = ctx.EventManager().EmitTypedEvent(msg)

	return &types.MsgInitiateAuctionResponse{}, err
}
