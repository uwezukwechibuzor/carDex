package auction

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/uwezukwechibuzor/carDex/x/auction/keeper"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the auction
	for _, elem := range genState.AuctionList {
		k.SetAuction(ctx, elem.AuctionID, elem)
	}

	// Set auction count
	k.SetAuctionCount(ctx, genState.AuctionCount)
	// Set all the bid
	for _, elem := range genState.BidList {
		k.SetBid(ctx, elem.BidID, elem)
	}

	// Set bid count
	k.SetBidCount(ctx, genState.BidCount)
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.AuctionList = k.GetAllAuction(ctx)
	genesis.AuctionCount = k.GetAuctionCount(ctx)
	genesis.BidList = k.GetAllBid(ctx)
	genesis.BidCount = k.GetBidCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
