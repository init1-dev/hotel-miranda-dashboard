import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { messages } from "../helpers/Tabs/tabs";

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
                            {/* <Table columns={roomsHeaders} data={roomsData} /> */}
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

export default Messages;