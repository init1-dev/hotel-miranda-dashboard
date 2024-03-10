import styled from "styled-components"

export const Preview = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    padding: 2rem;
    border-radius: 0.5rem;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    margin: 1rem 15% 0 15%;
    box-shadow: 1px 1px 5px black;
`

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
`