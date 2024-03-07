// text, image, date, bool, currency, array
export const bookingsHeaders = [
    {
        'header': 'Guest Name',
        'type' : 'text',
        'accessor': 'full_name'
    },
    {
        'header': 'ID',
        'type' : 'text',
        'accessor': 'id'
    },
    {
        'header': 'Order Date',
        'type' : 'date',
        'accessor': 'order_date'
    },
    {
        'header': 'Check In',
        'type' : 'date',
        'accessor': 'check_in'
    },
    {
        'header': 'Check Out',
        'type' : 'date',
        'accessor': 'check_out'
    },
    {
        'header': 'Message',
        'type' : 'text',
        'accessor': 'special_request'
    },
    {
        'header': 'Room Type',
        'type' : 'text',
        'accessor': 'type'
    },
    {
        'header': 'Status',
        'type' : 'text',
        'accessor' : 'status',
    }
];