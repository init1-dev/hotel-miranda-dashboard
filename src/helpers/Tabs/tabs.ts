const tabs = {
    bookings: [
        { label: "All", accesor: "All Bookings"},
        { label: "Check In", accesor: "Check In"},
        { label: "Check Out", accesor: "Check Out"},
        { label: "In Progress", accesor: "In Progress"}
    ],
    rooms: [
        { label: "All", accesor: "All Rooms"},
        { label: "Available", accesor: "Available"},
        { label: "Booked", accesor: "Booked"}
    ],
    messages: [
        { label: "All", accesor: "All Messages"},
        { label: "Archived", accesor: "Archived"},
        { label: "Unread", accesor: "Unread"}
    ],
    employees: [
        { label: "All", accesor: "All Employees"},
        { label: "Active", accesor: "Active"},
        { label: "Inactive", accesor: "Inactive"}
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
        { label: "Room Number", accesor: "room-low-high"}
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