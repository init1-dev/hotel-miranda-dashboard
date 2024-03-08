import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { messages } from "../helpers/Tabs/tabs";
import messagesData from '../Data/messages.json';
import Table, { Data } from "../components/Table/Table";
import MessagesSlider from "../components/Dashboard/Messages/MessagesSlide";

function Messages() {
    const location=useLocation().pathname;

    return (
        <>
            {
                location === "/dashboard/messages"
                    ?   <>
                            <MessagesSlider />
                            <TabsContent>
                                { 
                                    messages.map((item, index) => (
                                        <Tab key={index}>{item}</Tab>
                                    )) 
                                }
                            </TabsContent>
                            <Table columns={messagesHeaders} data={messagesData} />
                        </>
                    : <Outlet />
            }
        </>
    );
}

const messagesHeaders = [
    {
        'label': 'ID',
        'value': 'id'
    },
    {
        'label': 'Date',
        'value': 'date'
    },
    {
        'label': 'Customer',
        display: (row: Data) => String(row.full_name)
    },
    {
        'label': 'Email',
        'value': 'email'
    },
    {
        'label': 'Phone',
        'value': 'phone'
    },
    {
        'label': 'Subject',
        'value': 'subject'
    },
    {
        'label': 'Comment',
        'value' : 'message',
    },
    {
        'label': 'Archived',
        'value' : 'archived',
    }
];

const TabsContent = styled.div`
    display: flex;
    padding: 0 1rem 0 1rem;
    gap: 5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
`

const Tab = styled.button`
    all: unset;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
`

export default Messages;