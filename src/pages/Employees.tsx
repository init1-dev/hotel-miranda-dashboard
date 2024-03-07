import styled from "styled-components";
import Table from "../components/Table/Table";
import employeesData from "../Data/employees.json";
import { usersTable } from "../helpers/Headers/employeesHeaders";
import { Outlet, useLocation } from "react-router-dom";
import { employees } from "../helpers/Tabs/tabs";

function Employees() {
    const location=useLocation().pathname;
    
    return (
        <>
            {
                location === "/dashboard/employees"
                    ?    <>
                            <TabsContent>
                                { 
                                    employees.map((item, index) => (
                                        <Tab key={index}>{item}</Tab>
                                    )) 
                                }
                            </TabsContent>
                            <Table columns={usersTable} data={employeesData} />
                        </>
                    : <Outlet />
            
            }
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