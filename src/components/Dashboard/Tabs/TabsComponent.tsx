import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import styled from "styled-components";

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
        <>
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
                <SearchInput type="search" />
                {children}
            </TabsContainer>

        </>
    )

}

const TabsContainer = styled.div`
    display: flex;
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
    height: 2.5rem;
    border-bottom: 2px solid grey;
    padding: 0 2rem;

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

const SearchInput = styled.input`
    border-radius: 0.5rem;
    border: 1px solid black;
    height: 25px;
    width: 25%;
    padding: 0 0.5rem;
`