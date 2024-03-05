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
                    <MenuIconAlert>
                        2
                    </MenuIconAlert>
                    <SlEnvolopeLetter />
                </MenuIcon>

                <MenuIcon>
                    <MenuIconAlert>
                        87
                    </MenuIconAlert>
                    <CiBellOn />
                </MenuIcon>

                <MenuIcon>
                    <MenuIconAlert>
                        !
                    </MenuIconAlert>
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
    gap: 4rem;
    align-items: center;
`

const MenuIcon = styled.button`
    position: relative;
    display: flex;
    color: ${({ theme }) => theme.iconsColor};
    background-color: unset;
    font-size: 25px;
    padding: 0;
    outline: unset;
    border: unset;

    &:hover {
        color: ${({ theme }) => theme.text};
    }

    &:hover, &:focus, &:focus-visible, &:active {
        outline: unset;
        border: unset;
    }
`

const MenuIconAlert = styled.p`
    position: absolute;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    top: -10px;
    left: 15px;
    color: white;
    font-size: 12px;
    background-color: red;
    border-radius: 0.4rem;
    height: 22px;
    min-width: 24px;
    width: auto;
    padding: 0.2rem;

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