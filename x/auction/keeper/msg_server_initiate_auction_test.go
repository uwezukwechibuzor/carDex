package keeper_test

import (
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

func (suite *KeeperTestSuite) TestLogonInitiator() {
	type args struct {
		MsgInitiateAuction types.MsgInitiateAuction
	}

	type errArgs struct {
		shouldPass bool
		contains   string
	}

	tests := []struct {
		name    string
		args    args
		errArgs errArgs
	}{
		{
			"Valid Auction Initiated",
			args{
				MsgInitiateAuction: types.MsgInitiateAuction{
					Creator:         suite.address[0].String(),
					AuctionID:       "dgehhhshs",
					MinimumBid:      "100",
					Bid:             "",
					AuctionDuration: "12",
					CarDescription:  "Very Good",
					CarPictureUrl:   "",
					Status:          "open",
					CreatedAt:       10,
				},
			},
			errArgs{
				shouldPass: true,
				contains:   "",
			},
		}, {
			"InValid Account Address",
			args{
				MsgInitiateAuction: types.MsgInitiateAuction{
					Creator:         "ddddd",
					AuctionID:       "dgehhhshs",
					MinimumBid:      "100",
					Bid:             "",
					AuctionDuration: "12",
					CarDescription:  "Very Good",
					CarPictureUrl:   "",
					Status:          "open",
					CreatedAt:       10,
				},
			},
			errArgs{
				shouldPass: true,
				contains:   "",
			},
		},
	}

	for _, tc := range tests {
		suite.Run(tc.name, func() {
			suite.SetupTest()

			if tc.errArgs.shouldPass {

			} else {

			}
		})
	}
}
