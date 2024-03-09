import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { bookings } from "../helpers/Tabs/tabs";
import Table, { Data } from "../components/Table/Table";
import bookingsData from '../Data/bookings.json';
import { format } from "date-fns";
import { ButtonStyledViewNotes, ButtonStyledViewNotesDisabled, NewButton } from "../styled/Button";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../styled/Span";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { MessageText, MessageTitle } from "../styled/Message";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { TiArrowUnsorted } from "react-icons/ti";
import { action } from "../helpers/action";

const MySwal = withReactContent(Swal)

function Bookings() {
    const location=useLocation().pathname;
    const navigate = useNavigate();
    
    return (
        <>
            {
                location === "/dashboard/bookings"
                    ?   <>  
                            <TabsComponent section={bookings}>
                                <NewButton>
                                    <TiArrowUnsorted />
                                    ROOM ORDER
                                </NewButton>
                            </TabsComponent>
                            <Table columns={bookingsHeaders} data={bookingsData} action={action(navigate)}/>
                        </>
                    : <Outlet />
            }
        </>
    );
}

// display: (row: Data) => format( new Date(`${row.order_date}`), 'MMM do, yyyy HH:mm')

const bookingsHeaders = [
    {
        'label': 'Guest Name',
        display: (row: Data) => {
            return (
                <SpanContainer>
                    <h4>{row.full_name}</h4>
                    <small>#{row.id}</small>
                </SpanContainer>
            )
        }
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
    }
];

export default Bookings;