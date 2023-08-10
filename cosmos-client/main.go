package main

import (
	"context"
	"fmt"
	"log"

	// importing the types package of your blog blockchain
	"github.com/ignite/cli/ignite/pkg/cosmosclient"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
	// importing the general purpose Cosmos blockchain client
)

func main() {

	// create an instance of cosmosclient
	cosmos, err := cosmosclient.New(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	// account `alice` was initialized during `ignite chain serve`
	accountName := "alice"

	// get account from the keyring by account name and return a bech32 address
	address, err := cosmos.Address(accountName)
	if err != nil {
		log.Fatal(err)
	}

	// define a message
	msg := &types.MsgInitiateAuction{
		Creator:         address.String(),
		AuctionID:       "dhhdhhsss",
		MinimumBid:      "40",
		Bid:             "",
		AuctionDuration: "19",
		CarDescription:  "A good car is available for sell",
		CarPictureUrl:   "https://iimagesssssss.png",
		Status:          "open",
		CreatedAt:       10,
	}

	// broadcast a transaction from account `alice` with the message to create an auction
	// store response in txResp
	txResp, err := cosmos.BroadcastTx(accountName, msg)
	if err != nil {
		log.Fatal(err)
	}

	// print response from broadcasting a transaction
	fmt.Print("MsgInitiateAuction:\n\n")
	fmt.Println(txResp)

	// instantiate a query client for your `carDex` blockchain
	queryClient := types.NewQueryClient(cosmos.Context())

	// query the blockchain using the client's `auction` method to get all auctions
	queryResp, err := queryClient.Auction(context.Background(), &types.QueryGetAuctionRequest{})
	if err != nil {
		log.Fatal(err)
	}

	// print response from querying all the auctions
	fmt.Print("\n\nAll posts:\n\n")
	fmt.Println(queryResp)
}
