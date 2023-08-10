package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"
	"github.com/tendermint/tendermint/crypto/ed25519"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	carDexapp "github.com/uwezukwechibuzor/carDex/app"
	auctionKeeper "github.com/uwezukwechibuzor/carDex/x/auction/keeper"
	"github.com/uwezukwechibuzor/carDex/x/auction/types"
)

var (
	sellerAddress = sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	buyerAddress  = sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
)

// shared setup
type KeeperTestSuite struct {
	suite.Suite

	address       []sdk.AccAddress
	app           *carDexapp.CarDexApp
	ctx           sdk.Context
	auctionKeeper auctionKeeper.Keeper
	msgServer     types.MsgServer
}

func (suite *KeeperTestSuite) SetupTest() {
	suite.app = carDexapp.Setup(false)
	suite.ctx = suite.app.BaseApp.NewContext(false, tmproto.Header{})
	suite.auctionKeeper = suite.app.AuctionKeeper
	suite.msgServer = auctionKeeper.NewMsgServerImpl(suite.app.AuctionKeeper)

	suite.address = []sdk.AccAddress{sellerAddress, buyerAddress}
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}
