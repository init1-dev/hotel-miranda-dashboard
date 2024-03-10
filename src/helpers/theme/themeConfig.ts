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
}

export const lightTheme: Theme = {
    bg: '#F8F8F8',
    contentBg: 'white',
    text: 'black',
    menuText: '#799283',
    menuActive: '#E23428',
    iconsColor: '#135846',
    menuBox: '#FFFFFF',
    tabButtonColor: 'black'
};

export const darkTheme: Theme = {
    bg: '#171717',
    contentBg: '#202020',
    text: 'white',
    menuText: '#799283',
    menuActive: '#E23428',
    iconsColor: '#808080',
    menuBox: '#292828',
    tabButtonColor: '#7bcf92'
};

export const GlobalStyles = createGlobalStyle<{ theme?: Theme }>`
    :root {
        background-color: ${({ theme }) => theme.bg};
        font-family: Poppins;
    }
`;
