import { Swiper, SwiperSlide } from 'swiper/react';
import messagesData from '../../../Data/messages.json';

import 'swiper/css';
import 'swiper/css/navigation';

import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import styled from 'styled-components';

SwiperCore.use([Navigation]);

function MessagesSlider() {
    const selectedData = messagesData.slice(0, 10);

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
                    <SwiperSlideItem key={messageIndex}>
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