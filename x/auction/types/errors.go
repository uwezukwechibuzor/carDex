package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/auction module sentinel errors
const (
	errSample uint32 = iota + 101
	errAuctionExists
	errAuctionDoesNotExists
	errBidExists
	errBidIsLessThanMinimum
	errNotAllowedToBid
	errAuctionDurationIsOver
)

var (
	ErrSample                = sdkerrors.Register(ModuleName, errSample, "sample error")
	ErrAuctionExists         = sdkerrors.Register(ModuleName, errAuctionExists, "auction exists already")
	ErrAuctionDoesNotExists  = sdkerrors.Register(ModuleName, errAuctionDoesNotExists, "auction does not exist")
	ErrBidExists             = sdkerrors.Register(ModuleName, errBidExists, "bid exists already")
	ErrBidIsLessThanMinimum  = sdkerrors.Register(ModuleName, errBidIsLessThanMinimum, "bid is less than the minimum")
	ErrNotAllowedToBid       = sdkerrors.Register(ModuleName, errNotAllowedToBid, "creator of auction is not allowed to bid")
	ErrAuctionDurationIsOver = sdkerrors.Register(ModuleName, errAuctionDurationIsOver, "placing bids are not allowed once the auction duration is over")
)
