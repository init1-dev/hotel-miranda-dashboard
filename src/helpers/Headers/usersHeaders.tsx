export const usersTable = [
    {
        'header': 'Image',
        'type' : 'image',
        'accessor': 'photo'
    },
    {
        'header': 'Full Name',
        'type' : 'text',
        'accessor': 'fullname'
    },
    {
        'header': 'ID',
        'type' : 'text',
        'accessor': 'employee_id'
    },
    {
        'header': 'Email',
        'type' : 'text',
        'accessor': 'email'
    },
    {
        'header': 'Start Date',
        'type' : 'date',
        'accessor': 'start_date'
    },
    {
        'header': 'Description',
        'type' : 'text',
        'accessor': 'description'
    },
    {
        'header': 'Phone',
        'type' : 'text',
        'accessor': 'phone'
    },
    {
        'header': 'Status',
        'type' : 'bool',
        'accessor' : 'status',
        'status' : ["Active", "Inactive"]
    }
];