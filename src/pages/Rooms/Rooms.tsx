import styled, { ThemeContext } from "styled-components";
import { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { orderBy, rooms } from "../../helpers/Tabs/tabs";
import Table, { Data } from "../../components/Table/Table";
import { TabsComponent } from "../../components/Dashboard/Tabs/TabsComponent";
import { ActionButtonIcon, ButtonContainer, ButtonStyledViewNotes, ButtonStyledViewNotesDisabled, NewButton } from "../../styled/Button";
import { SectionSelect } from "../../styled/Form";
import { MessageTitle } from "../../styled/Message";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut } from "../../styled/Span";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { action } from "../../helpers/action";
import { selectRooms } from "../../store/Rooms/roomsSlice";
import { deleteRoom, getRoomsThunk } from "../../store/Rooms/roomsThunk";
import { RoomData } from "../../store/interfaces";
import CustomSwal from "../../helpers/Swal/CustomSwal";
import { calculateCentsToCurrency } from "../../helpers/calculateCentsToCurrency";
import { Container, ImagePreview, Imagen } from "../../styled/ImagePreviewInTable";
import LoaderComponent from "../../components/Loader";
import { fetchFromApi } from "../../helpers/API/fetchFromApi";
import { bookingsCollection } from "../../helpers/API/apiVariables";
import { customToast } from "../../helpers/toastify/customToast";

