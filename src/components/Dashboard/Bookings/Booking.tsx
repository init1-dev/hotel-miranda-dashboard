import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { Title } from "../../../styled/Form";
import { Amenities, ImageContainer, ImageDiv, InfoContainer, InfoContainerRow, Preview, TextDiv, TopContainerRow } from "../../../styled/Preview";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useParams } from "react-router-dom";
import { getBooking } from "../../../store/Bookings/bookingsThunk";
import { selectBooking } from "../../../store/Bookings/bookingsSlice";
import { Loader, Loading } from "../../../styled/Loading";
import { format } from "date-fns";
import { SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from "../../../styled/Span";

SwiperCore.use([Navigation]);

function Booking () {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const bookingData = useAppSelector(selectBooking);

    useEffect(() => {
        dispatch(getBooking(Number(id)));
    }, [dispatch, id]);

    return (
        <>  
            {
                bookingData.status === "fulfilled"
                    ? 
                        <>
                            <Title>
                                BOOKING INFO: #{bookingData.itemData && bookingData.itemData.id}
                            </Title>

                            <Preview>

                                <InfoContainer>
                                    <TopContainerRow>
                                        <ImageDiv>
                                            <img src={bookingData.itemData && bookingData.itemData.image} alt="imagen de perfil" />
                                        </ImageDiv>
                                        <TextDiv>
                                            <h3>{bookingData.itemData && bookingData.itemData.full_name}</h3>
                                            <small>#{bookingData.itemData && bookingData.itemData.id}</small>
                                        </TextDiv>
                                    </TopContainerRow>

                                    <InfoContainerRow>
                                        <span>
                                            <small>Check In:</small>
                                            <h5>{bookingData.itemData && format( new Date(`${bookingData.itemData.check_in}`), 'MMM do, yyyy')}</h5>
                                        </span>
                                        <span>
                                            <small>Check Out:</small>
                                            <h5>{bookingData.itemData && format( new Date(`${bookingData.itemData.check_out}`), 'MMM do, yyyy')}</h5>
                                        </span>
                                    </InfoContainerRow>
                                    <hr />
                                    <InfoContainerRow>
                                        <span>
                                            <small>Room Info:</small>
                                            <h5>{bookingData.itemData && bookingData.itemData.type + " #" + bookingData.itemData.number}</h5>
                                        </span>
                                        <span>
                                            <small>Price:</small>
                                            <h5>{bookingData.itemData && bookingData.itemData.price}€</h5>
                                        </span>
                                    </InfoContainerRow>

                                    <small>
                                        <p>Price:</p>
                                        <p><i>{bookingData.itemData && bookingData.itemData.special_request}</i></p>
                                    </small>

                                    <small>Amenities:</small>
                                    <Amenities>
                                        {bookingData.itemData && bookingData.itemData.amenities.map((item, i) => {
                                            return <span key={i}>{item}</span>
                                        })}
                                    </Amenities>
                                </InfoContainer>

                                <ImageContainer>
                                        {bookingData.itemData && bookingData.itemData.status === "In Progress" 
                                            && <SpanStyledInProgress>
                                                    {bookingData.itemData.status}
                                                </SpanStyledInProgress> }
                                        {bookingData.itemData && bookingData.itemData.status === "Check In" 
                                            && <SpanStyledCheckIn>
                                                    {bookingData.itemData.status}
                                                </SpanStyledCheckIn> }
                                        {bookingData.itemData && bookingData.itemData.status === "Check Out"
                                            && <SpanStyledCheckOut>
                                                    {bookingData.itemData.status}
                                                </SpanStyledCheckOut> }
                                    <div>
                                        <h4>
                                            {bookingData.itemData && bookingData.itemData.type}
                                        </h4>

                                        <p>
                                            {bookingData.itemData && bookingData.itemData.description}
                                        </p>
                                    </div>

                                    <img src={bookingData.itemData && bookingData.itemData.foto} alt="" />
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

export default Booking ;