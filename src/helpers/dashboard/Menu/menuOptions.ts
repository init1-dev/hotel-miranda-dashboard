import { MdOutlineMessage } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Dashboard, Bookings, Rooms, Contact, Users } from "../../../pages/pages-module";
import Booking from "../../../components/Dashboard/Bookings/Booking";
import Room from "../../../components/Dashboard/Rooms/Room";
import Employee from "../../../components/Dashboard/Employees/Employee";
import NewEmployee from "../../../components/Dashboard/Employees/NewEmployee";
import NewRoom from "../../../components/Dashboard/Rooms/NewRoom";
import NewBooking from "../../../components/Dashboard/Bookings/NewBooking";

export const RouterMenuOptions = [
    { path: '', component: Dashboard, children: [] },
    { path: 'bookings', component: Bookings, children: [
        { path: ':id', Component: Booking },
        { path: 'edit/:id', Component: NewBooking },
        { path: 'new', Component: NewBooking },
    ] },
    { path: 'rooms', component: Rooms, children: [
        { path: ':id', Component: Room },
        { path: 'edit/:id', Component: NewRoom },
        { path: 'new', Component: NewRoom },
    ] },
    { path: 'messages', component: Contact, children: [] },
    { path: 'employees', component: Users, children: [
        { path: ':id', Component: Employee },
        { path: 'edit/:id', Component: NewEmployee },
        { path: 'new', Component: NewEmployee }
    ]}
];

export const menuOptions = [
    { to: "/dashboard", icon: LuLayoutDashboard, text: "Dashboard" },
    { to: "/dashboard/bookings", icon: FaRegCalendarAlt, text: "Bookings" },
    { to: "/dashboard/rooms", icon: IoKeyOutline, text: "Rooms" },
    { to: "/dashboard/messages", icon: MdOutlineMessage, text: "Messages" },
    { to: "/dashboard/employees", icon: IoPersonOutline, text: "Employees" }
];