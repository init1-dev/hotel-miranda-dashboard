import { MdOutlineMessage } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Dashboard, Bookings, Rooms, Contact, Users } from "../../../pages/pages-module";
import Booking from "../../../components/Dashboard/Bookings/Booking";
import Room from "../../../components/Dashboard/Rooms/Room";
import Employee from "../../../components/Dashboard/Employees/Employee";
import EmployeeForm from "../../../components/Dashboard/Employees/EmployeeForm";
import RoomForm from "../../../components/Dashboard/Rooms/RoomForm";
import BookingForm from "../../../components/Dashboard/Bookings/BookingForm";

export const RouterMenuOptions = [
    { path: '', component: Dashboard, children: [] },
    { path: 'bookings', component: Bookings, children: [
        { path: ':id', Component: Booking },
        { path: 'edit/:id', Component: BookingForm },
        { path: 'new', Component: BookingForm },
    ] },
    { path: 'rooms', component: Rooms, children: [
        { path: ':id', Component: Room },
        { path: 'edit/:id', Component: RoomForm },
        { path: 'new', Component: RoomForm },
    ] },
    { path: 'messages', component: Contact, children: [] },
    { path: 'employees', component: Users, children: [
        { path: ':id', Component: Employee },
        { path: 'edit/:id', Component: EmployeeForm },
        { path: 'new', Component: EmployeeForm }
    ]}
];

export const menuOptions = [
    { to: "/dashboard", icon: LuLayoutDashboard, text: "Dashboard" },
    { to: "/dashboard/bookings", icon: FaRegCalendarAlt, text: "Bookings" },
    { to: "/dashboard/rooms", icon: IoKeyOutline, text: "Rooms" },
    { to: "/dashboard/messages", icon: MdOutlineMessage, text: "Messages" },
    { to: "/dashboard/employees", icon: IoPersonOutline, text: "Employees" }
];