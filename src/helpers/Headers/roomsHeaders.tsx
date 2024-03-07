export const roomsHeaders = [
    {
        'header': 'Image',
        'type' : 'image',
        'accessor': 'photo'
    },
    {
        'header': 'Room Type',
        'type' : 'text',
        'accessor': 'room_type'
    },
    {
        'header': 'Number',
        'type' : 'text',
        'accessor': 'room_number'
    },
    {
        'header': 'Description',
        'type' : 'text',
        'accessor': 'description'
    },
    {
        'header': 'Offer',
        'type' : 'currency',
        'accessor': 'offer'
    },
    {
        'header': 'Price',
        'type' : 'currency',
        'accessor': 'price'
    },
    {
        'header': 'Amenities',
        'type' : 'array',
        'accessor' : 'amenities',
    },
    {
        'header': 'Discount',
        'type' : 'text',
        'accessor' : 'discount',
    },
    {
        'header': 'status',
        'type' : 'bool',
        'accessor' : 'status',
        'status' : ["Available", "Booked"]
    },
];