import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/Auth/UserContext";

function Layout() {
    const auth = useContext(UserContext);
    const { user } = auth.state;
    const { theme, handleToggleTheme } = useTheme();
    const location = useLocation();
    const isDashboard = /\/dashboard(?:\/|$)/.test(location.pathname);
    const isLogin = /\/login(?:\/|$)/.test(location.pathname);

    return (
        <>
            { !user &&
                <ThemeButtonLayout onClick={handleToggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </ThemeButtonLayout>
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

const ButtonLayout = styled.button`
    background-color: ${({ theme }) => theme.bg};
    border: 1px;
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

const ThemeButtonLayout = styled(ButtonLayout)`
    position: absolute;
    top: 20px;
    right: 25px;
    margin: 0;
    z-index: 1Z;
`

export default Layout;