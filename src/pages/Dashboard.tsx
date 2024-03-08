import styled from "styled-components";
import { MdOutlineBed } from "react-icons/md";
import { LuCalendarCheck2 } from "react-icons/lu";
import { RiLoginBoxLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import MessagesSlider from "../components/Dashboard/Messages/MessagesSlide";
import Calendar from "../components/Calendar/Calendar";

function Dashboard() {
    
    return (
        <>
            <ButtonsContainer>
                <ButtonContent to={'/dashboard/bookings'}>
                    <ButtonImage>
                        <MdOutlineBed />
                    </ButtonImage>
                    <ButtonTextContainer>
                        <h3>8,461</h3>
                        <p>New Booking</p>
                    </ButtonTextContainer>
                </ButtonContent>

                <ButtonContent to={'/dashboard/rooms'}>
                    <ButtonImage>
                        <LuCalendarCheck2 />
                    </ButtonImage>
                    <ButtonTextContainer>
                        <h3>963</h3>
                        <p>Scheduled Room</p>
                    </ButtonTextContainer>
                </ButtonContent>

                <ButtonContent to={'/dashboard/rooms'}>
                    <ButtonImage>
                        <RiLoginBoxLine />
                    </ButtonImage>
                    <ButtonTextContainer>
                        <h3>753</h3>
                        <p>Check In</p>
                    </ButtonTextContainer>
                </ButtonContent>

                <ButtonContent to={'/dashboard/rooms'}>
                    <ButtonImage>
                        <RiLogoutBoxLine />
                    </ButtonImage>
                    <ButtonTextContainer>
                        <h3>516</h3>
                        <p>Check Out</p>
                    </ButtonTextContainer>
                </ButtonContent>
            </ButtonsContainer>

            {/* <h2>CALENDARIO Y GRAFICOS</h2> */}
            <Calendar />
            {/* <h2>BOOKINGS STATISTICS</h2> */}
            <MessagesSlider />
        </>
    );
}

const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 1.5rem;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`

const ButtonContent = styled(NavLink)`
    all: unset;
    cursor: pointer;
    width: 25%;
    display: flex;
    padding: 1rem;
    border-radius: 1rem;
    gap: 1.5rem;
    background-color: ${({ theme }) => theme.contentBg};
    transition: scale 0.3s ease;

    & > div:first-child {
            background-color: #ffedec;
        }

    div svg {
        color: #e23428;
        font-size: 22px;
    }

    &:hover {
        scale: 1.08;
        box-shadow: rgba(0, 0, 0, 0.08) 0px 16px 30px;

        & > div:first-child {
            background-color: #e23428;
        }

        div svg {
            color: white;
        }
    }
`

const ButtonImage = styled.div`
    display: flex;
    align-items: center;
    background-color: #ffedec;
    padding: 1rem;
    border-radius: 0.5rem;
    height: 100%;
    width: auto;
    aspect-ratio: 1/1;
    justify-content: center;
`

const ButtonTextContainer = styled.div`
    width: 100%;

    h3 {
        font-size: 30px;
    }

    p {
        color: #787878;
        font-weight: 300;
        font-size: 14px;
    }
`

export default Dashboard;