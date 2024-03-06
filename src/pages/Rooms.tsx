import styled from "styled-components";
import Table from "../components/Table/Table";
import roomsData from '../Data/rooms.json';
import { roomsHeaders } from "../helpers/Headers/roomsHeaders";

function Rooms() {
    
    return (
        <>
            <TabsContent>
                <Tab>All Rooms</Tab>
                <Tab>Available Rooms</Tab>
                <Tab>Unavailable Rooms</Tab>
            </TabsContent>
            <Table columns={roomsHeaders} data={roomsData} path="/rooms"/>
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

export default Rooms;