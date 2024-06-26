import { Button, Form, GridContainer, Input, InputDate, Label, Select, TextArea, Title } from "../../styled/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { FormEvent, useContext, useEffect, useState } from "react";
import { selecEmployee } from "../../store/Employees/employeesSlice";
import { editEmployee, getEmployee, newEmployee } from "../../store/Employees/employeesThunk";
// import { format } from "date-fns";
import { ThemeContext } from "styled-components";
import CustomSwal from "../../helpers/Swal/CustomSwal";
import BackButton from "../../components/Buttons/BackButton";
import { dateFromDBFormat } from "../../helpers/dateFromDBFormat";
import { isExistInCollection } from "../../helpers/API/isExist";
import { EmployeeForm } from "../../helpers/API/interfaces";
import { customToast } from "../../helpers/toastify/customToast";
import LoaderComponent from "../../components/Loader";
import { employeesCollection } from "../../helpers/API/apiVariables";

function EmployeeForm () {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const employeeData = useAppSelector(selecEmployee);
    const location = useLocation().pathname;
    const isEdit = location.includes("edit");
    const currentId = isEdit ? id : null;
    const [fetched, setFetched] = useState(false);
    const theme = useContext(ThemeContext);
    
    const initialFetch = async () => {
        if(currentId){
            await dispatch(getEmployee(String(id))).unwrap();
            setFetched(true);
        }
    }

    useEffect(() => {
        initialFetch()
    }, []);

    useEffect(() => {
        if(currentId && employeeData.itemData) {
            const dateFormat = dateFromDBFormat(employeeData.itemData.start_date);
            setFormData({
                ...employeeData.itemData,
                _id: employeeData.itemData._id ?? "",
                password: "",
                start_date: String(dateFormat)
            });
        }
    }, [employeeData.itemData, currentId]);

    const initialUser = {
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

    const [formData, setFormData] = useState(initialUser);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as EmployeeForm;
        
        try {
            const isEmployeeExist = await isExistInCollection("User", employeesCollection, form.email.value, currentId);
            
            if(isEmployeeExist){
                customToast('error', 'User already exist');
                throw new Error("User already exist");
            }

            const formDataToUpdate = {
                ...formData,
                fullname:form.fullname.value,
                email:form.email.value,
                phone:form.phone.value,
                employee_type:form.employee_type.value,
                password:form.password.value,
                description:form.description.value,
                start_date:form.start_date.value,
                status:form.status.value,
                photo:form.photo.value
            };

            if(currentId){
                dispatch(editEmployee({
                    id: String(currentId),
                    newData: {
                        ...formDataToUpdate,
                        start_date: String(new Date(formDataToUpdate.start_date))
                    }
                }))
            } else {
                dispatch(newEmployee(formDataToUpdate))
            }
            
            const swalProps = {
                text: currentId
                        ? `Employee #${id} successfully edited`
                        : `Employee #${formDataToUpdate._id} successfully created`,
                icon: 'success' as const,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }

            navigate("/dashboard/employees");

            await CustomSwal({data: swalProps, theme: theme})
            
        } catch (error) {
            throw new Error(`${error}`);
        }
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

                        <Label htmlFor="password">
                            {
                                formData.password === "" 
                                    ? "New password:"
                                    : "Password:"
                            }
                        </Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder={
                                formData.password === ""
                                    ? "Insert your new password"
                                    : "Insert employee password"
                            } 
                            defaultValue={formData.password} 
                            required={
                                formData.password === ""
                                    ? false
                                    : true
                            }
                        />
                    </GridContainer>

                    <GridContainer>
                        <Label htmlFor="photo">Load Photo:</Label>
                        <Input type="text" name="photo" id="photo" defaultValue={formData.photo} placeholder="Insert employee photo"/>

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
        : <LoaderComponent />
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

export default EmployeeForm ;