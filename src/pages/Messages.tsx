import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { messages } from "../helpers/Tabs/tabs";
import messagesData from '../Data/messages.json';
import Table from "../components/Table/Table";
import { messagesHeaders } from "../helpers/Headers/messagesHeaders";

function Messages() {
    const location=useLocation().pathname;

    return (
        <>
            {
                location === "/dashboard/messages"
                    ?   <>
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

export default Messages;