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
    user-select: none;
`

const TabsContent = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem 0 1rem;
    gap: 5rem;
`

const Tab = styled.button`
    all: unset;
    cursor: pointer;
    color: ${({ theme }) => theme.text};
    border-bottom: 2px solid transparent;

    &:focus, &:focus-visible {
        outline: unset;
    }

    &:hover {
        border-color: #7bcf92;
    }

    &[aria-selected="true"] {
        font-weight: bold;
        border-bottom: 2px solid #7bcf92;
        color: #7bcf92;
        filter: brightness(0.7);
    }
`