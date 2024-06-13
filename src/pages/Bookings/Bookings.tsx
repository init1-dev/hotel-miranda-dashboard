import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { bookings, orderBy } from "../../helpers/Tabs/tabs";
import Table, { Data } from "../../components/Table/Table";
import { TabsComponent } from "../../components/Dashboard/Tabs/TabsComponent";
import { ActionButtonIcon, ButtonContainer, ButtonStyledViewNotes, ButtonStyledViewNotesDisabled, NewButton } from "../../styled/Button";
import { SectionSelect } from "../../styled/Form";
import { MessageText, MessageTitle } from "../../styled/Message";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../../styled/Span";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { action } from "../../helpers/action";
import { selectBookings } from "../../store/Bookings/bookingsSlice";
import { deleteBooking, getBookings } from "../../store/Bookings/bookingsThunk";
import { BookingData } from "../../store/interfaces";
import CustomSwal from "../../helpers/Swal/CustomSwal";
import { ThemeContext } from "styled-components";
import { Container, ImagePreview, Imagen } from "../../styled/ImagePreviewInTable";
import LoaderComponent from "../../components/Loader";
import DeleteButton from "../../components/Buttons/DeleteButton";

function Bookings() {
    const navigate = useNavigate();
    const bookingsSelect = orderBy.bookings;
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | boolean | undefined>("All Bookings");
    const [currentOrder, setCurrentOrder] = useState<string>("order_date");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const theme = useContext(ThemeContext);

    const resetPage = () => {
        setCurrentPage(1);
    };
    
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
                    return new Date(String(b.order_date)).getTime() - new Date(String(a.order_date)).getTime();
            }
        })
        
    }, [bookingsData, currentTab, currentOrder])

    const initialFetch = async () => {
        await dispatch(getBookings()).unwrap();
        setIsLoading(false);
    }

    useEffect(() => {
        initialFetch()
    }, []);

    // display: (row: Data) => format( new Date(`${row.order_date}`), 'MMM do, yyyy HH:mm')
    const bookingsHeaders = [
        {
            'label': 'Guest Name',
            display: (row: Data | BookingData) => {
                return <Container>
                <Imagen src={`${row.roomInfo?.photo || ""}`} alt="imagen de la habitacion" onClick={async(e) => {
                    e.stopPropagation();
                    const swalProps = {
                        title: <MessageTitle>Room #{row.roomInfo?.room_number}: {row.roomInfo?.room_type}</MessageTitle>,
                        html: <ImagePreview src={String(row.roomInfo?.photo)} alt="imagen de la habitacion" />,
                        width: 1000
                    }
                    await CustomSwal({data: swalProps, theme: theme})
                }}/>
                <SpanContainer>
                    <h4>{row.full_name}</h4>
                    <small>#{row._id}</small>
                </SpanContainer>
            </Container>
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
                <ButtonStyledViewNotes onClick={async(event) => {
                    event.stopPropagation()
                    const swalProps = {
                        title: <MessageTitle>{row.full_name} requests:</MessageTitle>,
                        html: <MessageText>{row.special_request}</MessageText>,
                        showConfirmButton: false
                    }
                    await CustomSwal({data: swalProps, theme: theme})
                }}>View</ButtonStyledViewNotes>
                :
                <ButtonStyledViewNotesDisabled disabled>None</ButtonStyledViewNotesDisabled>
        },
        // {
        //     'label': 'Room Type',
        //     display: (row: Data) => `${row.roomInfo?.room_type} #${row.roomInfo?.room_number}`
        // },
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
                const bookingRow = row as BookingData;
                return (
                    <ButtonContainer>
                        <ActionButtonIcon onClick={(e) => {
                            e.stopPropagation()
                            navigate(`edit/${bookingRow._id}`)
                        }}>
                            <FaRegEdit />
                        </ActionButtonIcon>

                        <DeleteButton 
                            type='Booking' 
                            action={deleteBooking} 
                            id={bookingRow._id!}
                        />
                    </ButtonContainer>
                )
            }
        }
    ];

    if(isLoading) {
        return <LoaderComponent />
    }
    
    return (
        <>
            {
                location.pathname === "/dashboard/bookings"
                    ?   <>  
                            <TabsComponent 
                                section={bookings}
                                currentTab={currentTab}
                                setCurrentTab={setCurrentTab}
                                resetPage={resetPage}
                            >
                                <ButtonContainer>
                                    <SectionSelect 
                                        value={currentOrder}
                                        onChange={(e) => setCurrentOrder(e.target.value)}
                                        name="booking-type" 
                                        id="booking-type" 
                                        required>
                                        {
                                            bookingsSelect.map((type, index) => {
                                                return <option 
                                                    key={index}
                                                    value={type.accesor}
                                                >{type.label}</option>
                                            })
                                        }
                                    </SectionSelect>
                                    <NewButton 
                                        className="new-booking" 
                                        to={"/dashboard/bookings/new"}
                                    >
                                        <FaPlus />
                                        NEW BOOKING
                                    </NewButton>
                                </ButtonContainer>
                            </TabsComponent>
                            <Table 
                                columns={bookingsHeaders} 
                                data={filteredBookings} 
                                action={action(navigate)}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </>
                    : <Outlet />
            }
        </>
    );
}

export default Bookings;