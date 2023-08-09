package cli

import (
	"crypto/sha256"
	"encoding/hex"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

var _ = strconv.Itoa(0)

func CmdSubmitBid() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "submit-bid [auction-id] [bid-value]",
		Short: "Broadcast message submit-bid",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			argAuctionID := args[0]

			argBidValue := args[1]
			// find a hash of the bid value
			// this ensures the bid Values are sealed(encrypted) until auction expires
			bidHash := sha256.Sum256([]byte(argBidValue))
			// convert the Bid hash to string
			bidHashString := hex.EncodeToString(bidHash[:])

			// generate strings for every new bid
			// this should be the hash of the pubkey and bidValue
			// convert a bidder's address to string
			var bidderAddress = clientCtx.GetFromAddress().String()
			// find the hash of bid value and bidder's address
			var bidValuebidderAddressHash = sha256.Sum256([]byte(argBidValue + bidderAddress))
			// convert the hash to string
			var bidValueBidderAddressHashString = hex.EncodeToString(bidValuebidderAddressHash[:])
			argBidID := bidValueBidderAddressHashString

			msg := types.NewMsgSubmitBid(
				clientCtx.GetFromAddress().String(),
				argBidID,
				argAuctionID,
				bidHashString,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
