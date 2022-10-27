//
export const CheckCurrencyBalances =
`query{
    ethereum(network: bsc) {
        address(
            address: {in: $address}
        ) 
        {
            address
            balances(currency: { in: ["0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3"]}) {
                currency {
                    address
                    symbol
                }
                value
            }
        }
    }
}`;

// token list from wallet
export const CurrenciesInWallet = 
`query {
    ethereum(network: bsc) {
        address(address: {is: "$address"}) {
            balances {
                currency {
                    address
                    symbol
                    tokenType
                }
            value
        }
    }
}}`;

export const WalletTokens = 
`query
{
    ethereum(network: bsc) 
    {
        transfers(
            options: {desc: "block.timestamp.time", asc: "currency.symbol", limit: 50}, 
            date: {since: null, till: null}, amount: {gt: 0}, 
            sender: {is: "` + addr + `"})
        {
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
    }`;
