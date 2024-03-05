import { Form, redirect, useActionData, useLocation, useNavigation, useRouteLoaderData } from "react-router-dom";
import AuthStatus from "../helpers/login/authStatus";
import styled from "styled-components";
import { useState } from "react";

function LoginPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const from = params.get("from") || "/";
    const [username, setUsername] = useState('In1t.dev');
    const [password, setPassword] = useState('12345');

    const navigation = useNavigation();
    const isLoggingIn = navigation.formData?.get("username") != null;

    const actionData = useActionData() as { error: string } | undefined;

    const { user } = useRouteLoaderData("root") as { user: string | null };

    if(user === null) redirect("/")

    return (
        <>
            { !user &&
                <>
                    <LoginInfo>
                        <AuthStatus />

                        <p style={{marginTop: '1rem'}}>You must log in to view the page at {from}</p>
                    </LoginInfo>

                    <div>
                        <Form method="post"  style={{marginTop: '2rem'}} replace>
                            <input type="hidden" name="redirectTo" value={from} />

                            <Label>
                                Username: <Input name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </Label>{" "}

                            <Label>
                                Password: <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </Label>{" "}

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

const LoginInfo = styled.div`
    padding: 0%.5rem;
    color: ${({ theme }) => theme.text};
    border-radius: 1rem;
`

const Label = styled.label`
    padding: 1rem;
    z-index: 1;
    display: block;
`

const Input = styled.input`
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    width: 100%;
    padding: 0.5rem;
    box-shadow: -3px 5px 15px black;
    z-index: 1;
    display: block;
    margin-top: 1rem;
`

const Button = styled.button`
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    box-shadow: -3px 5px 15px black;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 50%;
`

export default LoginPage;