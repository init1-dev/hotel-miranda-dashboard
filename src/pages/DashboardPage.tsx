import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SideBarComponent } from "../components/Dashboard/Menu/SideBarComponent";
import { TopbarComponent } from "../components/Dashboard/Menu/TopbarComponent";
import { useEffect, useState } from "react";

export const DashboardPage = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                navigate(-1);
            }
        };

        window.onkeyup = handleKeyDown;

        return () => {
            window.onkeyup = null;
        };
    }, [navigate]);

    return (
        <div>

            {sidebarVisible
                ? <SideBarContainer>
                    <SideBarComponent />
                </SideBarContainer>

                : <SideBarContainerMax>
                    <SideBarComponent />
                </SideBarContainerMax>
            }

            {sidebarVisible
                ? <TopBarContainer>
                    <TopbarComponent visible={sidebarVisible} toggleSidebar={toggleSidebar}/>
                </TopBarContainer>

                : <TopBarContainerMax>
                    <TopbarComponent visible={sidebarVisible} toggleSidebar={toggleSidebar}/>
                </TopBarContainerMax>
            }

            {sidebarVisible
                ? <Content>
                    <Outlet />
                </Content>

                : <ContentMax>
                    <Outlet />
                </ContentMax>
            }

        </div>
    )

}

const TopBarContainer = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 90px;
    padding: 2rem;
    padding-left: 18rem;
    box-shadow: 0px 3px 10px #00000005;
    user-select: none;
    z-index: 1;
`

const TopBarContainerMax = styled(TopBarContainer)`
    padding-left: 2rem;
`

const SideBarContainer = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    width: 16rem;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: -3px 5px 15px black;
    z-index: 2;
    user-select: none;
`

const SideBarContainerMax = styled(SideBarContainer)`
    display: none;
`

const Content = styled.div`
    width: calc(100% - 260px);
    position: absolute;
    overflow-y: auto;
    top: 100px;
    padding: 1rem 1.5rem 1rem 1.5rem;
    margin-left: 260px;
    margin-right: auto;
`

const ContentMax = styled(Content)`
    margin-left: unset;
    width: 100%;
`