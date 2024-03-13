import { ReactNode, useState } from "react";
import styled from "styled-components";
import { ArrowButton } from "../../styled/Button";

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

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getPageNumbers = () => {
        const halfMaxPagesToShow = Math.floor(maxPageNumbersToShow / 2);
        const firstPage = Math.max(1, currentPage - halfMaxPagesToShow);
        const lastPage = Math.min(totalPages, firstPage + maxPageNumbersToShow - 1);

        const pageNumbers = [];
        for (let i = firstPage; i <= lastPage; i++) {
            pageNumbers.push(i);
        }

        if (firstPage > 1) {
            pageNumbers.unshift("...");
            pageNumbers.unshift(1);
        }
        if (lastPage < totalPages) {
            pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

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
            <Pagination>
                <ArrowButton onClick={prevPage} disabled={currentPage === 1}>{'Prev'}</ArrowButton>
                {getPageNumbers().map((pageNumber, index) => (
                    <PageNumber key={index} onClick={() => {
                        if (typeof pageNumber === 'number') {
                            paginate(pageNumber)
                        }
                    }} className={`${pageNumber === currentPage && "active"}`}>
                        {pageNumber}
                    </PageNumber>
                ))}
                <ArrowButton onClick={nextPage} disabled={currentPage === totalPages}>{'Next'}</ArrowButton>
            </Pagination>
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
        /* text-align: left; */

        tr {
            line-height: 30px;
        }
    }

    tbody{
        /* text-align: left; */

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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

const PageNumber = styled.span`
    cursor: pointer;
    margin: 0 0.5rem;
    padding: 0 0.8rem;
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.menuText};

    &.active {
        background-color: #7bcf92;
        color: black;
    }
`;

export default Table;