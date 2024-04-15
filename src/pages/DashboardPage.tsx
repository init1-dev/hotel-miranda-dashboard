import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { SideBarComponent } from "../components/Dashboard/Menu/SideBarComponent";
import { TopbarComponent } from "../components/Dashboard/Menu/TopbarComponent";
import { useState } from "react";

export const DashboardPage = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    // const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         if (event.key === "Escape" && location.pathname !== "/dashboard") {
    //             navigate(-1);
    //         }
    //     };

    //     window.onkeyup = handleKeyDown;

    //     return () => {
    //         window.onkeyup = null;
    //     };
    // }, [navigate]);

    return (
        <div>

            <SideBarContainer $sidebarVisible={sidebarVisible}>
                <SideBarComponent />
            </SideBarContainer>

            <TopBarContainer $sidebarVisible={sidebarVisible}>
                <TopbarComponent visible={sidebarVisible} toggleSidebar={toggleSidebar}/>
            </TopBarContainer>

            <Content $sidebarVisible = {sidebarVisible}>
                <Outlet />
            </Content>

        </div>
    )

}

const TopBarContainer = styled.div<{ $sidebarVisible?: boolean }>`
    width: 100%;
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    height: 90px;
    padding: 2rem;
    padding-left: ${props => props.$sidebarVisible ? `18rem` : `2rem`};
    box-shadow: 0px 3px 10px #00000005;
    user-select: none;
    z-index: 1;
    transition: padding-left 0.2s ease-in-out;
`

const SideBarContainer = styled.div<{$sidebarVisible?: boolean}>`
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    width: 16rem;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: -5px 5px 10px black;
    z-index: 2;
    user-select: none;
    transition: transform 0.2s ease-in-out;

    transform: ${props => props.$sidebarVisible ? "none" : "translateX(-100%)"};
`

const Content = styled.div<{ $sidebarVisible?: boolean }>`
    width: ${props => props.$sidebarVisible ? `calc(100% - 260px)` : `100%`};
    height: calc(100% - 90px);
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    top: 90px;
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    left: ${props => props.$sidebarVisible ? `260px` : `0`};
    right: 0;
    transition: width 0.2s ease-in-out, left 0.2s ease-in-out;

    &::-webkit-scrollbar {
        width: 3px;
    }

    &::-webkit-scrollbar-track {
        background: none;
    }

    &::-webkit-scrollbar-thumb {
        background: grey;
        border-radius: 6px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`