package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"github.com/uwezukwechibuzor/carDex/utils/helpers"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

var _ = strconv.Itoa(0)

func CmdInitiateAuction() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "initiate-auction [minimum-bid] [car-description] [car-picture-url]",
		Short: "Broadcast message initiate-auction",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			// auto generate AuctionID
			argAuctionID, _ := helpers.GenerateRandomString(10)

			argMinimumBid := args[0]

			// Bid should be set after the auction duration has ended
			argBid := ""

			argCarDescription := args[1]
			argCarPictureUrl := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgInitiateAuction(
				clientCtx.GetFromAddress().String(),
				argAuctionID,
				argMinimumBid,
				argBid,
				argCarDescription,
				argCarPictureUrl,
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
