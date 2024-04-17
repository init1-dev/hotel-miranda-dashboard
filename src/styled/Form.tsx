import styled from "styled-components"
import { query1350, query1500 } from "../helpers/responsive"

export const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0rem 12% 0 12%;
    user-select: none;

    @media (max-width: ${query1500}) {
        margin: 1rem 5% 0 5%;
    }

    @media (max-width: ${query1350}) {
        margin: 1rem 2% 0 2%;
    }

    p{
        font-size: 24px;
    }

    small {
        user-select: text;
        filter: sepia()
    }
`

export const Form = styled.form`
    background-color: ${({ theme }) => theme.contentBg};
    padding: 2rem;
    border-radius: 0.5rem;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    margin: 1rem 20% 0 20%;
    box-shadow: 1px 1px 5px black;

    button {
        border: 2px solid transparent;
        
        &:hover, &:focus, &:focus-visible {
            outline: unset;
            border: 2px solid #135846;
        }
    }
`

export const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 90%;
`

export const Label = styled.label`
    display: block;
`

export const Input = styled.input`
    display: block;
    border: 0;
    box-shadow: #000000 2px 2px 10px -5px;
    width: 100%;
    padding: 0.7rem 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    border: 1px solid #80808042;

    &:focus, &:focus-visible {
        outline: unset;
        border: 1px solid #135846;
    }
`

export const InputDate = styled(Input)`
    border-radius: 0.5rem;
    
    ${({ theme }) => {        
        const isDarkTheme = theme.theme === 'dark';

        return (isDarkTheme) 
            ? `
                &::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                }
            `
            : '';
    }}
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 0.7rem 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};;
    border: 0;
    box-shadow: #000000 2px 2px 10px -5px;
    border: 1px solid #80808042;
    max-height: 150px;

    &:focus, &:focus-visible {
        outline: unset;
        border: 1px solid #135846;
    }
`

export const Select = styled.select`
    width: 100%;
    padding: 0.7rem 0.5rem;
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.text};;
    background-color: ${({ theme }) => theme.bg};
    border: 0;
    box-shadow: #000000 2px 2px 10px -5px;
    border: 1px solid #80808042;

    &:focus, &:focus-visible {
        outline: unset;
        border: 1px solid #135846;
    }
`

export const SectionSelect = styled(Select)`
    width: auto;
    background-color: unset;
    color: ${({ theme }) => theme.tabButtonColor};
    border: 2px solid ${({ theme }) => theme.tabButtonColor};

    &:focus, &:focus-visible {
        border: 2px solid ${({theme}) => theme.tabButtonColor};
    }

    option {
        color: black;
    }
`

export const AmenitiesSelect = styled(Select)`
    height: 245px;
`

export const Button = styled.button`
    color: white;
`