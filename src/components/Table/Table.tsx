import { ReactNode, useEffect, useState } from "react";
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
    const storedPage = localStorage.getItem("currentPage");
    const storedPageData = storedPage ? JSON.parse(storedPage) : {};
    const section = location.pathname.split("/dashboard/")[1];
    
    const getCurrentPage = () => {
        return storedPageData.page || 1;
    };

    const storageCurrentPage = () => {
        const lastSection = storedPageData.lastSection;
        if(lastSection !== section){
            localStorage.setItem("currentPage", JSON.stringify({
                ...storedPageData,
                page: 1,
                lastSection: section
            }))
        } else {
            localStorage.setItem("currentPage", JSON.stringify({
                ...storedPageData,
                page: currentPage
            }))
        }
    }

    const [currentPage, setCurrentPage] = useState(getCurrentPage());

    useEffect(() => {
        storageCurrentPage();
    }, [currentPage, section, storedPageData])

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
    height: calc(100% - 75px);
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
    cursor: zoom-in;
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
        }
    }

    tbody{

        tr{
            filter: grayscale(0.5);
            transition: filter 0.2s ease;
            line-height: 30px;
            cursor: zoom-in;

            &:hover {
                filter: grayscale(0);
                background-color: ${({ theme }) => theme.tableHover};
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