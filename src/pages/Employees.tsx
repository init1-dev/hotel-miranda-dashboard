import Table, { Data } from "../components/Table/Table";
import { Outlet, useNavigate } from "react-router-dom";
import { employees, orderBy } from "../helpers/Tabs/tabs";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { ActionButtonIcon, ButtonContainer, NewButton } from "../styled/Button";
import { MessageText, MessageTitle } from "../styled/Message";
import styled, { ThemeContext } from "styled-components";
import { format } from "date-fns";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut } from "../styled/Span";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { action } from "../helpers/action";
import { SectionSelect } from "../styled/Form";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selectEmployees } from "../store/Employees/employeesSlice";
import { deleteEmployee, getEmployeesThunk } from "../store/Employees/employeesThunk";
import { useContext, useEffect, useMemo, useState } from "react";
import { Loader, Loading } from "../styled/Loading";
import { EmployeeData } from "../store/interfaces";
import { RiDeleteBin5Line } from "react-icons/ri";
import CustomSwal from "../helpers/Swal/CustomSwal";

function Employees() {
    const navigate = useNavigate();
    const employeesSelect = orderBy.employees;
    const [currentTab, setCurrentTab] = useState<string | boolean | undefined>("All Employees");
    const [currentOrder, setCurrentOrder] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const theme = useContext(ThemeContext);

    const resetPage = () => {
        setCurrentPage(1);
    };

    const dispatch = useAppDispatch();
    const employeesData = useAppSelector(selectEmployees);
    const filteredEmployees = useMemo(() => {
        const all = (currentTab === "All Employees")
            ? employeesData.data
            : employeesData.data.filter((item) => item.status === currentTab)

        return [...all].sort((a, b) => {
            switch (currentOrder) {
                case 'alphabetical':
                    return a.fullname.localeCompare(b.fullname);
                default:
                    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
            }
        })
        
    }, [employeesData, currentTab, currentOrder])

    useEffect(() => {
        dispatch(getEmployeesThunk());
    }, [dispatch]);

    const usersHeaders = [
        {
            'label': 'Employee',
            display: (row: Data) => {
                return <Container>
                    <Imagen src={`${row.photo}`} alt="imagen del empleado" onClick={async(e) => {
                        e.stopPropagation();
                        const swalProps = {
                            title: <MessageTitle>Employee #{row.employee_id}</MessageTitle>,
                            html: (
                                <>
                                    <img src={String(row.photo)} style={{maxWidth:"50%", marginBottom:"1rem"}} alt="imagen del empleado" />
                                    <MessageText><strong>Name:</strong> {row.fullname}</MessageText>
                                    <MessageText><strong>Email:</strong> {row.email}</MessageText>
                                    <MessageText><strong>Phone:</strong> {row.phone}</MessageText>
                                    <MessageText><strong>Description:</strong> {row.description} </MessageText>
                                    <br />
                                    <MessageText><strong>Start Date:</strong> {row.start_date}</MessageText>
                                    <MessageText><strong>Status:</strong> {row.status ? "Active" : "Inactive"}</MessageText>
                                </>
                            ),
                            showConfirmButton: false
                        }
                        await CustomSwal({data: swalProps, theme: theme})
                    }}/>
                    <SpanContainer>
                        <h4>{row.fullname}</h4>
                        <small>#{row.employee_id}</small>
                    </SpanContainer>
                </Container>
            }
        },
        {
            'label': 'Joined',
            display: (row: Data) => (
                <>
                    {format( new Date(`${row.start_date}`), 'MMM do, yyyy')}
                </>
            )
        },
        {
            'label': 'Email',
            display: (row: Data) => (
                <>
                    <p>{row.email}</p>
                </>
            )
        },
        {
            'label': 'Phone',
            'value': 'phone'
        },
        {
            'label': 'Start Date',
            display: (row: Data) => format( new Date(`${row.start_date}`), 'MMM do, yyyy')
        },
        {
            'label': 'Description',
            display: (row: Data) => (
                <>
                    <h4>{row.description}</h4>
                </>
            )
        },
        {
            'label': 'Status',
            display : (row: Data) => {
                if (row.status) {
                    return <SpanStyledCheckIn>Active</SpanStyledCheckIn>
                } else {
                    return <SpanStyledCheckOut>Inactive</SpanStyledCheckOut>
                }
            }
        },
        {
            'label': 'Actions',
            display : (row: Data) => {
                const employeeRow = row as EmployeeData
                return (
                    <ButtonContainer>
                        <ActionButtonIcon onClick={(e) => {
                            e.stopPropagation()
                            navigate(`edit/${employeeRow.id}`)
                        }}>
                            <FaRegEdit />
                        </ActionButtonIcon>

                        <ActionButtonIcon onClick={async(e) => {
                            e.stopPropagation()
                            const swalProps = {
                                title: `<small>You're going to delete employee #${employeeRow.id}</small>`,
                                text: `This action is irreversible`,
                                icon: 'warning' as const,
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: 'Delete',
                                confirmButtonColor: '#ff0000',
                                cancelButtonText: 'Cancel',
                                reverseButtons: true
                            }

                            await CustomSwal({data: swalProps, theme: theme})
                            .then(async(result) => {
                                if (result.isConfirmed) {
                                    dispatch(deleteEmployee(employeeRow));
                                    const swalProps = {
                                        text: `Employee #${employeeRow.id} deleted successfully`,
                                        icon: 'success' as const,
                                        timer: 2000,
                                        timerProgressBar: true,
                                        showConfirmButton: false
                                    }
                                    await CustomSwal({data: swalProps, theme: theme})
                                }
                            });
                        }}>
                            <RiDeleteBin5Line />
                        </ActionButtonIcon>
                    </ButtonContainer>
                )
            }
        }
    ];
    
    return (
        <>
            {
                location.pathname === "/dashboard/employees"
                    ?   employeesData.loading === false
                            ?
                                <>
                                        <TabsComponent
                                            section={employees}
                                            currentTab={currentTab}
                                            setCurrentTab={setCurrentTab} 
                                            resetPage={resetPage}
                                        >
                                            <ButtonContainer>
                                                <SectionSelect 
                                                    onChange={(e) => setCurrentOrder(e.target.value)}
                                                    name="room-type" 
                                                    id="room-type" 
                                                    required>
                                                    {
                                                        employeesSelect.map((type, index) => {
                                                            return <option key={index} value={type.accesor}>{type.label}</option>
                                                        })
                                                    }
                                                </SectionSelect>
                                                <NewButton to={"/dashboard/employees/new"}>
                                                    <FaPlus />
                                                    NEW EMPLOYEE
                                                </NewButton>
                                            </ButtonContainer>
                                        </TabsComponent>
                                    <Table
                                        columns={usersHeaders}
                                        data={filteredEmployees}
                                        action={action(navigate)}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </>
                            : <Loading>
                                <Loader />
                            </Loading>
                    : <Outlet />
            
            }
        </>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Imagen = styled.img`
    max-height: 50px;
    aspect-ratio: 1/1;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    object-fit: contain;
    object-position: center;
`

export default Employees;