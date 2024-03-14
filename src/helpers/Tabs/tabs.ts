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
        { label: "All Messages", accesor: "all"},
        { label: "Archived", accesor: "archived"}
    ],
    employees: [
        { label: "All Employees", accesor: "All Employees"},
        { label: "Active Employees", accesor: true},
        { label: "Inactive Employees", accesor: false}
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
        { label: "Offer (Higher to Lower)", accesor: "offer-high-low"},
        { label: "Offer (Lower to Higher)", accesor: "offer-low-high"},
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