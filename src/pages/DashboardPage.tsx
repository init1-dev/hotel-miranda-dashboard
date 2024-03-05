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
            {sidebarVisible && <SideBarComponent />}

            <TopbarComponent visible={sidebarVisible} toggleSidebar={toggleSidebar}/>

            <Content>
                <Outlet />
            </Content>
        </div>
    )

}

const Content = styled.div`
    margin-top: 100px;
    margin-left: 20rem;
`