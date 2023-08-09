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

func CmdUpdateBid() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-bid [bid-id] [auction-id] [bid-value]",
		Short: "Broadcast message update-bid",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			argBidID := args[0]
			argAuction := args[1]
			argBidValue := args[2]
			// find a hash of the bid value
			// this ensures the bid Values are sealed(encrypted) until auction expires
			// when updating, this also seals the bidvalue
			bidHash := sha256.Sum256([]byte(argBidValue))
			// convert the Bid hash to string
			bidHashString := hex.EncodeToString(bidHash[:])

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateBid(
				clientCtx.GetFromAddress().String(),
				argBidID,
				argAuction,
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
