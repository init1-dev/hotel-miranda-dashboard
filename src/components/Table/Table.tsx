import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import { query1350, query1500 } from "../../helpers/responsive";

type Column = {
    label: string;
    value?: string;
    display?: ((row: Data) => string | ReactNode);
};

export type Data = {
    [key: string]: string | number | boolean | Array<string> | undefined;
};

type TableProps = {
    columns: Column[];
    data: Data[];
    action: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Data) => void;
    itemsPerPage?: number;
    maxPageNumbersToShow?: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>,
};

const Table = ({
    columns,
    data,
    action,
    itemsPerPage = 10,
    maxPageNumbersToShow = 5,
    currentPage,
    setCurrentPage
}:TableProps) => {
        
    const section = location.pathname.split("/dashboard/")[1];

    useEffect(() => {
        setCurrentPage(currentPage);
    }, [section])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const selectedData = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <TableContainer>
            <TableStyle>
                <thead>
                    <tr>
                    {columns.map((column, index) => (
                        <th key={index}>
                            <p>{column.label}</p>
                        </th>
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
        </TableContainer>
    );
};

const TableContainer = styled.div`
    height: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    user-select: none;
`

const TableStyle = styled.table`
    width: 100%;
    font-size: 14px;
    overflow-y: auto;
    text-align: center;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.menuBox};
    box-shadow: 2px 2px 6px -4px black;
    border-spacing: 0;

    th {
        border-bottom: 1px solid ${({ theme }) => theme.bg};
    }

    thead {

        th:first-child {

            p {
                text-align: justify;
                margin: 0.5rem 0 0.5rem 1rem;
            }
        }

        tr {
            line-height: 30px;
            font-size: 14px;

            @media (max-width: ${query1500}) {
                font-size: 13px;
            }
        }
    }

    tbody{

        tr{
            filter: grayscale(0.5);
            transition: filter 0.2s ease;
            line-height: 30px;
            cursor: pointer;
            font-size: 14px;

            &:hover {
                filter: grayscale(0);
                background-color: ${({ theme }) => theme.tableHover};
            }

            @media (max-width: ${query1500}) {
                font-size: 13px;
            }

            @media (max-width: ${query1350}) {
                
            }
        }

        tr:last-child td:first-child {
            border-bottom-left-radius: 8px;
        }

        tr:last-child td:last-child {
            border-bottom-right-radius: 8px;
        }
    }
`

export default Table;