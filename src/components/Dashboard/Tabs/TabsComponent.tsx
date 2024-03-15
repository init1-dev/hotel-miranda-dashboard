import { Dispatch, ReactNode, SetStateAction, useState } from "react";
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
    const [activeTab, setActiveTab] = useState<string | boolean | undefined>(section[0]?.accesor);
    
    return (
        <>
            <TabsContainer>
                <TabsContent>
                    { 
                        section.map((item, index) => (
                            <Tab 
                                key={index} 
                                onClick={() => {
                                    setActiveTab(item.accesor);
                                    setCurrentTab(item.accesor);
                                }}
                                aria-selected={item.accesor === activeTab ? "true" : "false"}
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

    &:focus, &:focus-visible {
        outline: unset;
    }

    &:hover {
        border-color: unset;
    }

    &[aria-selected="true"] {
        font-weight: bold;
        color: #7bcf92;
        filter: brightness(0.7);

        &:before {
            content: '<';
            margin-right: 0.2rem;
        }

        &:after {
            content: '>';
            margin-left: 0.2rem;
        }
    }
`