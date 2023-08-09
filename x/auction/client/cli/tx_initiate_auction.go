package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

var _ = strconv.Itoa(0)

func CmdInitiateAuction() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "initiate-auction [auction-id] [minimum-bid] [bid] [auction-duration] [car-description] [car-picture-url] [status]",
		Short: "Broadcast message initiate-auction",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argAuctionID := args[0]
			argMinimumBid := args[1]
			argBid := args[2]
			argAuctionDuration := args[3]
			argCarDescription := args[4]
			argCarPictureUrl := args[5]
			argStatus := args[6]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgInitiateAuction(
				clientCtx.GetFromAddress().String(),
				argAuctionID,
				argMinimumBid,
				argBid,
				argAuctionDuration,
				argCarDescription,
				argCarPictureUrl,
				argStatus,
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
