import styled from "styled-components";
import Table from "../components/Table/Table";
import employeesData from "../Data/employees.json";
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

const usersTable = [
    {
        'label': 'Image',
        'value': 'photo'
    },
    {
        'label': 'Full Name',
        'value': 'fullname'
    },
    {
        'label': 'ID',
        'value': 'employee_id'
    },
    {
        'label': 'Email',
        'value': 'email'
    },
    {
        'label': 'Start Date',
        'value': 'start_date'
    },
    {
        'label': 'Description',
        'value': 'description'
    },
    {
        'label': 'Phone',
        'value': 'phone'
    },
    {
        'label': 'Status',
        'value' : 'status'
    }
];

const TabsContent = styled.div`
    display: flex;
    padding: 0 1rem 0 1rem;
    gap: 5rem;
    margin-bottom: 2rem;
`

const Tab = styled.button`
    all: unset;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
`

export default Employees;