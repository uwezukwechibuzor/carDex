package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/uwezukwechibuzor/carDex/testutil/keeper"
	"github.com/uwezukwechibuzor/carDex/x/auction/keeper"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.AuctionKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
