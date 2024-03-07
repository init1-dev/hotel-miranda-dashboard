import { Form, redirect, useActionData, useLocation, useNavigation, useRouteLoaderData } from "react-router-dom";
import AuthStatus from "../helpers/login/authStatus";
import styled from "styled-components";
import { useState } from "react";
import hotel from "../assets/hotel-dashboard-header2.jpeg";
import { FaUserCircle } from "react-icons/fa";

function LoginPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const isLoggingIn = navigation.formData?.get("username") != null;

    const actionData = useActionData() as { error: string } | undefined;

    const { user } = useRouteLoaderData("root") as { user: string | null };

    if(user === null) redirect("/");

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

                        <Form method="post"  style={{marginTop: '2rem'}} replace>
                            <input type="hidden" name="redirectTo" value={from} />

                            <Input type="text" name="username" value={username}
                                placeholder="init.dev"
                                onChange={(e) => setUsername(e.target.value)}/>

                            <Input type="password" name="password" value={password}
                                placeholder="12345"
                                onChange={(e) => setPassword(e.target.value)}/>

                            <Button type="submit" disabled={isLoggingIn}>
                                {isLoggingIn ? "Logging in..." : "Login"}
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