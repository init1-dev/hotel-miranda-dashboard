/// <reference types="@types/jest" />

import { CSSProperties } from "react";

type AllCSSProperties = keyof CSSProperties;

type DynamicProps = {
    [key in AllCSSProperties]?: string | undefined;
}

interface ElementProps {
    content?: string
}

type CombinedProps = ElementProps & DynamicProps;

export const expectElement = (element: JSX.Element, elementProps: CombinedProps) => {
    const ElementClass = element.type.styledComponentId;
    const ElementRoots = document.getElementsByClassName(ElementClass);
    const style = window.getComputedStyle(ElementRoots[0]) as CSSProperties;

    const dynamicKeys = Object.keys(elementProps) as AllCSSProperties[];

    for (const key of dynamicKeys) {
        const value = elementProps[key];
        switch (key) {
            case "content":
                return expect(element.props.children).toEqual(value);
            default:
                return expect(style[key as AllCSSProperties]).toBe(value);
        }
    }
};