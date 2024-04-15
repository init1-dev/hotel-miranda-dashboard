import { Button, Form, GridContainer, Input, InputDate, Label, Select, TextArea, Title } from "../../../styled/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { selecEmployee } from "../../../store/Employees/employeesSlice";
import { editEmployee, getEmployee, newEmployee } from "../../../store/Employees/employeesThunk";
import { Loader, Loading } from "../../../styled/Loading";
// import { format } from "date-fns";
import { ThemeContext } from "styled-components";
import CustomSwal from "../../../helpers/Swal/CustomSwal";
import BackButton from "../../Buttons/BackButton";
import { dateFromDBFormat } from "../../../helpers/dateFromDBFormat";

function NewEmployee () {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const employeeData = useAppSelector(selecEmployee);
    const location = useLocation().pathname;
    const isEdit = location.includes("edit");
    const currentId = isEdit ? id : null;
    const [fetched, setFetched] = useState(false);
    const theme = useContext(ThemeContext);
    
    const initialFetch = useCallback(async () => {
        if(currentId){
            await dispatch(getEmployee(String(id))).unwrap();
            setFetched(true);
        }
    }, [id, currentId, dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);

    useEffect(() => {
        if(currentId && employeeData.itemData) {
            const dateFormat = dateFromDBFormat(employeeData.itemData.start_date);
            setFormData({
                ...employeeData.itemData,
                _id: employeeData.itemData._id ?? "",
                start_date: String(dateFormat)
            });
        }
    }, [employeeData.itemData, currentId]);

    const init = {
        _id: "",
        photo: "https://avatars.githubusercontent.com/u/79700122?v=4",
        fullname: "init.dev",
        email: "init1.dev@gmail.com",
        start_date: String(new Date("7/12/2024 02:55").toISOString().slice(0, 16)),
        employee_type: "CEO",
        description: "lorem ipsum bla bla bla bla bla bla bla",
        phone: "659528522",
        status: "Active",
        password: "12345"
    };
    
    // const initialForm = {
    //     _id: "",
    //     photo: "https://robohash.org/seddelenitivoluptatem.png?size=50x50&set=set1",
    //     fullname: "",
    //     email: "",
    //     employee_type: "Select one",
    //     start_date: "",
    //     description: "",
    //     phone: "",
    //     status: "Select one",
    //     password: ""
    // }

    const [formData, setFormData] = useState(init);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/dashboard/employees");

        const formDataToUpdate = {
            ...formData,
            fullname: e.currentTarget.fullname.value,
            email: e.currentTarget.email.value,
            phone: e.currentTarget.phone.value,
            employee_type: e.currentTarget.employee_type.value,
            password: e.currentTarget.password.value,
            description: e.currentTarget.description.value,
            start_date: e.currentTarget.start_date.value,
            status: e.currentTarget.status.value
        };
        
        (currentId)
            ? dispatch(editEmployee({
                id: String(currentId),
                newData: {
                    ...formDataToUpdate,
                    start_date: String(new Date(formDataToUpdate.start_date))
                }
            }))
            : dispatch(newEmployee(formDataToUpdate))
        
        const swalProps = {
            text: currentId
                    ? `Employee #${id} successfully edited`
                    : `Employee #${formDataToUpdate._id} successfully created`,
            icon: 'success' as const,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }

        await CustomSwal({data: swalProps, theme: theme})
    }

    return (
        (!currentId || currentId && fetched)
            ? <>
                {currentId
                    ? <Title>
                        <span>
                            EDITING <small>#{currentId}</small>
                        </span>
                        <BackButton />
                    </Title>
                    : <Title>
                        <span>
                            NEW EMPLOYEE
                        </span>
                        <BackButton />
                    </Title>}

                <Form id="new-employee" name="new-employee" onSubmit={(e)=> handleSubmit(e)}>
                    <GridContainer>

                        <Label htmlFor="fullname">Fullname:</Label>
                        <Input type="text" name="fullname" id="fullname" placeholder="Insert employee name" defaultValue={formData.fullname} required/>

                        <Label htmlFor="email">Email:</Label>
                        <Input type="email" name="email" id="email" placeholder="Insert employee email" defaultValue={formData.email} required/>

                        <Label htmlFor="phone">Phone:</Label>
                        <Input type="tel" name="phone" id="phone" placeholder="Insert employee phone" defaultValue={formData.phone} required/>

                        <Label htmlFor="start_date">Start Date:</Label>
                        <InputDate type="datetime-local" name="start_date" id="start_date" defaultValue={formData.start_date} required/>

                        <Label htmlFor="password">Password:</Label>
                        <Input type="password" name="password" id="password" placeholder="Insert employee password" defaultValue={formData.password} required/>
                    </GridContainer>

                    <GridContainer>
                        <Label htmlFor="photo">Load Photo:</Label>
                        <Input type="file" name="photo" id="photo"/>

                        <Label htmlFor="employee_type">Employee Type:</Label>
                        <Select name="employee_type" id="employee_type" required>
                            <option defaultValue={formData.employee_type} hidden>{formData.employee_type}</option>
                            {
                                EmployeeTypes.map((type, index) => {
                                    return <option key={index} defaultValue={type.value}>{type.label}</option>
                                })
                            }
                        </Select>

                        <Label htmlFor="description">Description:</Label>
                        <TextArea name="description" id="description" cols={30} rows={10} placeholder="Insert employee description" defaultValue={formData.description} required>
                        </TextArea>

                        <Label htmlFor="status">Status:</Label>
                        <Select name="status" id="status" required>
                            <option defaultValue={formData.status} hidden>{formData.status}</option>
                            {
                                EmployeeStatus.map((type, index) => {
                                    return <option key={index} defaultValue={type}>{type}</option>
                                })
                            }
                        </Select>

                        <Button type="submit" form="new-employee">
                            Submit
                        </Button>
                    </GridContainer>
                </Form>
            </>
        : <Loading>
            <Loader />
        </Loading>
    );
}

const EmployeeTypes = [
    {
        label: "CEO",
        value: "CEO"
    },
    {
        label: "Maintenance",
        value: "maintenance"
    },
    {
        label: "Receptionist",
        value: "receptionist"
    },
    {
        label: "Kitchen",
        value: "kitchen"
    },
    {
        label: "Rooms",
        value: "rooms"
    },
    {
        label: "Support",
        value: "support"
    },
    {
        label: "Sales",
        value: "sales"
    },
    {
        label: "Marketing",
        value: "marketing"
    },
];

const EmployeeStatus = [ "Active", "Inactive" ];

export default NewEmployee ;