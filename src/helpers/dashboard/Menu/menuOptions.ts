import { MdOutlineMessage } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Dashboard, Bookings, Rooms, Contact, Users } from "../../../pages/pages-module";

export const RouterMenuOptions = [
    { path: '', component: Dashboard },
    { path: 'bookings', component: Bookings },
    { path: 'rooms', component: Rooms },
    { path: 'messages', component: Contact },
    { path: 'employees', component: Users }
];

export const menuOptions = [
    { to: "/dashboard", icon: LuLayoutDashboard, text: "Dashboard" },
    { to: "/dashboard/bookings", icon: FaRegCalendarAlt, text: "Bookings" },
    { to: "/dashboard/rooms", icon: IoKeyOutline, text: "Rooms" },
    { to: "/dashboard/messages", icon: MdOutlineMessage, text: "Messages" },
    { to: "/dashboard/employees", icon: IoPersonOutline, text: "Employees" }
];