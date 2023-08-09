package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

// GetAuctionCount get the total number of auction
func (k Keeper) GetAuctionCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.AuctionCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetAuctionCount set the total number of auction
func (k Keeper) SetAuctionCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.AuctionCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// SetAuction set a specific auction in the store
func (k Keeper) SetAuction(ctx sdk.Context, auctionID string, auction types.Auction) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AuctionKey))
	key := []byte(auctionID)
	b := k.cdc.MustMarshal(&auction)
	store.Set(key, b)
}

// GetAuction returns a auction from its id
func (k Keeper) GetAuction(ctx sdk.Context, auctionID string) (val types.Auction, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AuctionKey))
	key := []byte(auctionID)
	b := store.Get(key)
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveAuction removes a auction from the store
func (k Keeper) RemoveAuction(ctx sdk.Context, auctionID string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AuctionKey))
	key := []byte(auctionID)
	store.Delete(key)
}

// GetAllAuction returns all auction
func (k Keeper) GetAllAuction(ctx sdk.Context) (list []types.Auction) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.AuctionKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Auction
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetAuctionIDBytes returns the byte representation of the ID
func GetAuctionIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetAuctionIDFromBytes returns ID in uint64 format from a byte array
func GetAuctionIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
