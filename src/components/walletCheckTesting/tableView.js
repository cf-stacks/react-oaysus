import React from "react";
import { ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

function TableView(props) {
    // const columns = React.useMemo(
    //     () => [
    //         {
    //             Header: 'Date',
    //             accessor: 'date',
    //         },
    //     ],
    //     [],
    // )

   const tempData = [
        {
            "date": "2022-05-06",
            "walletCounts": 3432
        },
        {
            "date": "2022-05-09",
            "walletCounts": 343
        },
        {
            "date": "2022-05-12",
            "walletCounts": 32
        },
        {
            "date": "2022-05-15",
            "walletCounts": 312
        },
        {
            "date": "2022-05-16",
            "walletCounts": 123
        },
        {
            "date": "2022-05-20",
            "walletCounts": 982
        },
        {
            "date": "2022-05-25",
            "walletCounts": 520
        },
        {
            "date": "2022-05-26",
            "walletCounts": 332
        },
        {
            "date": "2022-05-30",
            "walletCounts": 2232
        },
    ]; 

    // const shortestData = props.shortWallets;
    const data = props.data;

    return (
        <div>
            <div>
                <h2>{props.title}</h2>
            </div>
            <div>
                <div>
                    <ResponsiveContainer width="80%" height={300}>
                        <LineChart data={data.length > 0 ? data: tempData} margin={{ top: 15, right: 20, bottom: 15, left: 20 }}>
                            <Tooltip />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Legend />
                            <Line type="monotone" dataKey="walletCounts" stroke="#3334d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default TableView;