import styled, { useTheme } from "styled-components";
import { MdOutlineMessage } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiBellOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export const TopbarComponent = ({ visible, toggleSidebar }: { visible: boolean, toggleSidebar: () => void }) => {
    const { theme, handleToggleTheme } = useTheme();

    return (
        <TopBar>
            { visible
                ? <ArrowLeft onClick={toggleSidebar} />
                : <ArrowRight onClick={toggleSidebar} /> }

            <div>
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
            </div>

        </TopBar>
    )

}

const TopBar = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 90px;
    padding: 2rem;
    box-shadow: 0px 3px 10px #00000005;
`

const MenuIcon = styled.button`
    color: ${({ theme }) => theme.menuText};
    background-color: unset;
    font-size: 25px;
    padding: 0.5rem;
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
    background-color: ${({ theme }) => theme.bg};
    border: 1px;
    /* border-color: ${({ theme }) => theme.themeButtonBg}; */
    color: ${({ theme }) => theme.text};
    padding: 0.5rem;
    cursor: pointer;
    font-size: 15px;
    border-radius: 5px;
    margin: 0.5rem;
    box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

    &:focus, &:focus-visible {
        outline: none;
    }
`;

const ThemeButtonLayout = styled(ButtonTopbar)`
    position: absolute;
    top: 20px;
    right: 25px;
    margin: 0;
    z-index: 1;
`