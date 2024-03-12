import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import styled from "styled-components"

export const Preview = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    padding: 1rem 0;
    border-radius: 0.5rem;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    margin: 1rem 15% 0 15%;
    box-shadow: 2px 2px 6px -4px black;
`

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
`

export const InfoContainer = styled(PreviewContainer)`
    background-color: ${({ theme }) => theme.contentBg};    
`

export const TopContainerRow = styled.div`
    display: flex;
`

export const InfoContainerRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;

    span {
        margin-top: 1rem;
    }
`

export const Amenities = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);

    span {
        font-size: 14px;
        text-align: center;
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        background-color: green;
        color: white;
    }
`

export const ImageDiv = styled.div`
    
`

export const TextDiv = styled.div`
    display: block;

    span {
        margin-right: 2rem;
    }
`

export const ImageContainer = styled(PreviewContainer)`
    position: relative;
    background-color: grey;
    border-radius: 0.5rem;

    span {
        position: absolute;
        padding: 0.5rem;
        margin: 0;
        border-radius: 0.5rem;
        top: 0.5rem;
        right: 0.5rem;
    }

    div {
        width: 100%;
        position: absolute;
        background-color: grey;
        bottom: 0;
        padding: 2rem 2rem;

        h4 {
            font-size: 16px;
            margin-bottom: 1rem;
        }

        p {
            font-size: 14px;
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`

export const SwiperItem = styled(Swiper)`
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

export const SwiperSlideItem = styled(SwiperSlide)`
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

export const SlideImg = styled.img`
    display: block;
    width: auto;
    height: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
`