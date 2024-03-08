import styled from "styled-components";
import Table, { Data } from "../components/Table/Table";
import roomsData from '../Data/rooms.json';
import { Outlet, useLocation } from "react-router-dom";
import { rooms } from "../helpers/Tabs/tabs";
import { ButtonStyledViewNotes, ButtonStyledViewNotesDisabled } from "../styled/Button";
import { MessageTitle } from "../styled/Message";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { SpanStyledCheckIn, SpanStyledCheckOut } from "../styled/Span";

const MySwal = withReactContent(Swal)

function Rooms() {
    const location=useLocation().pathname;
    
    return (
        <>
            {
                location === "/dashboard/rooms"
                    ?   <>
                            <TabsContent>
                                { 
                                    rooms.map((item, index) => (
                                        <Tab key={index}>{item}</Tab>
                                    )) 
                                }
                            </TabsContent>
                            <Table columns={roomsHeaders} data={roomsData} />
                        </>
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
                            html: <img src={row.photo} alt="imagen de la habitacion" />,
                            showConfirmButton: false
                        })
                    )
                }}/>
                <SpanContainer>
                    <p>#{row.id}</p>
                    <p>Nº{row.room_number}</p>
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
                const htmlCode = (
                    <ul>
                        {row.amenities.map((amenity: string, i:number) =>{
                            return <li key={i}>{amenity}</li>
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

const SpanContainer = styled.span`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 1rem;
`

const Night = styled.p`
    font-size: 10px;
    font-weight: 200;
    color: ${({ theme }) => theme.text};
`

export default Rooms;