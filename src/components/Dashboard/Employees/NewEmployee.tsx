import { Button, Form, GridContainer, Input, Label, Select, Title } from "../../../styled/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { selecEmployee } from "../../../store/Employees/employeesSlice";
import { editEmployee, getEmployee, newEmployee } from "../../../store/Employees/employeesThunk";
import { Loader, Loading } from "../../../styled/Loading";
import { format } from "date-fns";
import { ThemeContext } from "styled-components";
import CustomSwal from "../../../helpers/Swal/CustomSwal";
import BackButton from "../../Buttons/BackButton";

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
            await dispatch(getEmployee(Number(id))).unwrap();
            setFetched(true);
        }
    }, [id, currentId, dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);

    useEffect(() => {
        if(currentId) {
            (employeeData.itemData) && setFormData(
                {...employeeData.itemData,
                    start_date: format(employeeData.itemData.start_date, 'yyyy-MM-dd')
                });
        }
    }, [employeeData.itemData, currentId]);

    const [formData, setFormData] = useState({
        id: 50,
        photo: "https://robohash.org/seddelenitivoluptatem.png?size=50x50&set=set1",
        name: "Martin",
        lastname: "McFly",
        fullname: "Martin McFly",
        employee_id: "3bc45dfe-8234",
        email: "marty@email.com",
        start_date: format("7/12/2024", 'yyyy-MM-dd'),
        description: "Marketing",
        phone: "678234512",
        status: false,
        password: "martin_mc12345"
    });

    const defaultStatus = formData.status ? "Active" : "Inactive";

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/dashboard/employees");

        const formDataToUpdate = {
            ...formData,
            fullname: e.currentTarget.fullname.value,
            email: e.currentTarget.email.value,
            phone: e.currentTarget.phone.value,
            password: e.currentTarget.password.value,
            description: e.currentTarget.description.value,
            start_date: e.currentTarget.start_date.value,
            status: e.currentTarget.status.value === "Active" ? true : false
        };
        
        (currentId)
            ? dispatch(editEmployee({
                id: Number(currentId),
                newData: {
                    ...formDataToUpdate,
                    start_date: format(formDataToUpdate.start_date, 'yyyy-MM-dd')
                }
            }))
            : dispatch(newEmployee(formDataToUpdate))
        
        const swalProps = {
            text: currentId
                    ? `Employee #${id} successfully edited`
                    : `Employee #${formDataToUpdate.id} successfully created`,
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

                        {/* <Label htmlFor="description">Description:</Label>
                        <TextArea name="description" id="description" cols={30} rows={10} placeholder="Insert employee description" required>
                        </TextArea> */}

                        <Label htmlFor="password">Password:</Label>
                        <Input type="password" name="password" id="password" placeholder="Insert employee password" defaultValue={formData.password} required/>
                    </GridContainer>

                    <GridContainer>
                        <Label htmlFor="photo">Load Photo:</Label>
                        <Input type="file" name="photo" id="photo"/>

                        <Label htmlFor="description">Employee Type:</Label>
                        <Select name="description" id="description" required>
                            <option defaultValue={formData.description} hidden>{formData.description}</option>
                            {
                                EmployeeTypes.map((type, index) => {
                                    return <option key={index} defaultValue={type.value}>{type.label}</option>
                                })
                            }
                        </Select>

                        <Label htmlFor="start_date">Start Date:</Label>
                        <Input type="date" name="start_date" id="start_date" defaultValue={formData.start_date} required/>

                        <Label htmlFor="status">Status:</Label>
                        <Select name="status" id="status" required>
                            <option defaultValue={defaultStatus} hidden>{defaultStatus}</option>
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