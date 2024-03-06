// import { useNavigate } from "react-router-dom";
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
    path: string;
};

const Table = ({ columns, data, path }:TableProps) => {
    const selectedData = data.slice(0, 10);
    // const navigate = useNavigate();

    const renderCellContent = (column: Column, row: Data) => {
        if (column.type === 'image') {
            return <Img src={row[column.accessor].toString()} alt="" />;
        } else if (column.type === 'date') {
            const formated = new Date(row[column.accessor].toString())
            return formated.toLocaleDateString('en-GB');
        } else if (column.type === 'bool') {
            const status = column.status ? column.status : ['Yes', 'No'];
            return row[column.accessor] ? status[0] : status[1];
        } else if (column.type === 'currency') {
            return `${row[column.accessor]}€`;
        } else if (column.type === 'array') {
            
            const arrayFormat = row[column.accessor].join(", ");
            return arrayFormat;
        } else {
            return row[column.accessor];
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
                            e.stopPropagation();
                            // navigate(`${path}/${row.id}`)
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
    background-color: #202020;

    thead {
        background-color: #202020;
    }
`

const Img = styled.img`
    max-width: 100px;
    max-height: 60px;
`

const TableRow = styled.td`
    font-size: 12px;
`

export default Table;