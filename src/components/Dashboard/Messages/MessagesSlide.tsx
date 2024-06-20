import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import styled, { ThemeContext } from 'styled-components';
import { MessageText, MessageTitle } from '../../../styled/Message';
import { format, formatDistanceToNow } from 'date-fns';
import { Star } from '../../../pages/Messages';
import { Data } from '../../Table/Table';
import { useContext } from 'react';
import CustomSwal from '../../../helpers/Swal/CustomSwal';
import { BsArchive } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { selectMessages } from '../../../store/Messages/messagesSlice';
import { editMessage } from '../../../store/Messages/messagesThunk';
import { MessageData } from '../../../store/interfaces';
import LoaderComponent from '../../Loader';
import { SlideImg } from '../../../styled/Preview';

SwiperCore.use([Navigation]);

function MessagesSlider() {
    const dispatch = useAppDispatch();
    const selectedData = useAppSelector(selectMessages);
    const messagesData = Array.isArray(selectedData.data)
        ? [...selectedData.data]
            .filter((message) => message.archived === false)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];

    const theme = useContext(ThemeContext);

    const messageStars = (row: number) => {
        const messageStars = [];
                
        for (let index = 0; index < row; index++) {
            messageStars.push(<Star key={index} />);
        }
    
        return <span>{messageStars}</span>;
    }

    const handleArchive = async(e: React.MouseEvent<HTMLElement, MouseEvent>, message: MessageData) => {
        e.stopPropagation();
        const isArchived = message.archived === true;
        if(!isArchived){
            await dispatch(editMessage({row: message as MessageData, fieldToEdit: "archived"}));
        }
    }

    const action = async(e: React.MouseEvent<HTMLElement, MouseEvent>, row: Data) => {
        e.stopPropagation()
        const swalProps = {
            title: <MessageTitle>{row.full_name} <small>#{row._id}</small></MessageTitle>,
            html: (
                <>
                    <MessageText><strong>Email:</strong> {row.email}</MessageText>
                    <MessageText><strong>Phone:</strong> {row.phone}</MessageText>
                    <MessageText><strong>Date:</strong> {format( new Date(`${row.createdAt}`), 'MMM do, yyyy')}</MessageText>
                    <MessageText><strong>Rating:</strong> { messageStars(Number(row.stars)) }</MessageText>
                    <br />
                    <MessageText><strong>Subject:</strong> {row.subject}</MessageText>
                    <br />
                    <MessageText><strong>Message:</strong> {row.message}</MessageText>
                </>
            ),
            showConfirmButton: false
        }
        
        await CustomSwal({data: swalProps, theme: theme});
    }

    return (
        <>
            { messagesData.length > 0
                ?   <SwiperItem
                        direction='horizontal'
                        slidesPerView={3}
                        spaceBetween={30}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        <h2>Latest Reviews by Customers</h2>
                        { messagesData.map((message, messageIndex) => {
                                const timeAgo = formatDistanceToNow(new Date(message.createdAt), {
                                    addSuffix: true,
                                    includeSeconds: true
                                });

                                return (
                                    <SwiperSlideItem key={messageIndex} onClick={(e) => action(e, message)}>
                                        <h4>
                                            {
                                                (message.message.length > 150)
                                                    ? message.message.slice(0, 150) + "..."
                                                    : message.message
                                            }
                                        </h4>
                                        <InfoContainer>
                                            <div>
                                                <SlideImg src={message.foto} alt="" />
                                                <div>
                                                    <h6>{message.full_name}</h6>
                                                    <small>{timeAgo}</small>
                                                </div>
                                            </div>
                                            <ButtonsContainer>
                                                { message.archived === false
                                                    && <StatusButtonUnarchive 
                                                            onClick={(e)=>{
                                                                handleArchive(e, message)
                                                            }}
                                                            style={{
                                                                color:'white',
                                                                boxShadow:'rgb(0 0 0 / 40%) 1px 1px 2px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset',
                                                                padding:'0.5rem',
                                                                borderRadius:'0.5rem',
                                                                backgroundColor:'#a11e1e'
                                                            }}
                                                        >
                                                            <BsArchive />
                                                        </StatusButtonUnarchive> 
                                                }
                                            </ButtonsContainer>
                                        </InfoContainer>
                                    </SwiperSlideItem>
                                )
                            })
                        }
                    </SwiperItem>
                : <>
                    <EmptyMessages>
                        <h2>Latest Reviews by Customers</h2>
                        <div>
                            {/* <h5>There's no unread messages.</h5> */}
                            <LoaderComponent />
                        </div>
                    </EmptyMessages>
                </>
                
            }
        </>
    );
}

const SwiperItem = styled(Swiper)`
    background-color: ${({ theme }) => theme.contentBg};
    width: 100%;
    padding: 0.5rem 1.2rem 1.2rem 1.2rem;
    display: flex;
    gap: 0.8rem;
    flex-direction: column-reverse;
    border-radius: 0.5rem;
    user-select: none;
    z-index: 0;
    box-shadow: 2px 2px 6px -4px black;

    .swiper-slide {
        height: auto;
    }

    .swiper-button-prev, .swiper-button-next {
        position: absolute;
        top: 35px;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        padding: 1rem 1.5rem 1rem 1.5rem;
        background-color: ${({ theme }) => theme.bg};
        border-radius: 0.5rem;
        color: ${({ theme }) => theme.text};
        cursor: pointer;

        &:hover {
            filter: invert(10%);
        }
    }

    .swiper-button-prev::after, .swiper-button-next::after {
        font-size: 16px;
    }

    .swiper-button-next {
        right: 1.2rem;
    }

    .swiper-button-prev {
        left: unset;
        right: 4.8rem;
    }

    h2 {
        padding: 0.5rem 0 0.5rem 0;
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

export const StatusButtonArchive = styled.a`
    cursor: pointer;
    background-color: unset;
    font-size: 20px;
    color: #5AD07A;
`

export const StatusButtonUnarchive = styled(StatusButtonArchive)`
    color: #ff1818;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SwiperSlideItem = styled(SwiperSlide)`
    position: relative;
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
    transition: scale 0.2s ease-in-out;
    box-shadow: 0.5px 0.5px 5px -4px black;

    &:hover {
        scale: 1.05;
        text-rendering: optimizeLegibility;
        box-shadow: rgba(0, 0, 0, 0.08) 8px 8px 20px;
    }

    &:active {
        cursor: grabbing;
    }
`

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    h6 {
        font-size: 13px;
    }

    small {
        font-size: 12px;
        color: ${({ theme }) => theme.text};
        filter: brightness(50%);
    }
    
    div {
        display: inline-flex;
        text-align: left;
        justify-content: center;

        div {
            display: flex;
            flex-direction: column;
        }
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

// const SlideImg = styled.img`
//     display: block;
//     border-radius: 0.5rem;
//     width: auto;
//     height: 50px;
//     aspect-ratio: 1/1;
//     object-fit: cover;
//     margin-right: 0.5rem;
// `

const EmptyMessages = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    height: 250px;
    padding: 0.5rem 1.2rem 1.2rem 1.2rem;
    border-radius: 0.5rem;

    h2 {
        padding: 0.5rem 0 0.5rem 0;
        font-size: 18px;
        font-weight: 500;
    }

    div {
        height: 80%;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export default MessagesSlider;