function Rooms() {
    const navigate = useNavigate();
    const roomSelect = orderBy.rooms;
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | boolean | undefined>("All Rooms");
    const [currentOrder, setCurrentOrder] = useState("price-high-low");
    const [currentPage, setCurrentPage] = useState(1);
    const theme = useContext(ThemeContext);

    const resetPage = () => {
        setCurrentPage(1);
    };

    const dispatch = useAppDispatch();
    const roomsData = useAppSelector(selectRooms);
    const filteredRooms = useMemo(() => {
        const all = (currentTab === "All Rooms")
            ? roomsData.data
            : roomsData.data.filter((item) => item.status === currentTab)

        return [...all].sort((a, b) => {
            switch (currentOrder) {
                case "room-low-high":
                    return a.room_number - b.room_number;
                case "price-low-high":
                    return a.price - b.price;
                default:
                    return b.price - a.price;
            }
        })
        
    }, [roomsData, currentTab, currentOrder])

    const initialFetch = async () => {
        await dispatch(getRoomsThunk()).unwrap();
        setIsLoading(false);
    }

    useEffect(() => {
        initialFetch()
    }, []);
    
    const roomsHeaders = [
        {
            'label': 'Room Name',
            display: (row: Data) => {
                return <Container>
                    <Imagen src={`${row.photo}`} alt="imagen de la habitacion" onClick={async(e) => {
                        e.stopPropagation();
                        const swalProps = {
                            title: <MessageTitle>Room #{row.room_number}: {row.room_type}</MessageTitle>,
                            html: <ImagePreview src={String(row.photo)} alt="imagen de la habitacion" />,
                            width: 1000
                        }
                        await CustomSwal({data: swalProps, theme: theme})
                    }}/>
                    <SpanContainer>
                        <h4>{row.name} Nº{row.room_number}</h4>
                        <small>#{row._id}</small>
                    </SpanContainer>
                </Container>
            }
        },
        {
            'label': 'Room Type',
            display: (row: Data) => `${row.room_type}`
        },
        {
            'label': 'Cancelation',
            display: (row: Data) => {
                return (<ButtonStyledViewNotes onClick={async(event) => {
                    event.stopPropagation()
                    const htmlCode = (
                        <small>{row.cancellation}</small>
                    )
                    const swalProps = {
                        title: <MessageTitle>Cancellation Policy #{row.room_number}:</MessageTitle>,
                        html: htmlCode,
                        showConfirmButton: false
                    }
                    await CustomSwal({data: swalProps, theme: theme})
                }}>View</ButtonStyledViewNotes>)
            }
        },
        {
            'label': 'Amenities',
            display: (row: Data) => row.amenities ?
                <ButtonStyledViewNotes onClick={async(event) => {
                    event.stopPropagation()
                    const amenitiesArray = Array.isArray(row.amenities) 
                        ? row.amenities 
                        : [String(row.amenities)];
                    const htmlCode = (
                        <ul>
                            {amenitiesArray.map((amenity: string, i:number) =>{
                                return <li key={i}>
                                        <small>{amenity}</small>
                                    </li>
                            })}
                        </ul>
                    )
                    const swalProps = {
                        title: <MessageTitle>Room #{row.room_number}: {row.room_type}</MessageTitle>,
                        html: htmlCode,
                        showConfirmButton: false
                    }
                    await CustomSwal({data: swalProps, theme: theme})
                }}>View</ButtonStyledViewNotes>
                :
                <ButtonStyledViewNotesDisabled disabled>None</ButtonStyledViewNotesDisabled>
        },
        {
            'label': 'Price',
            display: (row: Data) => (
                <>
                    <p>{calculateCentsToCurrency(Number(row.price))}€</p>
                    <Night>/Night</Night>
                </>
            )
        },
        {
            'label': 'Offer',
            display: (row: Data) => {
                return (row.offer) ? (
                    <>
                        <p>{calculateCentsToCurrency(Number(row.price), Number(row.discount))}€</p>
                        <Night>/Night</Night>
                    </>
                ) : <>
                        <p>{"-"}</p>
                        <Night>/Night</Night>
                    </>
            }
        },
        {
            'label': 'Status',
            display : (row: Data) => {
                if (row.status === 'Available') {
                    return <SpanStyledCheckIn>{row.status}</SpanStyledCheckIn>
                } else {
                    return <SpanStyledCheckOut>{row.status}</SpanStyledCheckOut>
                }
            }
        },
        {
            'label': 'Actions',
            display : (row: Data) => {
                const roomRow = row as RoomData;
                return (
                    <ButtonContainer>
                        <ActionButtonIcon className="edit" onClick={(e) => {
                            e.stopPropagation()
                            navigate(`edit/${roomRow._id}`)
                        }}>
                            <FaRegEdit />
                        </ActionButtonIcon>

                        <ActionButtonIcon className={`delete-${roomRow.room_number}`} onClick={async(e) => {
                            e.stopPropagation();
                            const doesAnyBookingContainRoom = await fetchFromApi('GET', `${bookingsCollection}/checkRoomInBookings/${row._id}`);

                            if(!doesAnyBookingContainRoom?.data){
                                const swalProps = {
                                    title: `<small>You're going to delete room #${roomRow._id}</small>`,
                                    text: `This action is irreversible`,
                                    icon: 'warning' as const,
                                    showConfirmButton: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'Delete',
                                    confirmButtonColor: '#ff0000',
                                    cancelButtonText: 'Cancel',
                                    reverseButtons: true
                                }
                                await CustomSwal({data: swalProps, theme: theme})
                                .then(async(result) => {
                                    if (result.isConfirmed) {
                                        dispatch(deleteRoom(roomRow._id!));
                                        const swalProps = {
                                            text: `Room #${roomRow._id} deleted successfully`,
                                            icon: 'success' as const,
                                            timer: 2000,
                                            timerProgressBar: true,
                                            showConfirmButton: false
                                        }
                                        setCurrentPage(1);
                                        await CustomSwal({data: swalProps, theme: theme})
                                    }
                                }).catch((error) => {
                                    customToast('error', error);
                                });
                            } else {
                                customToast('error', "Rejected: This room has been used for some bookings.");
                            }
                            
                        }}>
                            <RiDeleteBin5Line />
                        </ActionButtonIcon>
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
                location.pathname === "/dashboard/rooms"
                    ?   <>  
                            <TabsComponent 
                                section={rooms} 
                                currentTab={currentTab}
                                setCurrentTab={setCurrentTab}
                                resetPage={resetPage}
                            >
                                <ButtonContainer>
                                    <SectionSelect 
                                        onChange={(e) => setCurrentOrder(e.target.value)}
                                        name="room-type" 
                                        id="room-type" 
                                        required>
                                        {
                                            roomSelect.map((type, index) => {
                                                return <option key={index} value={type.accesor}>{type.label}</option>
                                            })
                                        }
                                    </SectionSelect>
                                    <NewButton to={"/dashboard/rooms/new"}>
                                        <FaPlus />
                                        NEW ROOM
                                    </NewButton>
                                </ButtonContainer>
                            </TabsComponent>
                            <Table 
                                columns={roomsHeaders} 
                                data={filteredRooms} 
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

const Night = styled.p`
    font-size: 10px;
    font-weight: 200;
    color: ${({ theme }) => theme.text};
`

export default Rooms;