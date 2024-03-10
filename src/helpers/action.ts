import { NavigateFunction } from "react-router-dom";
import { Data } from "../components/Table/Table";

export const action = (navigate: NavigateFunction) => (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Data) => {
    const rowPath = `${row.id}`;
    e.stopPropagation();
    navigate(rowPath, { state: { rowData: row } });
};