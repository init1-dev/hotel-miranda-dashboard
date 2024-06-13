import { Form, redirect, useActionData, useLocation, useNavigate } from "react-router-dom";
import AuthStatus from "../helpers/login/authStatus";
import styled, { ThemeContext } from "styled-components";
import { FormEvent, useContext, useRef, useState } from "react";
import hotel from "../assets/hotel-dashboard-header2.jpeg";
import { FaUserCircle } from "react-icons/fa";
import UserContext from "../contexts/Auth/UserContext";
import CustomSwal from "../helpers/Swal/CustomSwal";
import { SweetAlertIcon } from "sweetalert2";
import { customToast } from "../helpers/toastify/customToast";
import { fetchFromApi } from "../helpers/API/fetchFromApi";
import { apiLoginPath } from "../helpers/API/apiVariables";

function LoginPage() {
    const auth = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";
    const theme = useContext(ThemeContext);

    const [isLogingIn, setIsLogingIn] = useState(false);
    const message = useRef('');
    const icon = useRef<SweetAlertIcon | undefined>(undefined);

    const actionData = useActionData() as { error: string } | undefined;

    const { user } = auth.state;

    if(user === null) redirect("/");

    const userLogin  = async (employee_id: string, password: string) => {
        try {
            const data = await fetchFromApi("LOGIN", `${apiLoginPath}`, {
                username: employee_id || "",
                password: password || ""
            });
            
            return data?.data;
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    const getInput = (e: FormEvent<HTMLFormElement>, inputName: string) => {
        const formData = new FormData(e.currentTarget);
        return String(formData.get(inputName)).trim();
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLogingIn(true);

        const employeeId = getInput(e, 'employee_email') || customToast("warn", "Insert your email");
        const password = getInput(e, 'password') || customToast("warn", "Insert your password");
        
        if(!employeeId || !password){
            return setIsLogingIn(false);
        }
        
        try {
            const user = await userLogin(employeeId, password);
            if(user){
                icon.current = 'success';
                message.current = 'Logged in successfully';
                auth.dispatch({type: 'login', payload: {
                    user: user.user, 
                    email: user.email, 
                    id: user.id,
                    token: user.token,
                    photo: user.photo
                }})
                navigate("/dashboard");
                
                const swalProps = {
                    text: message.current,
                    icon: icon.current || undefined,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }
                await CustomSwal({data: swalProps, theme: theme})
            }
        } catch (error) {
            setIsLogingIn(false);
            throw (error instanceof Error)
                ? error
                : new Error("Unknown error occurred")
        }

        setIsLogingIn(false);
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
                            <div className="login">
                                (
                                <small>init1.dev@gmail.com</small>|
                                <small>12345</small>
                                )
                            </div>
                        </LoginInfo>

                        <Form onSubmit={(e) => handleSubmit(e)} style={{marginTop: '2rem'}} replace>
                            <input type="hidden" name="redirectTo" value={from} />

                            <Input type="text" name="employee_email" placeholder="Insert username" />

                            <Input type="password" name="password" placeholder="Insert password" />

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
    padding: 0.5rem;
    color: ${({ theme }) => theme.text};
    border-radius: 1rem;

    .login {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        color: ${({ theme }) => theme.text};
        filter: brightness(50%);
    }
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