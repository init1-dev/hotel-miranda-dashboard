import styled from "styled-components";

export const CalendarStyle = styled.div`
    background-color: ${({ theme }) => theme.contentBg};
    border-radius: 0.5rem;
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 12px;
    max-width: 450px;
    margin-bottom: 1.5rem;
    box-shadow: 2px 2px 6px -4px black;

    .calendar-sidebar {
        width: 300px;
        height: 400px;
        line-height: 1.5;
        background: grey;
        color: black;
        border-right: 1px solid black;
    }

    .calendar-sidebar-section {
        padding: 2em;
    }

    .calendar-main {
        flex-grow: 1;
        padding: 1rem;
    }

    .fc .fc-toolbar-title {
        font-size: 12px;
    }

    .fc { /* the calendar root */
        max-width: 1100px;
        margin: 0 auto;
    }

    .fc-popover-header {
        background-color: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.text};
    }

    .fc-popover-body {
        background-color: ${({ theme }) => theme.contentBg};
        color: ${({ theme }) => theme.text};
    }

    table[role="presentation"] {
        border-right: 1px solid;
    }

    .fc-scroller {
        &::-webkit-scrollbar {
            width: fit-content;
        }

        &::-webkit-scrollbar-track {
            background: none;
        }

        &::-webkit-scrollbar-thumb {
            background: grey;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }

    .fc-button.fc-button-primary {
        background-color: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.text};

        &:hover, &:focus, &:focus-visible {
            background-color: ${({ theme }) => theme.iconsColor};
            color: ${({ theme }) => theme.contentBg};
            box-shadow: unset;
        }

        &.fc-button-active, &.fc-button-active:focus, &.fc-button-active:focus-visible {
            background-color: ${({ theme }) => theme.iconsColor};
            color: ${({ theme }) => theme.contentBg};
            
            &:focus, &:focus-visible {
                box-shadow: unset;
            }
        }
    }
`