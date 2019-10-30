package main

import (
    "fmt"
    "log"
    "math/big"

    "github.com/ethereum/go-ethereum/common"
    "github.com/ethereum/go-ethereum/ethclient"
    voting ".." // for demo
)

func main() {
    // client, err := ethclient.Dial("http://localhost:8545")
    client, err := ethclient.Dial("wss://rinkeby.infura.io/ws")
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("we have a connection")

    address := common.HexToAddress("0x1aCD8BB03f31dc10Fbf36ae4C5c206A7F898e627")
    instance, err := voting.NewVoting(address, client)
    if err != nil {
      log.Fatal(err)
    }

    // example vote initiated around rinkeby block 4053976
    block := big.NewInt(4053976)
    account := common.HexToAddress("0x7b6C819e9db25c302A9adD821361bB95524023D7")
    weight, err := instance.GetVoterWeightAtBlock(nil, block, account)
    // weight, err := instance.GetVoterWeight(nil, account)
    if err != nil {
      log.Fatal(err)
    }

    // the account's vote weight at designated block
    fmt.Println(weight)

    // totalWeight, err := instance.GetTotalVoterWeight(nil)
    totalWeight, err := instance.GetTotalVoterWeightAtBlock(nil, block)
    if err != nil {
      log.Fatal(err)
    }

    // the total vote weight at designated block (denominator for calculating quorum)
    fmt.Println(totalWeight)

}
