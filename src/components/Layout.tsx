import { Navigate, Outlet, useLocation, useRouteLoaderData } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { fakeAuthProvider } from "../helpers/AuthProvider";

function Layout() {
    const { user } = useRouteLoaderData("root") as { user: string | null };
    const { theme, handleToggleTheme } = useTheme();
    const location = useLocation();
    const isDashboard = location.pathname.match("/^/dashboard(?:/|$)/");
    const isLogin = location.pathname.match("/^/login(?:/|$)/");

    return (
        <>
            { (!user || !fakeAuthProvider.isAuthenticated) &&
                <ThemeButton onClick={handleToggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </ThemeButton>
            }

            {!user && !isLogin &&
                <Navigate to="/login" replace />
            }

            {user && !isDashboard &&
                <Navigate to="/dashboard" replace />
            }

            <Outlet />
        </>
    );
}

const Button = styled.button`
    background-color: ${({ theme }) => theme.bg};
    border: 1px;
    /* border-color: ${({ theme }) => theme.themeButtonBg}; */
    color: ${({ theme }) => theme.text};
    padding: 0.5rem;
    cursor: pointer;
    font-size: 15px;
    border-radius: 5px;
    margin: 0.5rem;
    box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

    &:focus, &:focus-visible {
        outline: none;
    }
`;

const ThemeButton = styled(Button)`
    position: absolute;
    top: 20px;
    right: 25px;
    margin: 0;
    z-index: 1Z;
`

export default Layout;