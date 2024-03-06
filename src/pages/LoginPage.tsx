import { Form, redirect, useActionData, useLocation, useNavigation, useRouteLoaderData } from "react-router-dom";
import AuthStatus from "../helpers/login/authStatus";
import styled from "styled-components";
import { useState } from "react";
import hotel from "../assets/hotel-dashboard-header.jpeg";

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
                <>
                    <HeaderImage src={hotel} alt="imagen header del panel del hotel" />

                    <LoginInfo>
                        <AuthStatus />
                    </LoginInfo>

                    <div>
                        <Form method="post"  style={{marginTop: '2rem'}} replace>
                            <input type="hidden" name="redirectTo" value={from} />

                            <Input type="text" name="username" value={username}
                                placeholder="Your username"
                                onChange={(e) => setUsername(e.target.value)}/>

                            <Input type="password" name="password" value={password}
                                placeholder="Your password"
                                onChange={(e) => setPassword(e.target.value)}/>

                            <Button type="submit" disabled={isLoggingIn}>
                                {isLoggingIn ? "Logging in..." : "Login"}
                            </Button>

                            {actionData && actionData.error 
                                ? (
                                <p style={{ color: "red" }}>{actionData.error}</p>
                                ) : null}
                        </Form>
                    </div>
                </>
            }
        </>
    );
}

const HeaderImage = styled.img`
    height: 300px;
    width: 1000px;
    margin-top: -5rem;
    margin-bottom: 1rem;
    object-fit: cover;
    object-position: bottom;
`

const LoginInfo = styled.div`
    padding: 0%.5rem;
    color: ${({ theme }) => theme.text};
    border-radius: 1rem;
`

const Input = styled.input`
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    width: 350px;
    padding: 0.5rem;
    box-shadow: 0px 1px 6px #444444;
    z-index: 1;
    display: block;
    margin: 1rem auto 2rem auto;
`

const Button = styled.button`
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    box-shadow: 0px 1px 6px black;
    margin-bottom: 1rem;
    width: 150px;
`

export default LoginPage;