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

func CmdSubmitBid() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "submit-bid [bid-id] [auction-id] [bid-hash]",
		Short: "Broadcast message submit-bid",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argBidID := args[0]
			argAuctionID := args[1]
			argBidHash := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSubmitBid(
				clientCtx.GetFromAddress().String(),
				argBidID,
				argAuctionID,
				argBidHash,
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
