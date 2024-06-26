import Table, { Data } from "../../components/Table/Table";
import { Outlet, useNavigate } from "react-router-dom";
import { employees, orderBy } from "../../helpers/Tabs/tabs";
import { TabsComponent } from "../../components/Dashboard/Tabs/TabsComponent";
import { ActionButtonIcon, ButtonContainer, NewButton } from "../../styled/Button";
import { MessageText, MessageTitle } from "../../styled/Message";
import { ThemeContext } from "styled-components";
import { format } from "date-fns";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut } from "../../styled/Span";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { action } from "../../helpers/action";
import { SectionSelect } from "../../styled/Form";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selectEmployees } from "../../store/Employees/employeesSlice";
import { deleteEmployee, getEmployeesThunk } from "../../store/Employees/employeesThunk";
import { useContext, useEffect, useMemo, useState } from "react";
import { EmployeeData } from "../../store/interfaces";
import CustomSwal from "../../helpers/Swal/CustomSwal";
import { Container, EmployeeDataModal } from "../../styled/ImagePreviewInTable";
import LoaderComponent from "../../components/Loader";
import DeleteButton from "../../components/Buttons/DeleteButton";
import SearchComponent from "../../components/SearchComponent";
import { useDebounce } from "@uidotdev/usehooks";

function Employees() {
    const navigate = useNavigate();
    const employeesSelect = orderBy.employees;
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | boolean | undefined>("All Employees");
    const [currentOrder, setCurrentOrder] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const theme = useContext(ThemeContext);
    const debouncedquery = useDebounce(query, 300);

    const resetPage = () => {
        setCurrentPage(1);
    };

    const dispatch = useAppDispatch();
    const employeesData = useAppSelector(selectEmployees);
    const filteredEmployees = useMemo(() => {
        if(currentPage !== 1) resetPage();
        
        const search = employeesData.data.filter((employee) => employee.fullname.toLowerCase().includes(debouncedquery.toLowerCase()));
        const all = (currentTab === "All Employees")
            ? search
            : search.filter((item) => item.status === currentTab)

        return [...all].sort((a, b) => {
            switch (currentOrder) {
                case 'alphabetical':
                    return a.fullname.localeCompare(b.fullname);
                default:
                    return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
            }
        })
        
    }, [employeesData, currentTab, currentOrder, debouncedquery])

    const initialFetch = async () => {
        await dispatch(getEmployeesThunk()).unwrap();
        setIsLoading(false);
    }

    useEffect(() => {
        initialFetch()
    }, []);

    const usersHeaders = [
        {
            'label': 'Employee',
            display: (row: Data) => {
                return <Container>
                    <EmployeeDataModal src={`${row.photo}`} alt="imagen del empleado" onClick={async(e) => {
                        e.stopPropagation();
                        const swalProps = {
                            title: <MessageTitle>Employee #{row._id}</MessageTitle>,
                            html: (
                                <>
                                    <img src={String(row.photo)} style={{maxWidth:"50%", marginBottom:"1rem"}} alt="imagen del empleado" />
                                    <MessageText><strong>Name:</strong> {row.fullname}</MessageText>
                                    <MessageText><strong>Email:</strong> {row.email}</MessageText>
                                    <MessageText><strong>Phone:</strong> {row.phone}</MessageText>
                                    <MessageText><strong>Employee Type:</strong> {row.employee_type} </MessageText>
                                    <MessageText><strong>Description:</strong> {row.description} </MessageText>
                                    <br />
                                    <MessageText><strong>Start Date:</strong> {
                                        format( new Date(`${row.start_date}`), 'MMM do, yyyy')
                                    }</MessageText>
                                    <MessageText><strong>Status:</strong> {row.status ? "Active" : "Inactive"}</MessageText>
                                </>
                            ),
                            showConfirmButton: false
                        }
                        await CustomSwal({data: swalProps, theme: theme})
                    }}/>
                    <SpanContainer>
                        <h4>{row.fullname}</h4>
                        <small>#{row._id}</small>
                    </SpanContainer>
                </Container>
            }
        },
        {
            'label': 'Joined',
            display: (row: Data) => (
                format( new Date(`${row.start_date}`), 'MMM do, yyyy')
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
            'label': 'Employee Type',
            display: (row: Data) => (
                <>
                    <h4>{row.employee_type}</h4>
                </>
            )
        },
        {
            'label': 'Status',
            display : (row: Data) => {
                if (row.status === 'Active') {
                    return <SpanStyledCheckIn>Active</SpanStyledCheckIn>
                } else {
                    return <SpanStyledCheckOut>Inactive</SpanStyledCheckOut>
                }
            }
        },
        {
            'label': 'Actions',
            display : (row: Data) => {
                const employeeRow = row as EmployeeData;
                return (
                    <ButtonContainer>
                        <ActionButtonIcon onClick={(e) => {
                            e.stopPropagation()
                            navigate(`edit/${employeeRow._id}`)
                        }}>
                            <FaRegEdit />
                        </ActionButtonIcon>

                        <DeleteButton 
                            type='Employee' 
                            action={deleteEmployee} 
                            id={employeeRow._id!}
                        />
                    </ButtonContainer>
                )
            }
        }
    ];

    if(isLoading) {
        return <LoaderComponent />
    }
    
    return (
        <>
            {
                location.pathname === "/dashboard/employees"
                    ?   <>
                            <TabsComponent
                                section={employees}
                                currentTab={currentTab}
                                setCurrentTab={setCurrentTab} 
                                resetPage={resetPage}
                            >
                                <ButtonContainer>
                                    <SearchComponent 
                                        query={query}
                                        setQuery={setQuery}
                                    />

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
                    : <Outlet />
            }
        </>
    );
}

export default Employees;