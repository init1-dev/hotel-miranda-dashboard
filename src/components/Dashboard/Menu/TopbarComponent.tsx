import styled, { useTheme } from "styled-components";
import { MdOutlineMessage } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { RiMenuFoldLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Logout from "../../Logout/Logout";
import TitleComponent from "./TitleComponent";
import ThemeButton from "./ThemeButton";

export const TopbarComponent = ({ visible, toggleSidebar }: { visible: boolean, toggleSidebar: () => void }) => {
    const { theme, handleToggleTheme } = useTheme();

    return (
        <>
            <RoutePath>
                { visible
                    ? <ArrowLeft onClick={toggleSidebar} />
                    : <ArrowRight onClick={toggleSidebar} />
                }
                <TitleComponent />
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

                <ThemeButton theme={theme} handleToggleTheme={handleToggleTheme}/>
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

const ArrowRight = styled(RiMenuFoldLine)`
    transform: scaleX(-1);
    font-size: 25px;
`

const RoutePath = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;

    svg {
        cursor: pointer;
    }
`