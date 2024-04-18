import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { Title } from '../../../styled/Form';
import { Amenities, ImageContainer, InfoContainer, InfoContainerRow, Preview, TextDiv, TopContainerRow } from '../../../styled/Preview';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import { getBooking } from '../../../store/Bookings/bookingsThunk';
import { selectBooking } from '../../../store/Bookings/bookingsSlice';
import { format } from 'date-fns';
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut, SpanStyledInProgress } from '../../../styled/Span';
import BackButton from '../../Buttons/BackButton';
import { calculateBookingDiscount, calculateCentsToCurrency } from '../../../helpers/calculateCentsToCurrency';
import styled, { ThemeContext } from 'styled-components';
import CustomSwal from '../../../helpers/Swal/CustomSwal';
import { BookingData } from '../../../store/interfaces';
import { customToast } from '../../../helpers/toastify/customToast';
import { MessageTitle } from '../../../styled/Message';
import LoaderComponent from '../../Loader';

SwiperCore.use([Navigation]);

function Booking () {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const bookingData = useAppSelector(selectBooking);
    const [fetched, setFetched] = useState(false);
    const theme = useContext(ThemeContext);

    const roomPrice = bookingData.itemData?.roomInfo.price; 
    const roomDiscount = bookingData.itemData?.roomInfo.discount;
    const roomPriceToCurrency = calculateCentsToCurrency(roomPrice, roomDiscount);
    const bookingDiscount = bookingData.itemData?.discount || 0;
    const bookingPrice = calculateBookingDiscount(roomPriceToCurrency, bookingDiscount);

    const initialFetch = async () => {
        await dispatch(getBooking(String(id)));
        setFetched(true);
    }

    useEffect(() => {
        initialFetch()
    }, []);

    const showDetails = async(e: React.MouseEvent<HTMLElement, MouseEvent>, info: BookingData | undefined) => {
        e.stopPropagation();
        if(!info){
            customToast('error', 'User info not found');
        }
        const swalProps = {
            title: <SpanContainer>
                <MessageTitle>User details:</MessageTitle>
            </SpanContainer>,
            html: <SpanContainer>
                <small>Phone:</small>
                <h5><strong>{info?.phone}</strong></h5>
                <br />
                <small>Email:</small>
                <h5><strong>{info?.email}</strong></h5>
            </SpanContainer>
        }
        await CustomSwal({data: swalProps, theme: theme})
    }

    return (
        <>  
            {
                (bookingData.status === 'fulfilled' && fetched)
                    ? 
                        <>
                            <Title>
                                <p>
                                    BOOKING INFO: <small>
                                        #{bookingData.itemData && bookingData.itemData._id}
                                    </small>
                                </p>
                                <BackButton />
                            </Title>

                            <Preview>

                                <InfoContainer>
                                    <TopContainerRow style={{cursor:'zoom-in'}}>
                                        <TextDiv onClick={(e) => showDetails(e, bookingData.itemData)}>
                                            <h3>{bookingData.itemData && bookingData.itemData.full_name}</h3>
                                            <small>#{bookingData.itemData && bookingData.itemData._id}</small>
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
                                    
                                    <InfoContainerRow>
                                        <TextDiv>
                                            <small>Room Info:</small>
                                            <h5>
                                                {bookingData.itemData && 
                                                    <>
                                                        {bookingData.itemData.roomInfo.room_type + ' ['}
                                                        <RoomLink to={`/dashboard/rooms/${bookingData.itemData.roomInfo._id}`}>
                                                            {'Room #' + bookingData.itemData.roomInfo.room_number}
                                                        </RoomLink>
                                                        {']'}
                                                    </>
                                                }
                                            </h5>
                                        </TextDiv>
                                        <TextDiv>
                                            <small>Price:</small>
                                            <h5>{bookingData.itemData && bookingPrice}€</h5>
                                        </TextDiv>
                                    </InfoContainerRow>

                                    <TopContainerRow>
                                        <TextDiv>
                                            <small>Order date:</small>
                                            <h5>
                                                {bookingData.itemData && format( new Date(`${bookingData.itemData.order_date}`), 'PPPpp')}
                                            </h5>
                                        </TextDiv>
                                    </TopContainerRow>
                                    <hr />
                                    <small>Amenities:</small>
                                    <Amenities>
                                        {bookingData.itemData && bookingData.itemData.roomInfo.amenities.map((item: string, i: number) => {
                                            return <span key={i}>{item}</span>
                                        })}
                                    </Amenities>
                                </InfoContainer>

                                <ImageContainer>
                                        {bookingData.itemData && bookingData.itemData.status === 'In Progress' 
                                            && <SpanStyledInProgress>
                                                    {bookingData.itemData.status}
                                                </SpanStyledInProgress> }
                                        {bookingData.itemData && bookingData.itemData.status === 'Check In' 
                                            && <SpanStyledCheckIn>
                                                    {bookingData.itemData.status}
                                                </SpanStyledCheckIn> }
                                        {bookingData.itemData && bookingData.itemData.status === 'Check Out'
                                            && <SpanStyledCheckOut>
                                                    {bookingData.itemData.status}
                                                </SpanStyledCheckOut> }
                                    <div>
                                        <h4>Special request:</h4>
                                        <p>
                                            {bookingData.itemData && bookingData.itemData.special_request}
                                        </p>
                                    </div>

                                    <img src={bookingData.itemData && bookingData.itemData.roomInfo.photo} alt='' />
                                </ImageContainer>

                            </Preview>
                        </>
                    : <LoaderComponent />
            }
            
            


        </>
    );
}

const RoomLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.iconsColor};
    font-size: 15px;
`

export default Booking ;