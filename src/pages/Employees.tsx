import styled from "styled-components";
import Table from "../components/Table/Table";
import employeesData from "../Data/employees.json";
import { usersTable } from "../helpers/Headers/usersHeaders";

function Employees() {
    
    return (
        <>
            <TabsContent>
                <Tab>All Employee</Tab>
                <Tab>Active Employee</Tab>
                <Tab>Inactive Employee</Tab>
            </TabsContent>
            <Table columns={usersTable} data={employeesData} path="/employees" />
        </>
    );
}

const TabsContent = styled.div`
    display: flex;
    padding: 0 1rem 0 1rem;
    gap: 5rem;
    margin-bottom: 2rem;
`

const Tab = styled.div`
    
`

export default Employees;