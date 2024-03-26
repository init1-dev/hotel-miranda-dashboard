import styled from "styled-components";
import { ArrowButton } from "../../styled/Button";

type PaginationProps = {
    dataLength: number;
    itemsPerPage: number;
    maxPageNumbersToShow: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination = ({dataLength, itemsPerPage, maxPageNumbersToShow, currentPage, paginate}: PaginationProps) => {
    const totalPages = Math.ceil(dataLength / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            paginate(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            paginate(currentPage - 1);
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
        <>
            <PaginationStyles>
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
            </PaginationStyles>
        </>
    );
}

const PaginationStyles = styled.div`
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

export default Pagination;