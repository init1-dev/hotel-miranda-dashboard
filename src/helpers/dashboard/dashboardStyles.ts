import styled from "styled-components";

export const Button = styled.button`
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

export const ThemeButton = styled(Button)`
    height: auto;
    margin: 0;
    height: 2.5rem;
`