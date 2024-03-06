import { MdOutlineMessage } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Dashboard, Bookings, Rooms, Contact, Users } from "../../../pages/pages-module";

const icons = {
    LuLayoutDashboard: LuLayoutDashboard,
    FaRegCalendarAlt: FaRegCalendarAlt,
    IoKeyOutline: IoKeyOutline,
    MdOutlineMessage: MdOutlineMessage,
    IoPersonOutline: IoPersonOutline
};

export const RouterMenuOptions = [
    { path: '', component: Dashboard },
    { path: 'bookings', component: Bookings },
    { path: 'rooms', component: Rooms },
    { path: 'contact', component: Contact },
    { path: 'employees', component: Users }
];

export const menuOptions = [
    { to: "/dashboard", icon: icons["LuLayoutDashboard"], text: "Dashboard" },
    { to: "/dashboard/bookings", icon: icons["FaRegCalendarAlt"], text: "Bookings" },
    { to: "/dashboard/rooms", icon: icons["IoKeyOutline"], text: "Rooms" },
    { to: "/dashboard/contact", icon: icons["MdOutlineMessage"], text: "Contact" },
    { to: "/dashboard/employees", icon: icons["IoPersonOutline"], text: "Employees" }
];