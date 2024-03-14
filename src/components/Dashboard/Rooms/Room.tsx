import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Title } from "../../../styled/Form";
import { Amenities, ImageContainer, InfoContainer, InfoContainerRow, Preview, TextDiv, TopContainerRow } from "../../../styled/Preview";
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { useParams } from 'react-router-dom';
import { selectRoom } from '../../../store/Rooms/roomsSlice';
import { useEffect } from 'react';
import { getRoom } from '../../../store/Rooms/roomsThunk';
import { Loader, Loading } from '../../../styled/Loading';
import { SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from '../../../styled/Span';

SwiperCore.use([Navigation]);

function Room () {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const roomData = useAppSelector(selectRoom);

    useEffect(() => {
        dispatch(getRoom(Number(id)));
    }, [dispatch, id]);

    return (
        <>
            {
                roomData.status === "fulfilled"
                    ? 
                        <>
                            <Title>
                                ROOM INFO: #{roomData.itemData && roomData.itemData.id}
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
                                            <h5>{roomData.itemData && roomData.itemData.price}€</h5>
                                        </span>
                                        <span>
                                            <small>Offer Price:</small>
                                            <h5>{roomData.itemData && roomData.itemData.offer}€</h5>
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
                    : <Loading>
                    <Loader />
                </Loading>
            }
        </>
    );
}

export default Room ;