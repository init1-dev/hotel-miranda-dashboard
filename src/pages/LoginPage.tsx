import { Form, redirect, useActionData, useLocation, useNavigate } from "react-router-dom";
import AuthStatus from "../helpers/login/AuthStatus";
import styled, { ThemeContext } from "styled-components";
import { FormEvent, useContext, useRef, useState } from "react";
import hotel from "../assets/hotel-dashboard-header2.jpeg";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../contexts/Auth/AuthContext";
import CustomSwal from "../helpers/Swal/CustomSwal";
import { SweetAlertIcon } from "sweetalert2";
import { useAppDispatch } from "../hooks/store";
import { getEmployeeAuth } from "../store/Employees/employeesThunk";

function LoginPage() {
    const auth = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";
    const theme = useContext(ThemeContext);
    const dispatch = useAppDispatch();

    const [isLogingIn, setIsLogingIn] = useState(false);
    const message = useRef('');
    const icon = useRef<SweetAlertIcon | undefined>(undefined);

    const actionData = useActionData() as { error: string } | undefined;

    const { user } = auth.state;

    if(user === null) redirect("/");

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLogingIn(true);

        const formData = new FormData(e.currentTarget);
        const employeeId = String(formData.get('employee-id')).trim();
        const password = String(formData.get('password')).trim();

        try {
            await dispatch(getEmployeeAuth(employeeId)).unwrap()
                .then((result) => {
                    console.log(result);
                    if(result?.employee_id === employeeId && result.password === password){
                        setIsLogingIn(false);
                        icon.current = 'success';
                        message.current = 'Logged in successfully';
                        auth.dispatch({type: 'login', payload: {
                            user: result.fullname, 
                            email: result.email, 
                            employeeId: result.employee_id,
                            photo: result.photo
                        }})
                        navigate("/dashboard")
                    } else {
                        setIsLogingIn(false);
                        icon.current = 'warning';
                        message.current = 'Error: Incorrect username/password';
                    }
                });
        } catch (error) {
            throw (error instanceof Error)
                ? error
                : new Error("Unknown error occurred")
        }

        const swalProps = {
            text: message.current,
            icon: icon.current ? icon.current : undefined,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }
        await CustomSwal({data: swalProps, theme: theme})
    }

    return (
        <>
            { !user &&
                <LoginContent>
                    <HeaderImage src={hotel} alt="imagen header del panel del hotel" />

                    <LoginContainer>
                        <UserIcon />

                        <LoginInfo>
                            <AuthStatus />
                        </LoginInfo>

                        <Form onSubmit={(e) => handleSubmit(e)} style={{marginTop: '2rem'}} replace>
                            <input type="hidden" name="redirectTo" value={from} />

                            <Input type="text" name="employee-id" defaultValue="3bc45dfe-8286"/>

                            <Input type="password" name="password" placeholder="12345"/>

                            <Button type="submit" disabled={isLogingIn}>
                                {isLogingIn ? "Logging in..." : "Login"}
                            </Button>

                            {actionData && actionData.error 
                                ? (
                                <p style={{ color: "red" }}>{actionData.error}</p>
                                ) : null}
                        </Form>
                    </LoginContainer>
                </LoginContent>
            }
        </>
    );
}

const LoginContent = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
`

const HeaderImage = styled.img`
    height: 100vh;
    width: 50%;
    object-fit: cover;
    object-position: bottom;
`

const LoginContainer = styled.div`
    width: 50%;
`

const UserIcon = styled(FaUserCircle)`
    font-size: 50px;
    margin-bottom: 1rem;
`

const LoginInfo = styled.div`
    padding: 0%.5rem;
    color: ${({ theme }) => theme.text};
    border-radius: 1rem;
`

const Input = styled.input`
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    width: 300px;
    padding: 0.5rem;
    border: 2px solid #188669;
    border-radius: 0.5rem;
    z-index: 1;
    display: block;
    margin: 1rem auto 2rem auto;
`

const Button = styled.button`
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    box-shadow: 1px 1px 2px black;
    width: 150px;
    border: unset;
    margin-bottom: 2rem;

    &:hover {
        filter: brightness(90%);
    }
`

export default LoginPage;