package helpers

import (
	"crypto/rand"
	"math/big"

	"github.com/uwezukwechibuzor/carDex/utils"
)

// randomly generate unique string
func GenerateRandomString(length int) (string, error) {
	b := make([]byte, length)
	for i := range b {
		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(utils.NameChars))))
		if err != nil {
			return "", err
		}
		b[i] = utils.NameChars[n.Int64()]
	}
	return string(b), nil
}
