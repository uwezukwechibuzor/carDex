package types

import (
	"fmt"
	"strconv"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		AuctionList: []Auction{},
		BidList:     []Bid{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in auction
	auctionIdMap := make(map[string]bool)
	auctionCount := gs.GetAuctionCount()
	for _, elem := range gs.AuctionList {
		if _, ok := auctionIdMap[elem.AuctionID]; ok {
			return fmt.Errorf("duplicated id for auction")
		}
		auctionID, _ := strconv.ParseUint(elem.AuctionID, 10, 64)
		if auctionID >= auctionCount {
			return fmt.Errorf("auction id should be lower or equal than the last id")
		}
		auctionIdMap[elem.AuctionID] = true
	}
	// Check for duplicated ID in bid
	bidIdMap := make(map[string]bool)
	bidCount := gs.GetBidCount()
	for _, elem := range gs.BidList {
		if _, ok := bidIdMap[elem.BidID]; ok {
			return fmt.Errorf("duplicated id for bid")
		}
		bidID, _ := strconv.ParseUint(elem.BidHash, 10, 64)
		if bidID >= bidCount {
			return fmt.Errorf("bid id should be lower or equal than the last id")
		}
		bidIdMap[elem.BidID] = true
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
