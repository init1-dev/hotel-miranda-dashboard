import { Data } from "../components/Table/Table";

export interface BookingData extends Data{
    id: number;
    full_name: string;
    email: string;
    phone: string;
    image: string;
    order_date: string;
    check_in: string;
    check_out: string;
    special_request: string;
    number: number;
    price: number;
    type: string;
    status: string;
    amenities: string[];
    room_status: string;
    foto: string;
    description: string;
}
export interface Booking {
    itemData: BookingData | undefined;
    status: string;
    error: string | null;
}
export interface BookingsState {
    data: BookingData[];
    item: Booking;
    loading: boolean;
    status: string;
    error: string | null;
}

export interface EmployeeData extends Data{
    id: number;
    photo: string;
    name: string;
    lastname: string;
    fullname: string;
    employee_id: string;
    email: string;
    start_date: string;
    description: string;
    phone: string;
    status: boolean;
    password: string;
}
export interface Employee {
    itemData: EmployeeData | undefined;
    status: string;
    error: string | null;
}
export interface EmployeesState {
    data: EmployeeData[];
    item: Employee;
    loading: boolean;
    status: string;
    error: string | null;
}

export interface MessageData extends Data{
    id: number;
    message_id: string;
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    stars: number;
    date: string;
    read: boolean;
    archived: boolean;
    foto: string;
    time_passed: string;
}
export interface Message {
    itemData: MessageData | undefined;
    status: string;
    error: string | null;
}
export interface MessagesState {
    data: MessageData[];
    item: Message;
    loading: boolean;
    status: string;
    error: string | null;
}

export interface RoomData extends Data{
    id: number;
    name: string;
    photo: string;
    room_type: string;
    room_number: number;
    description: string;
    offer: number;
    price: number;
    cancellation: string;
    amenities: string[];
    discount: number;
    status: string;
}
export interface Room {
    itemData: RoomData | undefined;
    status: string;
    error: string | null;
}
export interface RoomState {
    data: RoomData[];
    item: Room;
    loading: boolean;
    status: string;
    error: string | null;
}