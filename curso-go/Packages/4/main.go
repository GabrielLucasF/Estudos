package main

import (
	"encoding/json"
	"os"
)

type Account struct {
	Number int `json:"n"`
	Amount int `json:"a"`
}

func main() {
	a := Account{Number: 1, Amount: 100}
	res, err := json.Marshal(a)
	if err != nil {
		println(err)
	}
	println(string(res))

	err = json.NewEncoder(os.Stdout).Encode(a)
	if err != nil {
		println(err)
	}

	jsonAcc := []byte(`{"n":2,"a":200}`)
	var acc Account
	err = json.Unmarshal(jsonAcc, &acc)
	if err != nil {
		println(err)
	}
	println(acc.Amount)
}
