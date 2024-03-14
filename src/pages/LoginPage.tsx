import { Form, redirect, useActionData, useLocation, useNavigate } from "react-router-dom";
import AuthStatus from "../helpers/login/authStatus";
import styled from "styled-components";
import { FormEvent, useContext, useState } from "react";
import hotel from "../assets/hotel-dashboard-header2.jpeg";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../contexts/Auth/AuthContext";
import { delay } from "../helpers/delay";

function LoginPage() {
    const auth = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";

    const [isLogingIn, setIsLogingIn] = useState(false);

    const actionData = useActionData() as { error: string } | undefined;

    const { user } = auth.state;

    if(user === null) redirect("/");

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLogingIn(true);

        const formData = new FormData(e.currentTarget);
        const username = String(formData.get('username')).trim();
        const password = String(formData.get('password')).trim();
        
        await delay();

        try {
            if (username === "init.dev" && password === "12345"){
                auth.dispatch({type: 'login', payload: {user: username, email: 'init1.dev@gmail.com'}})
                console.log("login correcto");
                
                navigate("/dashboard")
                setIsLogingIn(false);
            } else {
                console.log("login mal");
                setIsLogingIn(false);
                return {
                    error: "Invalid login attempt",
                }
            }
        } catch (error) {
            throw (error instanceof Error)
                ? error
                : new Error("Unknown error occurred")
        }
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

                            <Input type="text" name="username" defaultValue="init.dev"/>

                            <Input type="password" name="password" defaultValue="12345"/>

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