import { createGlobalStyle } from "styled-components";

export interface Theme {
    bg: string;
    contentBg: string;
    text: string;
    menuText: string;
    menuActive: string;
    iconsColor: string;
    menuBox: string;
    tabButtonColor: string;
    tableHover: string;
}

export const lightTheme: Theme = {
    bg: '#f3f3f3',
    contentBg: 'white',
    text: '#3b3b3b',
    menuText: '#799283',
    menuActive: '#E23428',
    iconsColor: '#135846',
    menuBox: '#FFFFFF',
    tabButtonColor: 'black',
    tableHover: '#a8c7b6',
};

export const darkTheme: Theme = {
    bg: '#171717',
    contentBg: '#202020',
    text: '#e9e9e9',
    menuText: '#799283',
    menuActive: '#E23428',
    iconsColor: '#808080',
    menuBox: '#292828',
    tabButtonColor: '#7bcf92',
    tableHover: '#657a6e',
};

export const GlobalStyles = createGlobalStyle<{ theme?: Theme }>`
    :root {
        background-color: ${({ theme }) => theme.bg};
        font-family: Poppins;
    }
`;