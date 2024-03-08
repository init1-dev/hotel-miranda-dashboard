import styled, { useTheme } from "styled-components";
import { MdOutlineMessage } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { RiMenuFoldLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import Logout from "../../Logout/Logout";

export const TopbarComponent = ({ visible, toggleSidebar }: { visible: boolean, toggleSidebar: () => void }) => {
    const { theme, handleToggleTheme } = useTheme();
    const location = useLocation().pathname;

    const title = (location: string) => {
        switch (true) {
            case location.startsWith('/dashboard/bookings/edit/'):
                return "Bookings / Edit Booking ";
            case location.startsWith('/dashboard/bookings/'):
                return "Bookings / View Booking";
            case location.startsWith('/dashboard/bookings'):
                return "Bookings";
            case location.startsWith('/dashboard/rooms/edit/'):
                return "Rooms / Edit Room";
            case location.startsWith('/dashboard/rooms/'):
                return "Rooms / View Room";
            case location.startsWith('/dashboard/rooms'):
                return "Rooms";
            case location.startsWith('/dashboard/employees/edit/'):
                return "Employees / Edit Employee";
            case location.startsWith('/dashboard/employees/'):
                return "Employees / View Employee";
            case location.startsWith('/dashboard/employees'):
                return "Employees";
            case location.startsWith('/dashboard/messages'):
                return "Messages";
            default:
                return "Dashboard";
        }
    }

    return (
        <>
            <RoutePath onClick={toggleSidebar}>
                { visible
                    ? <ArrowLeft />
                    : <ArrowRight />
                }
                <Location>{title(location)}</Location>
            </RoutePath>

            <TopbarContainer>
                <MenuIcon to={'/dashboard/messages'}>
                    <MenuIconAlert>
                        2
                    </MenuIconAlert>
                    <MdOutlineMessage />
                </MenuIcon>

                <MenuIcon to={'/dashboard'}>
                    <MenuIconAlert>
                        87
                    </MenuIconAlert>
                    <CiBellOn />
                </MenuIcon>

                <Logout />

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

const MenuIcon = styled(NavLink)`
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

const ArrowLeft = styled(RiMenuFoldLine)`
    font-size: 25px;
`

const ArrowRight = styled(FaArrowRight)`
    font-size: 25px;
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
    cursor: pointer;
`

const Location = styled.p`
    font: normal normal 600 20px Poppins;
    text-transform: capitalize;
`