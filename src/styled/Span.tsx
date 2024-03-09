import styled from "styled-components";

export const SpanStyled = styled.span`
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.text};
    background-color: #5AD07A;
    border-radius: 4rem;
    padding: 0.5rem;
    border: 0rem;
`;

export const SpanContainer = styled.span`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 1rem;
`

export const SpanStyledCheckIn = styled(SpanStyled)`
    background-color: #5AD07A;
`;

export const SpanStyledCheckOut = styled(SpanStyled)`
    background-color: #E23428;
`;

export const SpanStyledInProgress = styled(SpanStyled)`
    color: #393939;
    background-color: #FF9C3A;
`;