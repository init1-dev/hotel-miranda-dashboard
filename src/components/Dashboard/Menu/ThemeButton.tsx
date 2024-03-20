import styled from "styled-components";

const ThemeButton = ({ theme, handleToggleTheme }: { theme: string, handleToggleTheme: Function }) => {
    return (
        <ThemeButtonLayout $theme={theme === 'light' ? true : false} onClick={() => handleToggleTheme()}>
            {theme === 'light' ? '🌙' : '☀️'}
        </ThemeButtonLayout>
    );
}

const ButtonTopbar = styled.button.attrs<{ $theme?: boolean; }>(props => ({
    $theme: props.$theme
}))`
    background-color: ${props => props.$theme 
        ? `#FFFFFF`
        : `#292828`
    };
    border: 1px;
    padding: 0.3rem;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset;

    &:focus, &:focus-visible {
        outline: none;
    }
`;

const ThemeButtonLayout = styled(ButtonTopbar)`
    margin: 0;
    z-index: 1;
    height: 100%;
`

export default ThemeButton;