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
    const selectedData = data.slice(0, 8);
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
            return rowData;
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
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.menuBox};

    thead {
        
    }

    td {
        padding: 0 1rem 0 1rem;
    }
`

const Img = styled.img`
    max-width: 100px;
    height: auto;
`

const TableRow = styled.td`
    font-size: 12px;
`

export default Table;