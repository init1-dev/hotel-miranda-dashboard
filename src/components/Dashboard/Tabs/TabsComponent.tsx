import { Dispatch, ReactNode, SetStateAction } from "react";
import styled from "styled-components";

export interface SectionData {
    label: string;
    accesor?: string | boolean;
    display?: () => void;
}

export interface TabsProps  {
    section: SectionData[],
    children: ReactNode,
    setCurrentTab: Dispatch<SetStateAction<string | boolean | undefined>>;
}

export const TabsComponent = ({section, children, setCurrentTab}: TabsProps ) => {
    
    return (
        <>
            <TabsContainer>
                <TabsContent>
                    { 
                        section.map((item, index) => (
                            <Tab key={index} onClick={() => setCurrentTab(item.accesor)}>{item.label}</Tab>
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
`