import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { ImSearch } from "react-icons/im";
import { query1350, query1500 } from "../../../helpers/responsive";

export interface SectionData {
    label: string;
    accesor?: string | boolean;
    display?: () => void;
}

export interface TabsProps  {
    section: SectionData[];
    children: ReactNode;
    currentTab: string | boolean | undefined;
    setCurrentTab: Dispatch<SetStateAction<string | boolean | undefined>>;
    resetPage: () => void;
}

export const TabsComponent = ({
    section,
    children,
    currentTab,
    setCurrentTab,
    resetPage
}: TabsProps ) => {

    useEffect(() => {
        setCurrentTab(currentTab)
        resetPage();
    }, [currentTab]);
    
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <TabsContainer>
                <TabsContent>
                    { 
                        section.map((item, index) => (
                            <Tab 
                                key={index} 
                                onClick={() => {
                                    setCurrentTab(item.accesor);
                                }}
                                aria-selected={item.accesor === currentTab ? "true" : "false"}
                            >
                                {item.label}
                            </Tab>
                        )) 
                    }
                </TabsContent>
                {/* <SearchInput type="search" /> */}
                {children}
            </TabsContainer>
            <Search type="button">
                <ImSearch />
            </Search>
        </div>
    )

}

const TabsContainer = styled.div`
    display: flex;
    width: 100%;
    margin-right: 1rem;
    justify-content: space-between;
    align-items: baseline;
    height: 70px;
    gap: 1rem;
    user-select: none;
`

const TabsContent = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem 0 1rem;
`

const Tab = styled.button`
    all: unset;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    height: 2.5rem;
    border-bottom: 2px solid grey;
    padding: 0 2rem;

    @media (max-width: ${query1500}) {
        font-size: 15px;
        padding: 0 1rem;
    }

    @media (max-width: ${query1350}) {
        
    }

    &:focus, &:focus-visible {
        outline: unset;
    }

    &:hover {
        color: #57996a;
        border-color: #57996a;
    }

    &[aria-selected="true"] {
        border-bottom: 2px solid #57996a;
        color: #57996a;
    }
`

const Search = styled.button`
    color: white;
    outline: unset;
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};

    &:hover {
        border-color: ${({ theme }) => theme.iconsColor};
    }

    &:focus, &:focus-visible {
        outline: unset;
    }
`

// const SearchInput = styled.input`
//     border-radius: 0.5rem;
//     border: 1px solid black;
//     height: 25px;
//     width: 25%;
//     padding: 0 0.5rem;
// `