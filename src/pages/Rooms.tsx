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
import { useEffect } from "react";
import { getRoomsThunk } from "../store/Rooms/roomsThunk";
import { Loader, Loading } from "../styled/Loading";

const MySwal = withReactContent(Swal)

function Rooms() {
    const location=useLocation().pathname;
    const navigate = useNavigate();
    const roomSelect = orderBy.rooms;

    const dispatch = useAppDispatch();
    const roomsData = useAppSelector(selectRooms);

    useEffect(() => {
        dispatch(getRoomsThunk());
    }, [dispatch]);
    
    return (
        <>
            {
                location === "/dashboard/rooms"
                    ?   roomsData.loading === false
                            ?
                                <>  
                                    <TabsComponent section={rooms}>
                                        <ButtonContainer>
                                            <SectionSelect name="room-type" id="room-type" required>
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
                                    <Table columns={roomsHeaders} data={roomsData.data} action={action(navigate)}/>
                                </>
                            : <Loading>
                                <Loader />
                            </Loading>
                    : <Outlet />
            }
        </>
    );
}

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