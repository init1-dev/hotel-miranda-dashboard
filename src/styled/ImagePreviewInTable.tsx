import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
`

export const Imagen = styled.img`
    max-height: 50px;
    aspect-ratio: 16/9;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    object-fit: cover;
    object-position: center;
`

export const EmployeeDataModal = styled.img`
    max-height: 50px;
    aspect-ratio: 1/1;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
    object-fit: contain;
    object-position: center;
`

export const ImagePreview = styled.img`
    width: 100%;
`