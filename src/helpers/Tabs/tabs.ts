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

export const orderBy = {
    bookings: [
        { label: "Order Date", accesor: "order-date"},
        { label: "Guest", accesor: "guest"},
        { label: "Check In", accesor: "check-in"},
        { label: "Check Out", accesor: "check-out"}
    ],
    rooms: [
        { label: "Newest", accesor: "newest"},
        { label: "Status", accesor: "status"},
        { label: "Price", accesor: "price"},
    ],
    messages: [
        { label: "Newest", accesor: "newest"},
        { label: "Older", accesor: "older"}
    ],
    employees: [
        { label: "Newest", accesor: "newest"},
        { label: "Alphabetical", accesor: "alphabetical"}
    ],
}

export const { bookings, rooms, messages, employees } = tabs;