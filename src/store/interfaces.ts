import { Data } from "../components/Table/Table";

export interface HotelState {
    auth: AuthState | null;
    app: AppState | null;
}

export interface AuthState {
    auth: boolean;
    user: string;
    email: string;
    id: string;
    photo: string;
    token?: string | null | undefined;
}

export interface AppState {
    bookings: BookingsState;
    employees: EmployeesState;
    messages: MessagesState;
    rooms: RoomState;
}

export interface BookingData extends Data{
    _id?: string;
    full_name: string;
    email: string;
    phone: string;
    image: string;
    check_in: string;
    check_out: string;
    special_request: string;
    discount: number;
    status: string;
    roomInfo: any;
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
    _id?: string;
    photo: string;
    fullname: string;
    employee_type: string;
    email: string;
    start_date: string;
    description: string;
    phone: string;
    status: string;
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
    _id?: string;
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    stars: number;
    read: boolean;
    archived: boolean;
    foto: string;
    createdAt: string;
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
    _id?: string;
    name: string;
    photo: string;
    room_type: string;
    room_number: number;
    description: string;
    offer: boolean;
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
    availableRooms: RoomData[];
    loading: boolean;
    status: string;
    error: string | null;
}