import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { SideBarComponent } from "../components/Dashboard/Menu/SideBarComponent";
import { TopbarComponent } from "../components/Dashboard/Menu/TopbarComponent";
import { useState } from "react";

export const DashboardPage = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="dashboard-container">

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

const Content = styled.div`
    margin-top: 100px;
    margin-left: 20rem;
`

const ContentMax = styled(Content)`
    margin-left: 2rem;
`

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
`

const TopBarContainerMax = styled(TopBarContainer)`
    padding-left: 2rem;
`

const SideBarContainer = styled.div`
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
    user-select: none;
`

const SideBarContainerMax = styled(SideBarContainer)`
    display: none;
`