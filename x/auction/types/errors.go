package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/auction module sentinel errors
const (
	errSample uint32 = iota + 101
	errAuctionExists
)

var (
	ErrSample        = sdkerrors.Register(ModuleName, errSample, "sample error")
	ErrAuctionExists = sdkerrors.Register(ModuleName, errAuctionExists, "auction exists already")
)
