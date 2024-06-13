import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Title } from "../../styled/Form";
import { Amenities, ImageContainer, InfoContainer, InfoContainerRow, Preview, TextDiv, TopContainerRow } from "../../styled/Preview";
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Link, useParams } from 'react-router-dom';
import { selectRoom } from '../../store/Rooms/roomsSlice';
import { useEffect, useState } from 'react';
import { getRoom } from '../../store/Rooms/roomsThunk';
import { SpanStyledCheckIn, SpanStyledCheckOut } from '../../styled/Span';
import BackButton from '../../components/Buttons/BackButton';
import { calculateCentsToCurrency } from '../../helpers/calculateCentsToCurrency';
import LoaderComponent from '../../components/Loader';
import { selectBookings } from '../../store/Bookings/bookingsSlice';
import styled from 'styled-components';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { getBookings } from '../../store/Bookings/bookingsThunk';

SwiperCore.use([Navigation]);

function Room () {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const roomData = useAppSelector(selectRoom);
    const [fetched, setFetched] = useState(false);
    const [bookingsVisible, setBookingsVisible] = useState(false);

    const roomPrice = Number(roomData.itemData?.price);
    const calculatedRoomPrice = calculateCentsToCurrency(roomPrice);
    const roomDiscount = Number(roomData.itemData?.discount);
    const roomOffer = roomData.itemData?.offer;
    const calculatedRoomDiscount = roomOffer ? calculateCentsToCurrency(roomPrice, roomDiscount) : 0;

    const bookingsInThisRoom = useAppSelector(selectBookings).data.filter((booking) => booking.roomInfo._id === id);

    const handleChangeVisibility = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setBookingsVisible(prev => !prev);
    }

    const initialFetch = async () => {
        await dispatch(getRoom(String(id))).unwrap();
        await dispatch(getBookings()).unwrap();
        setFetched(true);
    }

    useEffect(() => {
        initialFetch()
    }, []);

    return (
        <>
            {
                (roomData.status === "fulfilled" && fetched)
                    ? 
                        <>
                            <Title>
                                <p>
                                    ROOM INFO: <small>
                                        #{roomData.itemData && roomData.itemData._id}
                                    </small>
                                </p>
                                <BackButton />
                            </Title>

                            <Preview>

                                <InfoContainer>
                                    <TopContainerRow>
                                        <TextDiv>
                                            <h3>{roomData.itemData && roomData.itemData.room_type}</h3>
                                            <h2>{roomData.itemData && roomData.itemData.name}</h2>
                                            <small>#{roomData.itemData && roomData.itemData.room_number}</small>
                                        </TextDiv>
                                    </TopContainerRow>
                                    
                                    <InfoContainerRow>
                                        <span>
                                            <small>Price:</small>
                                            <h5>{calculatedRoomPrice}€</h5>
                                        </span>
                                        <span>
                                            <small>Offer Price:</small>
                                            <h5>
                                                { roomOffer  
                                                    ? calculatedRoomDiscount + "€"
                                                    : "-"
                                                }
                                            </h5>
                                        </span>
                                    </InfoContainerRow>
                                    <hr />
                                    <TopContainerRow>
                                        <TextDiv>
                                            <h5>Cancelation Policy:</h5>
                                            <small>
                                                {roomData.itemData && roomData.itemData.cancellation}
                                            </small>
                                        </TextDiv>
                                    </TopContainerRow>
                                    <hr />
                                    <small>Amenities:</small>
                                    <Amenities>
                                        {roomData.itemData && roomData.itemData.amenities.map((item, i) => {
                                            return <span key={i}>{item}</span>
                                        })}
                                    </Amenities>
                                </InfoContainer>

                                <ImageContainer>
                                        {roomData.itemData && roomData.itemData.status === "Available" 
                                            && <SpanStyledCheckIn>
                                                    {roomData.itemData.status}
                                                </SpanStyledCheckIn> }
                                        {roomData.itemData && roomData.itemData.status === "Booked" 
                                            && <SpanStyledCheckOut>
                                                    {roomData.itemData.status}
                                                </SpanStyledCheckOut> }
                                    <div>
                                        <h4>
                                            {roomData.itemData && roomData.itemData.type}
                                        </h4>

                                        <p>
                                            {roomData.itemData && roomData.itemData.description}
                                        </p>
                                    </div>

                                    <img src={roomData.itemData && roomData.itemData.photo} alt="" />
                                </ImageContainer>

                            </Preview>

                            <StyledContainer>
                                <ContainerHeader>
                                    <span>
                                        Active bookings in Room: <small>#{roomData.itemData?.room_number}</small>
                                    </span>
                                    <StyledButton onClick={(e) => handleChangeVisibility(e)}>
                                        {
                                            bookingsVisible
                                                ?   <>
                                                        Hide <FiEyeOff />
                                                    </>
                                                :   <>
                                                        Show <FiEye />
                                                    </>
                                        }
                                    </StyledButton>
                                </ContainerHeader>

                                <StyledBookingsTable $visible={bookingsVisible}>
                                    <thead>
                                        <tr>
                                            <th>Guest</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bookingsInThisRoom.map((booking, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{ booking.full_name }</td>
                                                        <td>{ booking.email }</td>
                                                        <td>{ booking.phone }</td>
                                                        <td className='actions'>
                                                            <StyledButton 
                                                                as={Link} 
                                                                to={`/dashboard/bookings/${booking._id}`}
                                                            >
                                                                <FiEye />
                                                            </StyledButton>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </StyledBookingsTable>
                            </StyledContainer>
                        </>
                    : <LoaderComponent />
            }
        </>
    );
}

const StyledContainer = styled.div`
    margin: 1rem 12% 0 12%;
    width: 76%;
`;

const ContainerHeader = styled.h3`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    small {
        user-select: text;
        filter: sepia();
    }
`;

const StyledButton = styled.button`
        width: 6rem;
        font-size: 14px;
        text-align: center;
        border-radius: 0.5rem;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        background-color: #13584626;
        color: #1C7A61;

        &:hover {
            border-color: #145544;
        }

        &:focus, &:focus-visible {
            outline: unset;
        }
`;

const StyledBookingsTable = styled.table<{ $visible?: boolean; }>`
    padding-top: 1rem;
    width: 100%;
    display: ${({$visible}) => $visible ? '' : 'none'};
    background-color: ${({ theme }) => theme.contentBg};
    border: 2px ridge ${({ theme }) => theme.iconsColor};
    border-radius: 0.5rem;
    box-shadow: 2px 2px 6px -4px black;

    tr {
        text-align: center;
    }

    td {
        padding: 1rem;

        &.actions {
            display: flex;
            justify-content: center;
        }
    }
`;

export default Room ;