import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    cursor: pointer;
`

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
    color: white;
    text-shadow: 1px 1px 1px black;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color: lightgray;

    &:active {
        outline: unset;
    }
`

export const Publish = styled(ActionButton)`
    background-color: #5AD07A;
`

export const Archive = styled(ActionButton)`
    background-color: #E23428;
`

export const NewButton = styled.button`
    background-color: #7bcf92;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-size: 13px;
    font-weight: 600;
    gap: 1rem;

    svg {
        font-size: 15px;
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