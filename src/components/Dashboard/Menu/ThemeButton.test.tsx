/// <reference types="@types/jest" />

import { render } from "@testing-library/react";
import ThemeButton from "./ThemeButton";
import { expectElement } from "../../../helpers/Testing/expectElement";
import { colorToRgb } from "../../../helpers/Testing/colorToRgb";

describe('ThemeButton component', () => {
    const themeLightProps = { theme: "light", handleToggleTheme: () => {} };
    const themeDarkProps = { theme: "dark", handleToggleTheme: () => {} };

    test("Renders the component", () => {
        render(<ThemeButton {...themeLightProps} />);
        expect(true).toBeTruthy();
    });
    
    test("Component content is correct (🌙)", () => {
        render(<ThemeButton {...themeLightProps} />);
        const Element = ThemeButton({...themeLightProps});
        expectElement(Element, {backgroundColor: colorToRgb("#ffffff"), content: "🌙"});
    });

    test("Component content is correct (☀️)", () => {
        render(<ThemeButton {...themeDarkProps} />);
        const Element = ThemeButton({...themeDarkProps});
        expectElement(Element, {backgroundColor: colorToRgb("#292828"), content: "☀️"});
    });

    test("Component margin is correct (0)", () => {
        render(<ThemeButton {...themeLightProps} />);
        const Element = ThemeButton({...themeLightProps});
        expectElement(Element, {margin: "0px"});
    });

});