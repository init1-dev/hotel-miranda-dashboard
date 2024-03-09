import { ReactNode } from "react";
import styled from "styled-components";

export interface SectionData {
    label: string;
    accessor?: string;
    display?: () => void;
}

export interface TabsProps  {
    section: SectionData[],
    children: ReactNode
}

export const TabsComponent = ({section, children}: TabsProps ) => {

    return (
        <>
            <TabsContainer>
                <TabsContent>
                    { 
                        section.map((item, index) => (
                            <Tab key={index}>{item.label}</Tab>
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