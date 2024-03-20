import { render } from "@testing-library/react";
import ThemeButton from "./ThemeButton";

describe('ThemeButton component', () => {
    const themeLightProps = { theme: "light", handleToggleTheme: () => {} };
    const themeDarkProps = { theme: "dark", handleToggleTheme: () => {} };

    const expectElement = (theme: string, bg: string, text: string) => {
        const Element = ThemeButton({theme: theme, handleToggleTheme: () => {}});
        const ElementClass = Element.type.styledComponentId;
        const ThemeButtonRoots = document.getElementsByClassName(ElementClass);
        const style = window.getComputedStyle(ThemeButtonRoots[0]);
        expect(style.backgroundColor).toBe(`rgb(${bg})`);
        expect(Element.props.children).toEqual(text);
    }

    test("Renders the component", () => {
        render(<ThemeButton {...themeLightProps} />);
        expect(true).toBeTruthy();
    });
    
    test("Component content is correct (🌙)", () => {
        render(<ThemeButton {...themeLightProps} />);
        expectElement("light", "255, 255, 255", "🌙");
    });

    test("Component content is correct (☀️)", () => {
        render(<ThemeButton {...themeDarkProps} />);
        expectElement("dark", "41, 40, 40", "☀️");
    });

});