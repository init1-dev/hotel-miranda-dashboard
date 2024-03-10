import styled from "styled-components"

export const Title = styled.h1`
    margin: 0 15% 0 15%;
`

export const Form = styled.form`
    background-color: ${({ theme }) => theme.contentBg};
    padding: 2rem;
    border-radius: 0.5rem;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    margin: 1rem 15% 0 15%;
    box-shadow: 1px 1px 5px black;
`

export const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
`

export const Label = styled.label`
    display: block;
`

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};;
`

export const TextArea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};;
`

export const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.text};;
    background-color: ${({ theme }) => theme.bg};
`

export const SectionSelect = styled(Select)`
    width: auto;
    background-color: unset;
    color: ${({ theme }) => theme.tabButtonColor};
    border: 2px solid ${({ theme }) => theme.tabButtonColor};

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