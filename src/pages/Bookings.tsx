import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { bookings, orderBy } from "../helpers/Tabs/tabs";
import Table, { Data } from "../components/Table/Table";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { ActionButtonIcon, ButtonContainer, ButtonStyledViewNotes, ButtonStyledViewNotesDisabled, NewButton } from "../styled/Button";
import { Loader, Loading } from "../styled/Loading";
import { SectionSelect } from "../styled/Form";
import { MessageText, MessageTitle } from "../styled/Message";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../styled/Span";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { action } from "../helpers/action";
import { selectBookings } from "../store/Bookings/bookingsSlice";
import { deleteBooking, getBookings } from "../store/Bookings/bookingsThunk";
import { BookingData } from "../store/interfaces";

const MySwal = withReactContent(Swal)

function Bookings() {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const bookingsSelect = orderBy.bookings;
    const [currentTab, setCurrentTab] = useState<string | undefined>("All Bookings");
    const [currentOrder, setCurrentOrder] = useState("order_date");
    
    const dispatch = useAppDispatch();
    const bookingsData = useAppSelector(selectBookings);
    const filteredBookings = useMemo(() => {
        const all = (currentTab === "All Bookings")
            ? bookingsData.data
            : bookingsData.data.filter((item) => item.status === currentTab)

        return [...all].sort((a, b) => {
            switch (currentOrder) {
                case 'check_in':
                    return new Date(b.check_in).getTime() - new Date(a.check_in).getTime();
                case 'check_out':
                    return new Date(b.check_out).getTime() - new Date(a.check_out).getTime();
                case 'full_name':
                    if(a.full_name < b.full_name) return -1;
                    if(a.full_name > b.full_name) return 1;
                    return 0;
                default:
                    return new Date(b.order_date).getTime() - new Date(a.order_date).getTime();
            }
        })
        
    }, [bookingsData, currentTab, currentOrder])

    const initialFetch = useCallback(async () => {
        await dispatch(getBookings()).unwrap();
    }, [dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);

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
        },
        {
            'label': 'Actions',
            display : (row: Data) => {
                const bookingRow = row as BookingData
                return (
                    <ButtonContainer>
                        <ActionButtonIcon onClick={(e) => {
                            e.stopPropagation()
                            navigate(`edit/${bookingRow.id}`)
                        }}>
                            <FaRegEdit />
                        </ActionButtonIcon>

                        <ActionButtonIcon onClick={(e) => {
                            e.stopPropagation()
                            MySwal.fire({
                                title: `<small>You're going to delete booking #${bookingRow.id}</small>`,
                                text: `This action is irreversible`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Delete',
                                confirmButtonColor: '#ff0000',
                                cancelButtonText: 'Cancel',
                                reverseButtons: true
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    dispatch(deleteBooking(bookingRow));
                                    MySwal.fire({
                                        text: `Booking #${bookingRow.id} deleted successfuly`,
                                        icon: 'success',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        showConfirmButton: false
                                    });
                                }
                            });
                        }}>
                            <RiDeleteBin5Line />
                        </ActionButtonIcon>
                    </ButtonContainer>
                )
            }
        }
    ];
    
    return (
        <>
            {
                location === "/dashboard/bookings"
                    ?   bookingsData.loading === false
                            ?
                                <>  
                                    <TabsComponent section={bookings} setCurrentTab={setCurrentTab}>
                                        <ButtonContainer>
                                            <SectionSelect 
                                                onChange={(e) => setCurrentOrder(e.target.value)}
                                                name="booking-type" 
                                                id="booking-type" 
                                                required>
                                                {
                                                    bookingsSelect.map((type, index) => {
                                                        return <option key={index} value={type.accesor}>{type.label}</option>
                                                    })
                                                }
                                            </SectionSelect>
                                            <NewButton to={"/dashboard/bookings/new"}>
                                                <FaPlus />
                                                NEW BOOKING
                                            </NewButton>
                                        </ButtonContainer>
                                    </TabsComponent>
                                    <Table columns={bookingsHeaders} data={filteredBookings} action={action(navigate)}/>
                                </>
                            : <Loading>
                                <Loader />
                            </Loading>
                    : <Outlet />
            }
        </>
    );
}

export default Bookings;