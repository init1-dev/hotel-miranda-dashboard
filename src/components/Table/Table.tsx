type Column = {
    header: string;
    accessor: string;
};

type Data = {
    [key: string]: string | number | boolean;
};

type TableProps = {
    columns: Column[];
    data: Data[];
};

const Table = ({ columns, data }:TableProps) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;