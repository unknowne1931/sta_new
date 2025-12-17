import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 20 },
    { name: "Apr", value: 27 },
    { name: "May", value: 18 },
    { name: "Jun", value: 23 },
    { name: "Jul", value: 34 },
];

export default function BarGraph() {
    return (
        <>
            <div className="bar-graph-cnt-main">

                <div className="bar-graph-cnt_main_sub">
                    <h2>Monthly Sales Data</h2>

                    <div style={{ width: "100%", height: 400 }}>
                        <ResponsiveContainer>
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                {/* <CartesianGrid strokeDasharray="none" /> */}
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 10, 10]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </>
    );
}










