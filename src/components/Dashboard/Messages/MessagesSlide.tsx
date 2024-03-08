import { Swiper, SwiperSlide } from 'swiper/react';
import messagesData from '../../../Data/messages.json';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../index.css';

import { Navigation } from 'swiper/modules';
import styled from 'styled-components';

function MessagesSlider() {
    const selectedData = messagesData.slice(0, 10);

    return (
        <>
            <SwiperItem
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <h2>Latest Review by Customers</h2>
                {selectedData.map((message, messageIndex) => (
                    <SwiperSlideItem key={messageIndex}>
                        <p>
                            {message.message.slice(0, 200) + "..."}
                        </p>
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
    width: 100%;
    height: 300px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column-reverse;
    margin-top: 2rem;
    border-radius: 0.5rem;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`

const SwiperSlideItem = styled(SwiperSlide)`
    border: 1px solid grey;
    border-radius: 0.5rem;
    text-align: center;
    flex-direction: column;
    font-size: 18px;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    p {
        text-align: left;
        font-size: 14px;
        color: ${({ theme }) => theme.text};
    }

    div {
        display: flex;
        align-items: center;
        width: 100%;

        p {
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