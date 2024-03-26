import { ReactNode, useState } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

type Column = {
    label: string;
    value?: string;
    display?: ((row: Data) => string | ReactNode);
};

export type Data = {
    [key: string]: string | number | boolean | Array<string>;
};

type TableProps = {
    columns: Column[];
    data: Data[];
    action: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Data) => void;
    itemsPerPage?: number;
    maxPageNumbersToShow?: number;
};

const Table = ({ columns, data, action, itemsPerPage = 10, maxPageNumbersToShow = 5 }:TableProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const selectedData = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                            action(e, row);
                        }} key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.value && row[column.value]
                                        ? row[column.value] 
                                        : (column.display 
                                            ? column.display(row) 
                                            : "")}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </TableStyle>
            <Pagination 
                dataLength={data.length} 
                itemsPerPage={itemsPerPage} 
                maxPageNumbersToShow={maxPageNumbersToShow}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

const TableStyle = styled.table`
    width: 100%;
    height: 72vh;
    font-size: 14px;
    overflow-y: auto;
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.menuBox};
    cursor: zoom-in;
    box-shadow: 2px 2px 6px -4px black;

    th {
        padding-bottom: 1rem;
    }

    thead {

        tr {
            line-height: 30px;
        }
    }

    tbody{

        tr{
            filter: grayscale(0.5);
            transition: filter 0.2s ease;
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