import { useFetcher } from "react-router-dom";
import styled from "styled-components";
import { MdLogout } from "react-icons/md";

function Logout() {
    const fetcher = useFetcher();

    const isLoggingOut = fetcher.formData != null;

    return (
        <>
            <fetcher.Form method="post" action="/logout">
                <LogButton type="submit" disabled={isLoggingOut}>
                    <MdLogout />
                    {isLoggingOut ? "Signing out..." : "Sign out"}
                </LogButton>
            </fetcher.Form>
        </>
    );
}

const LogButton = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    font-size: 12px;
    border: 0;
    transition: background-color 0.4s ease;

    &:hover {
        color: white;
        background-color: #0e4234;
    }
`

export default Logout;