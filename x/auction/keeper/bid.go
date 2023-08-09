package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

// GetBidCount get the total number of bid
func (k Keeper) GetBidCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.BidCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetBidCount set the total number of bid
func (k Keeper) SetBidCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.BidCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// SetBid set a specific bid in the store
func (k Keeper) SetBid(ctx sdk.Context, bidID string, bid types.Bid) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BidKey))
	key := []byte(bidID)
	b := k.cdc.MustMarshal(&bid)
	store.Set(key, b)
}

// GetBid returns a bid from its id
func (k Keeper) GetBid(ctx sdk.Context, bidID string) (val types.Bid, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BidKey))
	key := []byte(bidID)
	b := store.Get(key)
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveBid removes a bid from the store
func (k Keeper) RemoveBid(ctx sdk.Context, bidID string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BidKey))
	key := []byte(bidID)
	store.Delete(key)
}

// GetAllBid returns all bid
func (k Keeper) GetAllBid(ctx sdk.Context) (list []types.Bid) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BidKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Bid
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetBidIDBytes returns the byte representation of the ID
func GetBidIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetBidIDFromBytes returns ID in uint64 format from a byte array
func GetBidIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}
