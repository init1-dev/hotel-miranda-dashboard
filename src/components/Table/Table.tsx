import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Column = {
    header: string;
    type: string;
    accessor: string;
    status?: string[] | undefined;
};

type Data = {
    [key: string]: string | number | boolean | string[];
};

type TableProps = {
    columns: Column[];
    data: Data[];
};

const Table = ({ columns, data }:TableProps) => {
    const selectedData = data.slice(0, 20);
    const navigate = useNavigate();

    const renderCellContent = (column: Column, row: Data) => {
        const rowData = row[column.accessor];
        
        if (column.type === 'image') {
            return <Img src={rowData.toString()} alt="" />;
        } else if (column.type === 'date') {
            const formated = new Date(rowData.toString())
            return formated.toLocaleDateString('en-GB');
        } else if (column.type === 'bool') {
            const status = column.status ? column.status : ['Yes', 'No'];
            return rowData ? status[0] : status[1];
        } else if (column.type === 'currency') {
            return rowData + "€";
        } else if (column.type === 'array') {
            const arrayFormat = Array.isArray(rowData) ? rowData.join(", ") : rowData;
            return arrayFormat;
        } else {
            return rowData.toString().slice(0, 100);
        }
    };

    return (
        <div>
            <TableStyle>
                <thead>
                    <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                    </tr>
                </thead>

                <tbody>
                    {selectedData.map((row, rowIndex) => (
                        <tr onClick={(e) => {
                            const rowPath = `${row.id}`;
                            e.stopPropagation();
                            navigate(rowPath)
                        }} key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableRow key={colIndex}>
                                    {renderCellContent(column, row)}
                                </TableRow>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </TableStyle>
        </div>
    );
};

const TableStyle = styled.table`
    display: block;
    width: 100%;
    height: 78vh;
    overflow-y: auto;
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.menuBox};

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: none;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.menuText};
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    th {
        padding-bottom: 1rem;
    }
`

const Img = styled.img`
    max-width: 100px;
    height: auto;
`

const TableRow = styled.td`
    font-size: 12px;
    line-height: 25px;
`

export default Table;