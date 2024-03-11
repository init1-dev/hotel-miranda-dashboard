import Table, { Data } from "../components/Table/Table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { employees, orderBy } from "../helpers/Tabs/tabs";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { ButtonContainer, NewButton } from "../styled/Button";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { MessageText, MessageTitle } from "../styled/Message";
import styled from "styled-components";
import { format } from "date-fns";
import { SpanContainer, SpanStyledCheckIn, SpanStyledCheckOut } from "../styled/Span";
import { FaPlus } from "react-icons/fa";
import { action } from "../helpers/action";
import { SectionSelect } from "../styled/Form";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selectEmployees } from "../store/Employees/employeesSlice";
import { getEmployeesThunk } from "../store/Employees/employeesThunk";
import { useEffect } from "react";
import { Loader, Loading } from "../styled/Loading";

const MySwal = withReactContent(Swal)

function Employees() {
    const location=useLocation().pathname;
    const navigate = useNavigate();
    const employeesSelect = orderBy.employees;

    const dispatch = useAppDispatch();
    const employeesData = useAppSelector(selectEmployees);

    useEffect(() => {
        dispatch(getEmployeesThunk());
    }, [dispatch]);
    
    return (
        <>
            {
                location === "/dashboard/employees"
                    ?   employeesData.loading === false
                            ?
                                <>
                                        <TabsComponent section={employees}>
                                            <ButtonContainer>
                                                <SectionSelect name="room-type" id="room-type" required>
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
                                    <Table columns={usersTable} data={employeesData.data} action={action(navigate)} />
                                </>
                            : <Loading>
                                <Loader />
                            </Loading>
                    : <Outlet />
            
            }
        </>
    );
}

const usersTable = [
    {
        'label': 'Employee',
        display: (row: Data) => {
            return <Container>
                <Imagen src={`${row.photo}`} alt="imagen de la habitacion" onClick={(e) => {
                    e.stopPropagation();
                    return (
                        MySwal.fire({
                            title: <MessageTitle>Employee #{row.employee_id}</MessageTitle>,
                            html: (
                                <>
                                    <img src={String(row.photo)} alt="imagen de la habitacion" />
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
                        })
                    )
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
        'value': 'start_date'
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
    }
];

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Imagen = styled.img`
    max-height: auto;
    width: 70px;
    aspect-ratio: 16/9;
    object-fit: contain;
    object-position: center;
`

export default Employees;