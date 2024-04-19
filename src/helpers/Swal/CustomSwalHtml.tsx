import styled from "styled-components";
import { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { PiPasswordDuotone } from "react-icons/pi";

interface CustomSwalHtmlProps {
    data: {
        user: any;
        email: any;
    };
    handleSubmit: Function;
}

const CustomSwalHtml = ({
    data,
    handleSubmit
}: CustomSwalHtmlProps) => {
    const formPassword = useRef(String(''));
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const handlePasswordInput = () => {
        setShowPasswordInput(!showPasswordInput);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(data.user, data.email, formPassword.current);
    }

    return <>
        <form onSubmit={handleFormSubmit}>
            <div>
                <Label htmlFor="username">Nombre de usuario:</Label>
                <InputStyle
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Insert new username"
                    defaultValue={data.user ? data.user : ''}
                    onChange={(e) => data.user = e.target.value}
                />
            </div>
            <div>
                <Label htmlFor="email">Correo electrónico:</Label>
                <InputStyle
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Insert new email"
                    defaultValue={data.email ? data.email : ''}
                    onChange={(e) => data.email = e.target.value}
                />
            </div>
            {
                showPasswordInput
                    ? <ChangePasswordBtnRed
                        type="button" 
                        onClick={() => handlePasswordInput()}
                    >
                        Close
                        <MdClose />
                    </ChangePasswordBtnRed>

                    : <ChangePasswordBtn 
                        type="button" 
                        onClick={() => handlePasswordInput()}
                    >
                        Change password
                        <PiPasswordDuotone />
                    </ChangePasswordBtn>
            }

            <InputPasswordDiv
                style={{
                    opacity: showPasswordInput ? "1" : '0',
                    margin: showPasswordInput ? "1.5rem 0 auto 0" : "0",
                    height: showPasswordInput ? "auto" : "0",
                    overflow: "hidden"
                }}>
                <Label htmlFor="password">New password:</Label>
                <InputStyle
                    type="email"
                    id="password"
                    name="email"
                    placeholder="Insert new password"
                    defaultValue={''}
                    onChange={(e) => formPassword.current = e.target.value}
                />
            </InputPasswordDiv>
            
            <button type="submit" hidden></button>
        </form>
    </>
}

const InputStyle = styled.input`
    font-family: Poppins;
    font-weight: 600;
    font-size: 14px;
    width: 75%;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    outline: unset;
    border: 1px solid grey;
`

const Label = styled.label`
    user-select: none;
`

const InputPasswordDiv = styled.div`
    transition: opacity 0.5s ease, margin 0.1s ease;
`

const ChangePasswordBtn = styled.button`
    width: 75%;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    margin: 0rem auto 0 auto;
    font-size: 14px;
    font-weight: 400;
    padding: 0.5rem;
    margin-bottom: 0;
    color: #414141;
    background-color: #c7c6c6;
    user-select: none;

    svg {
        font-size: 22px;
    }
`

const ChangePasswordBtnRed = styled(ChangePasswordBtn)`
    background-color: red;
    color: white;
`

export default CustomSwalHtml;