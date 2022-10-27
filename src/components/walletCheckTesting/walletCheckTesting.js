import { useState, useEffect } from 'react';

const walletCheckTest = (wallet_address) => {
  const [walletTransactions, setWalletTransactions] = useState([])
  useEffect(async () => {
    var transactions1 = []
    var transactions2 = []
    let query = `
      query
      {
        ethereum(network: bsc) {
          transfers(options: {desc: "block.timestamp.time", asc: "currency.symbol", limit: 50}, date: {since: null, till: null}, amount: {gt: 0}, receiver: {is: "` + wallet_address + `"}) {
              block {
                timestamp {
                  time(format: "%Y-%m-%d %H:%M:%S")
                }
                height
              }
              address: sender {
                address
                annotation
              }
              currency {
                address
                symbol
              }
              amount
              amountInUSD: amount (in:USD)
                hash
              }
              external
            }
          }
        }
      ` ;

    let url = "https://graphql.bitquery.io/";
    let opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYAzTjV2d6TaeXhGjpj2tf6FnRRzBU7"
      },
      body: JSON.stringify({
        query
      })
    };
    let mounted = true;
    await fetch(url, opts)
      .then(res => res.json())
      .then(result => {
        if (mounted) {
          console.log('wallet-transaction-query-data1', query, result)
          let arr = result.data.ethereum.transfers
          for (let index = 0; index < arr.length; index++) {
            let temp = {}
            temp["id"] = arr[index].transaction.hash
            temp["date"] = arr[index].block.timestamp.time
            temp["from"] = arr[index].address.address
            temp["to"] = wallet_address
            temp["tokenaddress"] = arr[index].currency.address
            temp["symbol"] = arr[index].currency.symbol
            temp["amount"] = arr[index].amount
            temp["amountinusd"] = arr[index].amountInUSD
            temp["direction"] = "receive"

            transactions1.push(temp)
          }
          console.log('wallet-transactions2-----receive:', transactions1)
          setWalletTransactions(transactions1)
        }
      }).catch(console.error);
    query = `
      query
      {
        ethereum(network: bsc) {
          transfers(options: {desc: "block.timestamp.time", asc: "currency.symbol", limit: 50}, date: {since: null, till: null}, amount: {gt: 0}, sender: {is: "` + wallet_address + `"}) {
            block {
              timestamp {
                time(format: "%Y-%m-%d %H:%M:%S")
              }
              height
            }
            address: receiver {
              address
              annotation
            }
            currency {
              address
              symbol
            }
            amount
            amountInUSD: amount (in:USD)
            transaction {
              hash
            }
            external
          }
        }
      }
      ` ;

    url = "https://graphql.bitquery.io/";
    opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYAxReidkpahNsBUrHdRYfjUs5Ng7lD"
      },
      body: JSON.stringify({
        query
      })
    };

    // await fetch(url, opts)
    //   .then(res => res.json())
    //   .then(result => {
    //     if (mounted) {
    //       //console.log('wallet-transaction-query-data222', query, result)
    //       let arr = result.data.ethereum.transfers
    //       for (let index = 0; index < arr.length; index++) {
    //         let temp = {}
    //         temp["id"] = arr[index].transaction.hash
    //         temp["date"] = arr[index].block.timestamp.time
    //         temp["from"] = wallet_address
    //         temp["to"] = arr[index].address.address
    //         temp["tokenaddress"] = arr[index].currency.address
    //         temp["symbol"] = arr[index].currency.symbol
    //         temp["amount"] = arr[index].amount
    //         temp["amountinusd"] = arr[index].amountInUSD
    //         temp["direction"] = "send"

    //         transactions2.push(temp)
    //       }
    //       //console.log('wallet-transactions-----2send:', transactions2)
    //     }
    //   }).catch(console.error);

    if (mounted) {
      var transactions = transactions1.concat(transactions2)
        .sort((a, b) => {
          return (new Date(b.date) - new Date(a.date))
        })
      //console.log('transactions-----sorted---', transactions)
      setWalletTransactions(transactions)
    }

    return (() => mounted = false)
  }, [wallet_address])

  return walletTransactions
}

export default walletCheckTest
