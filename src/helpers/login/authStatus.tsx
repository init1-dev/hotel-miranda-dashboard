import { useRouteLoaderData } from "react-router-dom";
import styled from "styled-components";
import init from "../../assets/init.png";

function AuthStatus() {
    const { user, email } = useRouteLoaderData("root") as { user: string | null, email: string | null };

    if (!user) {
        return <p>You are not logged in</p>;
    }

    return (
        <Container>
            <ProfileImage src={init} alt="imagen de perfil" />
            <UserContainer>
                <ProfileName>{user}</ProfileName>
                <ProfileEmail>{email}</ProfileEmail>
                <Button type="submit">
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
position: relative;
    width: 100%;
    padding: 0 2rem 0 2rem;
`

const UserContainer = styled.div`
    background-color: ${({ theme }) => theme.menuBox};
    box-shadow: 0px 20px 30px #00000014;
    padding: 3rem 1rem 1rem 1rem;
    border-radius: 1rem;
    margin-bottom: 3rem;
    text-align: center;
`

const Button = styled.button`
    background-color: #EBF1EF;
    color: #135846;
    font-size: 14px;
    margin-top: 1rem;
    width: 75%;
    padding: 0.5rem;
    border: 0;
    transition: all 0.4s ease;

    &:hover {
        color: white;
        background-color: #0e4234;
    }
`

const ProfileImage = styled.img`
    position: absolute;
    width: 25%;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    top: -32px;
    left: 97px;
`

const ProfileName = styled.p`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 0.2rem;
`

const ProfileEmail = styled.p`
    color: #888888;
    font-size: 13px;
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