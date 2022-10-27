import React, { useState, useEffect } from "react";
import TableView from "./tableView";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const WalletList = () => {

    const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    const [endDate, setEndDate] = useState(new Date());
    const [filteredWallets, setFilteredWallet] = useState([]);
    const [longHoldWallets, setLongHoldWallets] = useState([]);
    const [shortHoldWallets, setShortHoldWallets] = useState([]);
    const [longTermData, setLongTermData] = useState([]);
    const [shortTermData, setShortTermData] = useState([]);
    const wallets = [
        '0x769794015c674aAf292b12DF0b7315cf100539C5',
        '0x8f0AAfFcfDFfC4Bfc168Dd739A23BF360E1844f6',
        '0x36b34a9A0090c52aE48532c421f6C99eF9E42478',
    ];

    let avaWallets = [];
    let shortHolders = [];
    let longHolders = [];

    const url = "https://graphql.bitquery.io/";

    const fliterWallets = async () => {
        avaWallets = [];
        for (let j = 0; j < wallets.length; j++) {
            let query =
                `query {
                    ethereum(network: bsc){
                        address(address: {is: "` + wallets[j] + `"}) {
                            balances {
                                currency {
                                    address
                                    symbol
                                    tokenType
                                }
                                value
                            }
                        }
                    }
                }`

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

            await fetch(url, opts)
                .then(res => res.json())
                .then(result => {
                    let arr = result.data.ethereum.address[0].balances;
                    for (let index = 0; index < arr.length; index++) {
                        let temp = {};
                        temp["symbol"] = arr[index].currency.symbol;
                        temp["amount"] = arr[index].value;

                        if (temp["symbol"] == "BNB" && temp["amount"] > 0) {
                            if (avaWallets.indexOf(wallets[j]) == -1) {
                                avaWallets.push(wallets[j]);
                            }

                        }
                    }
                    setFilteredWallet(avaWallets);
                })
                .catch(console.error);
        }
    }

    useEffect(() => {
        fliterWallets();
    }, []);

    useEffect(() => {
        async function getWalletList() {
            for (let i = 0; i < filteredWallets.length; i++) {
                let query =
                    `query
                {
                    ethereum(network: bsc) 
                    {
                        transfers(
                            options: {desc: "block.timestamp.time", asc: "currency.symbol", limit: 50}, 
                            date: {since: null, till: null}, amount: {gt: 0}, 
                            sender: {is: "` + wallets[i] + `"}){
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

                await fetch(url, opts)
                    .then(res => res.json())
                    .then(result => {
                        let transSTemp = [];
                        let transLTemp = [];
                        let arr = result.data.ethereum.transfers;
                        for (let index = 0; index < arr.length; index++) {
                            let temp = {};
                            temp["id"] = arr[index].transaction.hash;
                            temp["date"] = arr[index].block.timestamp.time;
                            temp["sender"] = arr[index].address.address;
                            temp["receiver"] = wallets[i];
                            temp["tokenaddress"] = arr[index].currency.address;
                            temp["symbol"] = arr[index].currency.symbol;
                            temp["amount"] = arr[index].amount;
                            temp["amountinusd"] = arr[index].amountInUSD;
                            temp["direction"] = "receive";

                            let d = new Date();
                            let m = new Date(d.setMonth(d.getMonth() - 1));

                            const isBe = moment(new Date(temp["date"])).isBetween(m, d, 'days', '[]');
                            const islong = moment(new Date(temp["date"])).isBefore(m);

                            if (isBe) {
                                if (temp["symbol"] == "BNB") {
                                    transSTemp.push(temp);
                                }
                            } else if (islong) {
                                if (temp["symbol"] == "BNB") {
                                    transLTemp.push(temp);
                                }
                            }
                        }

                        //longest wallet
                        transSTemp.sort(function (a, b) {
                            return new Date(a.date) - new Date(b.date)
                        });

                        //shortest wallet
                        transLTemp.sort(function (a, b) {
                            return new Date(a.date) - new Date(b.date);
                        });

                        if (transSTemp.length > 0) {
                            shortHolders.push(transSTemp[0]);
                        }

                        if (transLTemp.length > 0) {
                            longHolders.push(transLTemp[0]);
                        }

                        // remove wallet from shortterm arry if already exists in longterm
                        // longHolders.map(tran => {
                        //     shortHolders = shortHolders.filter(add => { console.log('add = ', add.receiver); add.receiver == tran.receiver})
                        // });

                        setShortHoldWallets(shortHolders);
                        setLongHoldWallets(longHolders);
                    })
                    .catch(console.error);
            }
        }

        getWalletList();
    }, [filteredWallets, startDate, endDate]);

    const makeGraphData = (data) => {
        const groups = data.reduce((groups, game) => {
            const date = game.date.split(' ')[0];
            if (!groups[date]) {
                groups[date] = 0;
            }
            groups[date]++;
            return groups;
        }, {});

        const resultArrays = Object.keys(groups).map((date) => {
            return {
                date,
                walletCounts: groups[date]
            };
        });

        return resultArrays;
    }

    useEffect(() => {
        setShortTermData(makeGraphData(shortHoldWallets));
        setLongTermData(makeGraphData(longHoldWallets));
    }, [shortHoldWallets, longHoldWallets]);

    return (
        <div className="walletListContainer">
            <div className="datePickerContainer">
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>
            <TableView data={longTermData} title="Long-Term Wallets"/>
            <TableView data={shortTermData} title="Short-Term Wallets"/>
        </div>
    );
}

export default WalletList;