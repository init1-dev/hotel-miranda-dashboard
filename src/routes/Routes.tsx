import { createBrowserRouter, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../helpers/AuthProvider";
import LoginPage from "../pages/LoginPage";
import loginAction from "../helpers/login/loginAction";
import loginLoader from "../helpers/login/loginLoader";
import dashboardLoader from "../helpers/dashboard/dashboardLoader";
import { DashboardPage } from "../pages/DashboardPage";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Rooms from "../pages/Rooms";
import Contact from "../pages/Contact";
import Users from "../pages/Users";

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
            return { user: fakeAuthProvider.username, email: fakeAuthProvider.email };
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