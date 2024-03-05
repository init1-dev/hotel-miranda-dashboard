import { createBrowserRouter, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../helpers/AuthProvider";
import LoginPage from "../pages/LoginPage";
import loginAction from "../helpers/login/loginAction";
import loginLoader from "../helpers/login/loginLoader";
import dashboardLoader from "../helpers/dashboard/dashboardLoader";
import { DashboardPage } from "../pages/DashboardPage";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard/Dashboard";
import Bookings from "../components/Dashboard/Bookings";
import Rooms from "../components/Dashboard/Rooms";
import Contact from "../components/Dashboard/Contact";
import Users from "../components/Dashboard/Users";

export const appName = '/hotel-miranda-dashboard';

const menuOptions = [
    { path: '', component: Dashboard },
    { path: 'bookings', component: Bookings },
    { path: 'rooms', component: Rooms },
    { path: 'contact', component: Contact },
    { path: 'users', component: Users }
];

const router = createBrowserRouter([
    {
        id: "root",
        path: "/",
        loader() {
            return { user: fakeAuthProvider.username };
        },
        Component: Layout,
        children: [
            {
                index: true,
                path: "login",
                action: loginAction,
                loader: loginLoader,
                Component: LoginPage
            },
            {
                path: "dashboard",
                loader: dashboardLoader,
                Component: DashboardPage,
                children: menuOptions.map(option => ({
                    path: option.path,
                    loader: () => null,
                    Component: option.component
                }))
            }
        ]
    },
    {
        path: "/logout",
        async action() {
            await fakeAuthProvider.signout();
            
            return redirect("/login");
        }
    },
    {
        path: "/*",
        async loader() {
            if (fakeAuthProvider.isAuthenticated) {
                return redirect("/dashboard");
            } else {
                return redirect("/login");
            }
        }
    }
])

export default router;