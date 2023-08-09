package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "github.com/uwezukwechibuzor/carDex/testutil/keeper"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.AuctionKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
