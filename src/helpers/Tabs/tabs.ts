const tabs = {
    bookings: [
        { label: "All Bookings", accesor: "All Bookings"},
        { label: "Check In", accesor: "Check In"},
        { label: "Check Out", accesor: "Check Out"},
        { label: "In Progress", accesor: "In Progress"}
    ],
    rooms: [
        { label: "All Rooms", accesor: "All Rooms"},
        { label: "Available", accesor: "Available"},
        { label: "Booked", accesor: "Booked"}
    ],
    messages: [
        { label: "All Messages", accesor: "All Messages"},
        { label: "Archived", accesor: true}
    ],
    employees: [
        { label: "All Employees", accesor: "All Employees"},
        { label: "Active Employees", accesor: "Active"},
        { label: "Inactive Employees", accesor: "Inactive"}
    ],
}

export const orderBy = {
    bookings: [
        { label: "Order Date", accesor: "order_date"},
        { label: "Guest", accesor: "full_name"},
        { label: "Check In", accesor: "check_in"},
        { label: "Check Out", accesor: "check_out"}
    ],
    rooms: [
        { label: "Price (Higher to Lower)", accesor: "price-high-low"},
        { label: "Price (Lower to Higher)", accesor: "price-low-high"},
        { label: "Room Number (Higher to Lower)", accesor: "room-low-high"}
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