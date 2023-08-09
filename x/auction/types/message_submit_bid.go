package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSubmitBid = "submit_bid"

var _ sdk.Msg = &MsgSubmitBid{}

func NewMsgSubmitBid(creator string, bidID string, auctionID string, bidHash string) *MsgSubmitBid {
	return &MsgSubmitBid{
		Creator:   creator,
		BidID:     bidID,
		AuctionID: auctionID,
		BidHash:   bidHash,
	}
}

func (msg *MsgSubmitBid) Route() string {
	return RouterKey
}

func (msg *MsgSubmitBid) Type() string {
	return TypeMsgSubmitBid
}

func (msg *MsgSubmitBid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSubmitBid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSubmitBid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
