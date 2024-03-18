import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import Layout from "../components/Layout";
import { RouterMenuOptions } from "../helpers/dashboard/Menu/menuOptions";

export const appName = '/hotel-miranda-dashboard';

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                path: "login",
                Component: LoginPage
            },
            {
                path: "dashboard",
                Component: DashboardPage,
                children: RouterMenuOptions.map(option => ({
                    path: option.path,
                    Component: option.component,
                    children: option.children
                }))
            },
            {
                path: "*",
                async loader() {
                    return redirect("/dashboard");
                }
            }
        ]
    }
])

export default router;