package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgFinalizeBid = "finalize_bid"

var _ sdk.Msg = &MsgFinalizeBid{}

func NewMsgFinalizeBid(creator string, bidValue string) *MsgFinalizeBid {
	return &MsgFinalizeBid{
		Creator:  creator,
		BidValue: bidValue,
	}
}

func (msg *MsgFinalizeBid) Route() string {
	return RouterKey
}

func (msg *MsgFinalizeBid) Type() string {
	return TypeMsgFinalizeBid
}

func (msg *MsgFinalizeBid) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgFinalizeBid) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgFinalizeBid) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
