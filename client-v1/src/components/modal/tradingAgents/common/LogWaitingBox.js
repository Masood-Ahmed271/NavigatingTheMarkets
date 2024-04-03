import ColumnsTable from "views/admin/dataTables/components/DevelopmentTable";
import { columnsDataColumns } from "./dataTables/variables/columnsData";

import Card from "components/card/Card";
export default function LogWaitingBox(props) {
    const usefullLogs = [];
    if (props.logs.length) {
        props.logs.forEach((log, index) => {
            if (log.action !== "none" || index === 0) {
                usefullLogs.push({
                    date: log.date,
                    day: log.day,
                    inventory: log.inventory,
                    action: log.action,
                    balance: Math.round(log.balance),
                    current_action_price: Math.round(log.current_action_price),
                    current_unit_price: Math.round(log.current_unit_price),
                });
            }
        });
        // console.log(usefullLogs);
    }
    if (!usefullLogs.length) {
        usefullLogs.push({
            date: "...",
            day: "...",
            inventory: "...",
            action: "...",
            balance: "...",
            current_action_price: "...",
            current_unit_price: "...",
        });
    }
    return (
        <Card style={{ border: "1px solid gray" }}>
            <ColumnsTable
                columnsData={columnsDataColumns}
                tableData={usefullLogs}
            />
        </Card>
    );
}
