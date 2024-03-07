import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { bookings } from "../helpers/Tabs/tabs";

function Bookings() {
    const location=useLocation().pathname;
    
    return (
        <>
            {
                location === "/dashboard/bookings"
                    ?   <>
                            <TabsContent>
                                { 
                                    bookings.map((item, index) => (
                                        <Tab key={index}>{item}</Tab>
                                    )) 
                                }
                            </TabsContent>
                            {/* <Table columns={} data={} /> */}
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

export default Bookings;