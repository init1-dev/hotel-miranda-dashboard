import { NavLink } from "react-router-dom"
import styled from "styled-components"
import AuthStatus from "../../../helpers/login/authStatus";
import { MdOutlineMessage } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";

export const SideBarComponent = () => {
    const [active, setActive] = useState('/dashboard');

    return (
            <SideBar>
                <Imagen src="/assets/travl.png" alt="imagen del logotipo" />

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
    )

}

const SideBar = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 16rem;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: -3px 5px 15px black;
    z-index: 1;
`

const Imagen = styled.img`
    width: 85%;
    padding: 1rem;
    margin: 0 auto 2rem auto;
`

const Lista = styled.div`
    padding: 0 2rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
    margin-left: 1rem;
`

const MenuOption = styled(NavLink)`
    display: inline-flex;
    align-items: center;
    position: relative;
    color: ${({ theme }) => theme.menuText};
    font-size: 1.2rem;
    text-decoration: none;
    cursor: pointer;
    margin: 1rem 0;
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
        left: -52px;
        top: -12px;
        width: 8px;
        height: 50px;
        border-radius: 1rem;
        background-color: red;
    }

    &.activated > svg {
        font-size: 1.5rem;
    }
`

const Texto = styled.span`
    margin-left: 1.5rem;
`