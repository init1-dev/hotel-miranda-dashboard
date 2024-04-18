export interface RoomForm extends EventTarget {
    room_type: HTMLFormElement,
    room_number: HTMLFormElement,
    description: HTMLFormElement,
    cancellation: HTMLFormElement,
    offer: HTMLFormElement,
    price: HTMLFormElement,
    discount: HTMLFormElement,
    amenities: HTMLFormElement
}

export interface EmployeeForm extends EventTarget {
    fullname: HTMLFormElement,
    email: HTMLFormElement,
    phone: HTMLFormElement,
    employee_type: HTMLFormElement,
    password: HTMLFormElement,
    description: HTMLFormElement,
    start_date: HTMLFormElement,
    status: HTMLFormElement
}

export interface BookingForm extends EventTarget {
    full_name: HTMLFormElement,
    email: HTMLFormElement,
    phone: HTMLFormElement,
    special_request: HTMLFormElement,
    discount: HTMLFormElement,
    check_in: HTMLFormElement,
    check_out: HTMLFormElement,
    room_number: HTMLFormElement
}