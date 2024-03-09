const tabs = {
    bookings: [
        { label: "All Bookings", accesor: "all"},
        { label: "Checking In", accesor: "check_in"},
        { label: "Checking Out", accesor: "check_out"},
        { label: "In Progress", accesor: "status"}
    ],
    rooms: [
        { label: "All Rooms", accesor: "all"},
        { label: "Available Rooms", accesor: "status"},
        { label: "Unavailable Rooms", accesor: "status"}
    ],
    messages: [
        { label: "All Messages", accesor: "all"},
        { label: "Archived", accesor: "archived"}
    ],
    employees: [
        { label: "All Employee", accesor: "all"},
        { label: "Active Employee", accesor: "status"},
        { label: "Inactive Employee", accesor: "status"}
    ],
}

export const OrderBy = {
    bookings: ["Guest", "Order Date", "Check In", "Check Out"],
    rooms: ["", "", ""],
    messages: ["", "", "", ""],
    employees: ["", "", "", ""]
}

export const { bookings, rooms, messages, employees } = tabs;