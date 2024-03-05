import styled, { useTheme } from "styled-components";
import { MdOutlineMessage } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiBellOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export const TopbarComponent = ({ visible, toggleSidebar }: { visible: boolean, toggleSidebar: () => void }) => {
    const { theme, handleToggleTheme } = useTheme();
    const location = useLocation();

    return (
        <>
            <RoutePath>
                { visible
                    ? <ArrowLeft onClick={toggleSidebar} />
                    : <ArrowRight onClick={toggleSidebar} />
                }
                <Location>{location.pathname.split("/")[2] ?? "dashboard"}</Location>
            </RoutePath>

            <TopbarContainer>
                <MenuIcon>
                    <SlEnvolopeLetter />
                </MenuIcon>

                <MenuIcon>
                    <CiBellOn />
                </MenuIcon>

                <MenuIcon>
                    <MdOutlineMessage />
                </MenuIcon>

                <ThemeButtonLayout onClick={handleToggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </ThemeButtonLayout>
            </TopbarContainer>

        </>
    )

}

const TopbarContainer = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`

const MenuIcon = styled.button`
    display: flex;
    color: ${({ theme }) => theme.menuText};
    background-color: unset;
    font-size: 25px;
    padding: 0;
    outline: unset;

    &:hover {
        color: ${({ theme }) => theme.text};
    }

    &:hover, &:focus, &:focus-visible, &:active {
        outline: unset;
    }
`

const ArrowLeft = styled(FaArrowLeft)`
    font-size: 25px;
    cursor: pointer;
`

const ArrowRight = styled(FaArrowRight)`
    font-size: 25px;
    cursor: pointer;
`

const ButtonTopbar = styled.button`
    background-color: ${({ theme }) => theme.menuBox};
    border: 1px;
    padding: 0.3rem;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

    &:focus, &:focus-visible {
        outline: none;
    }
`;

const ThemeButtonLayout = styled(ButtonTopbar)`
    margin: 0;
    margin-left: 2rem;
    z-index: 1;
    height: 100%;
`

const RoutePath = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`

const Location = styled.p`
    font: normal normal 600 20px Poppins;
    text-transform: capitalize;
`