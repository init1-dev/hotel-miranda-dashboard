import styled from "styled-components";

export const ButtonStyled = styled.button`
    font-size: 12px;
    color: #FFF;
    background-color: #135846;
    border-radius: 4rem;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border: unset;

    &:active {
        outline: unset;
    }
`;

export const ActionButton = styled.button`
    all: unset;
    width: auto;
    font-size: 12px;
    color: black;
    padding: 0.5rem;
    border-radius: 1rem;
    background-color: lightgray;

    &:active {
        outline: unset;
    }
`

export const ButtonStyledPublish = styled(ButtonStyled)`
    background-color: #5AD07A;
`;

export const ButtonStyledArchived = styled(ButtonStyled)`
    background-color: #E23428;
`;

export const ButtonStyledViewNotes = styled(ButtonStyled)`
    background-color: #e0f3e7;
    color: #393939;
`;

export const ButtonStyledViewNotesDisabled = styled(ButtonStyledViewNotes)`
    cursor: not-allowed;
    background-color: #EEF9F2;
    filter: opacity(0.6);
`

export const ButtonStyledNew = styled(ButtonStyled)`
    width: 200px;
`;