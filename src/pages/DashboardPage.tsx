import { NavLink, Outlet } from "react-router-dom"
import styled, { useTheme } from "styled-components"
import { ThemeButton } from "../helpers/dashboard/dashboardStyles";
import AuthStatus from "../helpers/login/authStatus";
import { MdOutlineMessage } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiBellOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";

export const DashboardPage = () => {
    const { theme, handleToggleTheme } = useTheme();
    const [active, setActive] = useState('/dashboard');

    return (
        <div className="dashboard-container">
            <SideBar>
                <Imagen src="/assets/travl.png" alt="" />

                <Lista>
                    <MenuOption 
                        to="/dashboard"
                        className={ active === "/dashboard" ? "activated" : ""}
                        onClick={() => setActive("/dashboard")}
                    >
                        <LuLayoutDashboard />
                        <Texto>Dashboard</Texto>
                    </MenuOption>
                    <MenuOption 
                        to="/dashboard/bookings"
                        className={ active === "/dashboard/bookings" ? "activated" : ""}
                        onClick={() => setActive("/dashboard/bookings")}
                    >
                        <FaRegCalendarAlt />
                        <Texto>Bookings</Texto>
                    </MenuOption>

                    <MenuOption 
                        to="/dashboard/rooms"
                        className={ active === "/dashboard/rooms" ? "activated" : ""}
                        onClick={() => setActive("/dashboard/rooms")}
                    >
                        <IoKeyOutline />
                        <Texto>Rooms</Texto>
                    </MenuOption>

                    <MenuOption 
                        to="/dashboard/contact"
                        className={ active === "/dashboard/contact" ? "activated" : ""}
                        onClick={() => setActive("/dashboard/contact")}
                    >
                        <MdOutlineMessage />
                        <Texto>Contact</Texto>
                    </MenuOption>

                    <MenuOption 
                        to="/dashboard/users"
                        className={ active === "/dashboard/users" ? "activated" : ""}
                        onClick={() => setActive("/dashboard/users")}
                    >
                        <IoPersonOutline />
                        <Texto>Users</Texto>
                    </MenuOption>
                </Lista>
                
                <AuthStatus />
            </SideBar>

            <TopBar>
                <FaArrowLeft />

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

                    <ThemeButton onClick={handleToggleTheme}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </ThemeButton>
                </div>

            </TopBar>

            <Content>
                <Outlet />
            </Content>
        </div>
    )

}

const SideBar = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    flex-direction: column;
    position: fixed;
    padding: 0 2rem 2rem 2rem;
    width: 20rem;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: -3px 5px 15px black;
    z-index: 1;
`

const Imagen = styled.img`
    width: 100%;
    padding: 1rem;
    margin: 0 auto 3rem auto;
`

const TopBar = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 20rem);
    height: 100px;
    padding: 2rem;
    box-shadow: 0px 3px 10px #00000005;
`

const Content = styled.div`
    margin-top: 100px;
    margin-left: 20rem;
`

const MenuIcon = styled.button`
    color: ${({ theme }) => theme.menuText};
    background-color: unset;
    font-size: 30px;
    padding: 0.5rem;
`

const Lista = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 5rem;
    margin-left: 2rem;
`

const MenuOption = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    position: relative;
    color: ${({ theme }) => theme.menuText};
    font-size: 1.5rem;
    text-decoration: none;
    cursor: pointer;
    margin: 2rem 0;
    transition: font 0.1s ease;
    transition: color 0.1s ease;

    &:hover, &.activated {
        font-weight: bold;
        color: ${({ theme }) => theme.menuActive};
    }

    &.activated::before {
        content: '';
        display: block;
        position: absolute;
        left: -68px;
        top: -30px;
        width: 10px;
        height: 90px;
        border-radius: 1rem;
        background-color: red;
    }

    &.activated > svg {
        font-size: 2.2rem;
    }
`

const Texto = styled.span`
    margin-left: 2rem;
`