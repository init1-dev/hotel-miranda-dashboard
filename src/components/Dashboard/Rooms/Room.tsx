import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Title } from "../../../styled/Form";
import { Amenities, ImageContainer, InfoContainer, InfoContainerRow, Preview, TextDiv, TopContainerRow } from "../../../styled/Preview";
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { useParams } from 'react-router-dom';
import { selectRoom } from '../../../store/Rooms/roomsSlice';
import { useEffect, useState } from 'react';
import { getRoom } from '../../../store/Rooms/roomsThunk';
import { SpanStyledCheckIn, SpanStyledCheckOut } from '../../../styled/Span';
import BackButton from '../../Buttons/BackButton';
import { calculateCentsToCurrency } from '../../../helpers/calculateCentsToCurrency';
import LoaderComponent from '../../Loader';

SwiperCore.use([Navigation]);

function Room () {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const roomData = useAppSelector(selectRoom);
    const [fetched, setFetched] = useState(false);

    const roomPrice = Number(roomData.itemData?.price);
    const calculatedRoomPrice = calculateCentsToCurrency(roomPrice);
    const roomDiscount = Number(roomData.itemData?.discount);
    const roomOffer = roomData.itemData?.offer;
    const calculatedRoomDiscount = roomOffer ? calculateCentsToCurrency(roomPrice, roomDiscount) : 0;

    const initialFetch = async () => {
        await dispatch(getRoom(String(id)));
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
                        </>
                    : <LoaderComponent />
            }
        </>
    );
}

export default Room ;