import { useLocation } from "react-router-dom";
import { Title } from "../../../styled/Form";
import { Preview, PreviewContainer, SlideImg, SwiperItem, SwiperSlideItem } from "../../../styled/Preview";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

SwiperCore.use([Navigation]);

function Booking () {
    const location = useLocation();
    const rowData = location.state.rowData;

    return (
        <>
        
            <Title>
                BOOKING INFO
            </Title>

            <Preview>


                <PreviewContainer>
                    INFO
                    <p>{rowData.id}</p>
                </PreviewContainer>

                <PreviewContainer>
                <SwiperItem
                    direction='horizontal'
                    slidesPerView={3}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    <p>IMAGE SWIPER</p>
                    {/* {selectedData.map((message, messageIndex) => (
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
                    ))} */}
                </SwiperItem>
                </PreviewContainer>

            </Preview>


        </>
    );
}

export default Booking ;