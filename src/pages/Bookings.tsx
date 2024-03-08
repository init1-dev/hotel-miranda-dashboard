import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { bookings } from "../helpers/Tabs/tabs";
import Table, { Data } from "../components/Table/Table";
import bookingsData from '../Data/bookings.json';
import { format } from "date-fns";
import { ActionButton, ButtonStyledViewNotes, ButtonStyledViewNotesDisabled } from "../styled/Button";
import { SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../styled/Span";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { MessageText, MessageTitle } from "../styled/Message";

const MySwal = withReactContent(Swal)

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
                            <Table columns={bookingsHeaders} data={bookingsData} />
                        </>
                    : <Outlet />
            }
        </>
    );
}

const actions = () => {
    return <ActionButton>Action</ActionButton>
}

// display: (row: Data) => format( new Date(`${row.order_date}`), 'MMM do, yyyy HH:mm')

const bookingsHeaders = [
    {
        'label': 'Guest Name',
        display: (row: Data) => `${row.full_name} #${row.id}`
    },
    {
        'label': 'Order Date',
        display: (row: Data) => format( new Date(`${row.order_date}`), 'MMM do, yyyy')
    },
    {
        'label': 'Check In',
        display: (row: Data) => format( new Date(`${row.check_in}`), 'MMM do, yyyy')
    },
    {
        'label': 'Check Out',
        display: (row: Data) => format( new Date(`${row.check_out}`), 'MMM do, yyyy')
    },
    {
        'label': 'Special Request',
        display: (row: Data) => row.special_request ?
            <ButtonStyledViewNotes onClick={(event) => {
                event.stopPropagation()
                return (
                    MySwal.fire({
                        title: <MessageTitle>{row.full_name} requests:</MessageTitle>,
                        html: <MessageText>{row.special_request}</MessageText>,
                        showConfirmButton: false
                    })
                )
            }}>View</ButtonStyledViewNotes>
            :
            <ButtonStyledViewNotesDisabled disabled>None</ButtonStyledViewNotesDisabled>
    },
    {
        'label': 'Room Type',
        display: (row: Data) => `${row.type} #${row.number}`
    },
    {
        'label': 'Status',
        display : (row: Data) => {
            if (row.status === 'Check In') {
                return <SpanStyledCheckIn>{row.status}</SpanStyledCheckIn>
            } else if (row.status === 'Check Out') {
                return <SpanStyledCheckOut>{row.status}</SpanStyledCheckOut>
            } else {
                return <SpanStyledInProgress>{row.status}</SpanStyledInProgress>
            }
        }
    },
    {
        'label': 'Actions',
        display: () => actions()
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

export default Bookings;