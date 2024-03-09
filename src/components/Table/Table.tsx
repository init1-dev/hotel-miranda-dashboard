import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

type Column = {
    label: string;
    value?: string;
    display?: ((row: Data) => string);
};

export type Data = {
    [key: string]: string | number | boolean | Array<string>;
};

type TableProps = {
    columns: Column[];
    data: Data[];
};

const Table = ({ columns, data }:TableProps) => {
    const selectedData = data.slice(0, 10);
    const navigate = useNavigate();
    const isMessages = useLocation().pathname === "/dashboard/messages";

    return (
        <div>
            <TableStyle>
                <thead>
                    <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.label}</th>
                    ))}
                    </tr>
                </thead>

                <tbody>
                    {selectedData.map((row, rowIndex) => (
                        <tr onClick={(e) => {
                            if(!isMessages) {
                                const rowPath = `${row.id}`;
                                e.stopPropagation();
                                navigate(rowPath)
                            }
                        }} key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.value && row[column.value] ? row[column.value] : (column.display ? column.display(row) : "")}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </TableStyle>
        </div>
    );
};

const TableStyle = styled.table`
    width: 100%;
    height: 74vh;
    font-size: 14px;
    overflow-y: auto;
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.menuBox};
    cursor: zoom-in;

    th {
        padding-bottom: 1rem;
    }

    thead {
        /* text-align: left; */
    }

    tbody{
        /* text-align: left; */

        tr{
            filter: grayscale(0.5);
            transition: filter 0.2s ease;
            height: 40px;
            line-height: 20px;
        }

        tr:hover {
            filter: grayscale(0);
            box-shadow: 0px 0px 3px ${({ theme }) => theme.iconsColor};
            border-radius: 0.5rem;
        }
    }
`

export default Table;