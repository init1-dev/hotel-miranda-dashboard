const tabs = {
    bookings: [
        { label: "All Bookings"},
        { label: "Check In"},
        { label: "Check Out"},
        { label: "In Progress"}
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
        { label: "Order Date", accesor: "order_date"},
        { label: "Guest", accesor: "full_name"},
        { label: "Check In", accesor: "check_in"},
        { label: "Check Out", accesor: "check_out"}
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