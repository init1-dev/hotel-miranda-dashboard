import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/Auth/AuthContext";
import { delay } from "../../helpers/delay";

function Logout() {
    const auth = useContext(UserContext);

    const [isLogingOut, setIsLogingOut] = useState(false);

    const handleLogout = async() => {
        setIsLogingOut(true);
        
        await delay();

        auth.dispatch({type: 'logout'})
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