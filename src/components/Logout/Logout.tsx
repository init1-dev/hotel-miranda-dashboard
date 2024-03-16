import styled, { ThemeContext } from "styled-components";
import { MdLogout } from "react-icons/md";
import { useContext, useState } from "react";
import UserContext from "../../contexts/Auth/UserContext";
import { delay } from "../../helpers/delay";
import CustomSwal from "../../helpers/Swal/CustomSwal";

function Logout() {
    const auth = useContext(UserContext);
    const theme = useContext(ThemeContext);

    const [isLogingOut, setIsLogingOut] = useState(false);

    const handleLogout = async() => {
        setIsLogingOut(true);
        
        await delay();

        const swalProps = {
            text: 'Logged out successfully',
            icon: 'success' as const,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }

        auth.dispatch({type: 'logout'})

        await CustomSwal({data: swalProps, theme: theme})
    }

    return (
        <>
            <LogButton onClick={handleLogout} disabled={isLogingOut}>
                <MdLogout />
                {isLogingOut ? "Loging out..." : "Log out"}
            </LogButton>
        </>
    );
}

const LogButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #135846;
    color: white;
    font-size: 13px;
    border: 0;
    transition: all 0.4s ease;

    &:hover {
        color: white;
        background-color: #0e4234;
    }
`

export default Logout;