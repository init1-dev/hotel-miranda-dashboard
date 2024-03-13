import styled from "styled-components";
import Table, { Data } from "../components/Table/Table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { orderBy, rooms } from "../helpers/Tabs/tabs";
import { ButtonContainer, ButtonStyledViewNotes, ButtonStyledViewNotesDisabled, NewButton } from "../styled/Button";
import { MessageTitle } from "../styled/Message";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut } from "../styled/Span";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { FaPlus } from "react-icons/fa";
import { action } from "../helpers/action";
import { SectionSelect } from "../styled/Form";
import { selectRooms } from "../store/Rooms/roomsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getRoomsThunk } from "../store/Rooms/roomsThunk";
import { Loader, Loading } from "../styled/Loading";

const MySwal = withReactContent(Swal)

function Rooms() {
    const location=useLocation().pathname;
    const navigate = useNavigate();
    const roomSelect = orderBy.rooms;
    const [currentTab, setCurrentTab] = useState<string | undefined>("All Rooms");
    const [currentOrder, setCurrentOrder] = useState("order_date");

    const dispatch = useAppDispatch();
    const roomsData = useAppSelector(selectRooms);
    const filteredRooms = useMemo(() => {
        const all = (currentTab === "All Rooms")
            ? roomsData.data
            : roomsData.data.filter((item) => item.status === currentTab)

        return [...all].sort((a, b) => {
            switch (currentOrder) {
                case "offer":
                    return b.offer - a.offer;
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
                ) : "-";
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
    max-height: auto;
    width: 70px;
    aspect-ratio: 16/9;
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