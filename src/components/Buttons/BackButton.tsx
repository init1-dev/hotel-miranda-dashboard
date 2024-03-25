import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <BackButtonStyles onClick={() => navigate(-1)}>
            <TbArrowBackUp /> BACK
        </BackButtonStyles>
    );
}

export const BackButtonStyles = styled.button`
    font-family: Poppins;
    font-size: 14px;
    background-color: #135846;
    color: white;
    outline: unset;
    border: unset;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
        font-size: 20px;
        font-weight: 600;
    }

    &:active, &:focus, &:focus-visible {
        outline: unset;
        border: unset;
    }

    &:hover {
        background-color: #0e6850;
    }
`

export default BackButton;