import { useFetcher, useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";

function AuthStatus() {
    // Get our logged in user, if they exist, from the root route loader data
    const { user } = useRouteLoaderData("root") as { user: string | null };
    const fetcher = useFetcher();

    if (!user) {
        return <p>You are not logged in.</p>;
    }

    const isLoggingOut = fetcher.formData != null;

    return (
        <div>
            <p>Welcome {user}!</p>
            <fetcher.Form method="post" action="/logout">
            <Button type="submit" disabled={isLoggingOut}>
                {isLoggingOut ? "Signing out..." : "Sign out"}
            </Button>
            </fetcher.Form>
        </div>
    );
}

const Button = styled.button`
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    box-shadow: -3px 5px 15px black;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 50%;
`

export default AuthStatus;