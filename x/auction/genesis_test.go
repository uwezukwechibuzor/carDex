package auction_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "github.com/uwezukwechibuzor/carDex/testutil/keeper"
	"github.com/uwezukwechibuzor/carDex/testutil/nullify"
	"github.com/uwezukwechibuzor/carDex/x/auction"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.AuctionKeeper(t)
	auction.InitGenesis(ctx, *k, genesisState)
	got := auction.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
