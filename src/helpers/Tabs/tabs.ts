const tabs = {
    bookings: [
        { label: "All Bookings"},
        { label: "Check In"},
        { label: "Check Out"},
        { label: "In Progress"}
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
        { label: "All Employee", accesor: "all"},
        { label: "Active Employee", accesor: "status"},
        { label: "Inactive Employee", accesor: "status"}
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
        { label: "Price", accesor: "price"},
        { label: "Offer", accesor: "offer"},
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