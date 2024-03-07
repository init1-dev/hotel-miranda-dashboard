import styled from "styled-components";
import Table from "../components/Table/Table";
import roomsData from '../Data/rooms.json';
import { roomsHeaders } from "../helpers/Headers/roomsHeaders";
import { Outlet, useLocation } from "react-router-dom";
import { rooms } from "../helpers/Tabs/tabs";

function Rooms() {
    const location=useLocation().pathname;
    
    return (
        <>
            {
                location === "/dashboard/rooms"
                    ?   <>
                            <TabsContent>
                                { 
                                    rooms.map((item, index) => (
                                        <Tab key={index}>{item}</Tab>
                                    )) 
                                }
                            </TabsContent>
                            <Table columns={roomsHeaders} data={roomsData} />
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

export default Rooms;