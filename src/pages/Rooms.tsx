import styled from "styled-components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { orderBy, rooms } from "../helpers/Tabs/tabs";
import Table, { Data } from "../components/Table/Table";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { ActionButtonIcon, ButtonContainer, ButtonStyledViewNotes, ButtonStyledViewNotesDisabled, NewButton } from "../styled/Button";
import { Loader, Loading } from "../styled/Loading";
import { SectionSelect } from "../styled/Form";
import { MessageTitle } from "../styled/Message";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut } from "../styled/Span";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { action } from "../helpers/action";
import { selectRooms } from "../store/Rooms/roomsSlice";
import { deleteRoom, getRoomsThunk } from "../store/Rooms/roomsThunk";
import { RoomData } from "../store/interfaces";

const MySwal = withReactContent(Swal)

function Rooms() {
    const location=useLocation().pathname;
    const navigate = useNavigate();
    const roomSelect = orderBy.rooms;
    const [currentTab, setCurrentTab] = useState<string | boolean | undefined>("All Rooms");
    const [currentOrder, setCurrentOrder] = useState("price-high-low");

    const dispatch = useAppDispatch();
    const roomsData = useAppSelector(selectRooms);
    const filteredRooms = useMemo(() => {
        const all = (currentTab === "All Rooms")
            ? roomsData.data
            : roomsData.data.filter((item) => item.status === currentTab)

        return [...all].sort((a, b) => {
            switch (currentOrder) {
                case "offer-high-low":
                    return b.offer - a.offer;
                case "offer-low-high":
                    return a.offer - b.offer;
                case "price-low-high":
                    return a.price - b.price;
                default:
                    return b.price - a.price;
            }
        })
        
    }, [roomsData, currentTab, currentOrder])

    const initialFetch = useCallback(async () => {
        await dispatch(getRoomsThunk()).unwrap();
    }, [dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);
    
    const roomsHeaders = [
        {
            'label': 'Room Name',
            display: (row: Data) => {
                return <Container>
                    <Imagen src={`${row.photo}`} alt="imagen de la habitacion" onClick={(e) => {
                        e.stopPropagation();
                        return (
                            MySwal.fire({
                                title: <MessageTitle>Room #{row.room_number}: {row.room_type}</MessageTitle>,
                                html: <ImagePreview src={String(row.photo)} alt="imagen de la habitacion" />,
                                width: 1000,
                                showConfirmButton: false
                            })
                        )
                    }}/>
                    <SpanContainer>
                        <h4>{row.name} Nº{row.room_number}</h4>
                        <small>#{row.id}</small>
                    </SpanContainer>
                </Container>
            }
        },
        {
            'label': 'Room Type',
            display: (row: Data) => `${row.room_type}`
        },
        {
            'label': 'Amenities',
            display: (row: Data) => row.amenities ?
                <ButtonStyledViewNotes onClick={(event) => {
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
                    return (
                        MySwal.fire({
                            title: <MessageTitle>Room #{row.room_number}: {row.room_type}</MessageTitle>,
                            html: htmlCode,
                            showConfirmButton: false
                        })
                    )
                }}>View</ButtonStyledViewNotes>
                :
                <ButtonStyledViewNotesDisabled disabled>None</ButtonStyledViewNotesDisabled>
        },
        {
            'label': 'Price',
            display: (row: Data) => (
                <>
                    <p>{row.price}€</p>
                    <Night>/Night</Night>
                </>
            )
        },
        {
            'label': 'Offer',
            display: (row: Data) => {
                return (row.offer !== 0) ? (
                    <>
                        <p>{row.offer}€</p>
                        <Night>/Night</Night>
                    </>
                ) : <>
                        <p>{row.price}€</p>
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
                const roomRow = row as RoomData
                return (
                    <ButtonContainer>
                        <ActionButtonIcon onClick={(e) => {
                            e.stopPropagation()
                            navigate(`edit/${roomRow.id}`)
                        }}>
                            <FaRegEdit />
                        </ActionButtonIcon>

                        <ActionButtonIcon onClick={(e) => {
                            e.stopPropagation()
                            MySwal.fire({
                                title: `<small>You're going to delete room #${roomRow.id}</small>`,
                                text: `This action is irreversible`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Delete',
                                confirmButtonColor: '#ff0000',
                                cancelButtonText: 'Cancel',
                                reverseButtons: true
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    dispatch(deleteRoom(roomRow));
                                    MySwal.fire({
                                        text: `Room #${roomRow.id} deleted successfully`,
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
                location === "/dashboard/rooms"
                    ?   roomsData.loading === false
                            ?
                                <>  
                                    <TabsComponent section={rooms} setCurrentTab={setCurrentTab}>
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
                                    <Table columns={roomsHeaders} data={filteredRooms} action={action(navigate)}/>
                                </>
                            : <Loading>
                                <Loader />
                            </Loading>
                    : <Outlet />
            }
        </>
    );
}



const Container = styled.div`
    display: flex;
    align-items: center;
`

const Imagen = styled.img`
    max-height: 50px;
    aspect-ratio: 16/9;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    object-fit: contain;
    object-position: center;
`

const ImagePreview = styled.img`
    width: 100%;
`

const Night = styled.p`
    font-size: 10px;
    font-weight: 200;
    color: ${({ theme }) => theme.text};
`

export default Rooms;