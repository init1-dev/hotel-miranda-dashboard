import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import AuthStatus from "../../../helpers/login/authStatus";
import { useState } from "react";
import { menuOptions } from "../../../helpers/dashboard/Menu/menuOptions";
import travl from "../../../assets/travl.png";

export const SideBarComponent = () => {
    const location = useLocation().pathname;
    const path = (location === "/dashboard")
        ? location
        : "/dashboard/" + location.split("/")[2];
    const [active, setActive] = useState(path);

    useEffect(() => {
        setActive(path);
    }, [path])
    

    return (
            <>
                <div>
                    <ImageButton to={"/dashboard"}>
                        <Imagen src={travl} alt="imagen del logotipo" />
                    </ImageButton>

                    <Lista>
                        {menuOptions.map((option, index) => (
                            <MenuOption
                                key={index}
                                to={option.to}
                                className={active === option.to ? "activated" : ""}
                                onClick={() => setActive(option.to)}
                            >
                                {React.createElement(option.icon)}
                                <Texto>{option.text}</Texto>
                            </MenuOption>
                        ))}
                    </Lista>
                </div>
                
                <AuthStatus />
            </>
    )

}

const ImageButton = styled(NavLink)`
    display: flex;
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
    justify-content: space-between;
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