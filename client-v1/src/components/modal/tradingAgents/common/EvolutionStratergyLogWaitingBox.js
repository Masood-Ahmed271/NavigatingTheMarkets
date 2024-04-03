import ColumnsTable from "views/admin/dataTables/components/DevelopmentTable";
import { columnsDataColumns } from "./dataTables/variables/columnsData";

import Card from "components/card/Card";
export default function LogWaitingBox(props) {
    const usefullLogs = [];
    if (props.logs.length) {
        props.logs.forEach((log, index) => {
            if (
                (log.action !== "none" || index === 0) &&
                index !== props.logs.length - 1
            ) {
                usefullLogs.push({
                    day: log.day,
                    action: log.action,
                    balance: Math.round(log.balance),
                    invest: Math.round(log.invest) || 0,
                    units: Math.round(log.units),
                });
            }
        });
        // console.log(usefullLogs);
    }
    if (!usefullLogs.length) {
        usefullLogs.push({
            day: "...",
            action: "...",
            balance: "...",
            invest: "...",
            units: "...",
        });
    }
    return (
        <Card style={{ border: "1px solid gray" }}>
            <ColumnsTable
                columnsData={[
                    {
                        Header: "DAY",
                        accessor: "day",
                    },
                    {
                        Header: "ACTION",
                        accessor: "action",
                    },

                    {
                        Header: "BALANCE",
                        accessor: "balance",
                    },
                    {
                        Header: "INVEST",
                        accessor: "invest",
                    },
                    {
                        Header: "UNITS",
                        accessor: "units",
                    },
                ]}
                tableData={usefullLogs}
            />
        </Card>
    );
}
