import styled, { ThemeContext } from "styled-components";
import { useContext } from "react";
import CustomSwal from "../Swal/CustomSwal";
import CustomSwalHtml from "../Swal/CustomSwalHtml";
import UserContext from "../../contexts/Auth/UserContext";
import AuthProvider from "../../contexts/Auth/AuthContext";
import { useAppDispatch } from "../../hooks/store";

function AuthStatus() {
    const theme = useContext(ThemeContext);
    const auth = useContext(UserContext);
    const dispatch = useAppDispatch();
    
    const { user, email, photo, id } = auth.state;

    if (!user) {
        return <p>You are not logged in</p>;
    }

    const handleEditUser = async() => {
        const swalProps = {
            text: 'Edit:',
            html: (
                <AuthProvider>
                    <CustomSwalHtml data={{
                        user: String(user),
                        email: String(email),
                        id: String(id),
                        dispatch: dispatch,
                        authDispatch: auth.dispatch,
                        themeToUse: theme
                    }}/>
                </AuthProvider>
            )
        }

        await CustomSwal({data: swalProps, theme: theme})
    }

    return (
        <Container>
            <UserContainer>
                <ProfileImage src={photo ?? ""} alt="imagen de perfil" />
                <ProfileName>{user}</ProfileName>
                <ProfileEmail>{email}</ProfileEmail>
                <Button onClick={handleEditUser}>
                    Edit User
                </Button>
            </UserContainer>

            <CopyrightTitle>Trvl Hotel Admin Dashboard</CopyrightTitle>
            <CopyrightSubtitle>© 2024 All Rights Reserved</CopyrightSubtitle>

            <CopyrightMade>Made with ♥ by In1t.dev</CopyrightMade>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 0 2rem 0 2rem;
    margin-bottom: 4rem;
`

const UserContainer = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.menuBox};
    box-shadow: 0px 20px 30px #00000014;
    padding: 3rem 1rem 1rem 1rem;
    border-radius: 1rem;
    margin-bottom: 3rem;
    text-align: center;
    transition: scale 0.1s ease-in-out;

    &:hover {
        scale: 1.06;
    }
`

const Button = styled.button`
    all: unset;
    cursor: pointer;
    background-color: #EBF1EF;
    border-radius: 0.5rem;
    color: #135846;
    font-size: 14px;
    margin-top: 1rem;
    width: 75%;
    padding: 0.5rem;
    border: 0;
    transition: background-color 0.4s ease;

    &:hover {
        color: white;
        background-color: #0e4234;
    }

    &:focus, &:focus-visible {
        outline: unset;
    }
`

const ProfileImage = styled.img`
    position: absolute;
    width: 32%;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    top: -31px;
    left: 67px;
`

const ProfileName = styled.p`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 0.2rem;
`

const ProfileEmail = styled.small`
    color: #888888;
    font-size: 12px;
    font-weight: normal;
`

const CopyrightTitle = styled.p`
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 0.2rem;
`

const CopyrightSubtitle = styled.p`
    color:  ${({ theme }) => theme.menuText};
    font-size: 12px;
    text-align: left;
    margin-bottom: 2rem;
`

const CopyrightMade = styled.p`
    color:  ${({ theme }) => theme.menuText};
    text-align: left;
    font-size: 13px;
`

export default AuthStatus;