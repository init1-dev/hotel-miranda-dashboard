import { Swiper, SwiperSlide } from 'swiper/react';
import messagesData from '../../../Data/messages.json';

import 'swiper/css';
import 'swiper/css/navigation';

import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import styled, { ThemeContext } from 'styled-components';
import { MessageText, MessageTitle } from '../../../styled/Message';
import { format } from 'date-fns';
import { Star } from '../../../pages/Messages';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Data } from '../../Table/Table';
import { useContext } from 'react';

SwiperCore.use([Navigation]);
const MySwal = withReactContent(Swal);

function MessagesSlider() {
    const selectedData = messagesData.slice(0, 10);
    const theme = useContext(ThemeContext);

    const messageStars = (row: number) => {
        const messageStars = [];
                
        for (let index = 0; index < row; index++) {
            messageStars.push(<Star key={index} />);
        }
    
        return <span>{messageStars}</span>;
    }

    const action = (e: React.MouseEvent<HTMLElement, MouseEvent>, row: Data) => {
        e.stopPropagation()
        return (
            MySwal.fire({
                title: <MessageTitle>{row.full_name} <small>#{row.message_id}</small></MessageTitle>,
                html: (
                    <>
                        <MessageText><strong>Email:</strong> {row.email}</MessageText>
                        <MessageText><strong>Phone:</strong> {row.phone}</MessageText>
                        <MessageText><strong>Date:</strong> {format( new Date(`${row.date}`), 'MMM do, yyyy')}</MessageText>
                        <MessageText><strong>Rating:</strong> { messageStars(Number(row.stars)) }</MessageText>
                        <br />
                        <MessageText><strong>Subject:</strong> {row.subject}</MessageText>
                        <br />
                        <MessageText><strong>Message:</strong> {row.message}</MessageText>
                    </>
                ),
                color: theme && theme.text,
                background: theme && theme.contentBg,
                showConfirmButton: false
            })
        )
    }

    return (
        <>
            <SwiperItem
                direction='horizontal'
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <h2>Latest Reviews by Customers</h2>
                {selectedData.map((message, messageIndex) => (
                    <SwiperSlideItem key={messageIndex} onClick={(e) => action(e, message)}>
                        <h4>
                            {message.message.slice(0, 200) + "..."}
                        </h4>
                        <div>
                            <SlideImg src={message.foto} alt="" />
                            <div>
                                <p>{message.full_name}</p>
                                <p>{message.time_passed}</p>
                            </div>
                            <p>
                                {message.archived ? "Archived" : "Not Archived"}
                            </p>
                        </div>
                    </SwiperSlideItem>
                ))}
            </SwiperItem>
        </>
    );
}

const SwiperItem = styled(Swiper)`
    background-color: ${({ theme }) => theme.contentBg};
    position: relative;
    width: 100%;
    height: 250px;
    padding: 0.5rem 1rem 1rem 1rem;
    display: flex;
    gap: 0.8rem;
    flex-direction: column-reverse;
    border-radius: 0.5rem;
    user-select: none;
    z-index: 0;
    margin-bottom: 1rem;

    .swiper-button-prev, .swiper-button-next {
        position: absolute;
        top: 30px;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        padding: 1rem 1.5rem 1rem 1.5rem;
        background-color: ${({ theme }) => theme.bg};
        border-radius: 0.5rem;
        color: ${({ theme }) => theme.text};
        cursor: pointer;
    }

    .swiper-button-prev::after, .swiper-button-next::after {
        font-size: 20px;
    }

    .swiper-button-next {
        right: 1rem;
    }

    .swiper-button-prev {
        left: unset;
        right: 4.5rem;
    }

    h2 {
        font-size: 18px;
        font-weight: 500;
    }

    h4 {
        text-align: left;
        color: ${({ theme }) => theme.text};
        filter: opacity(0.7);
        font-size: 13px;
        font-weight: 400;
    }
`

const SwiperSlideItem = styled(SwiperSlide)`
    border: 1px solid #80808042;
    border-radius: 0.5rem;
    text-align: center;
    flex-direction: column;
    font-size: 18px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }

    p {
        text-align: left;
        font-size: 13px;
        color: ${({ theme }) => theme.text};
    }

    div {
        display: flex;
        align-items: center;
        width: 100%;

        p {
            font-size: 14px;
            color: ${({ theme }) => theme.text};
        }

        div {
            align-items: flex-start;
            display: flex;
            flex-direction: column;
        }
    }
`

const SlideImg = styled.img`
    display: block;
    width: auto;
    height: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
`

export default MessagesSlider;