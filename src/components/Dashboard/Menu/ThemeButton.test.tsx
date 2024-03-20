import { render } from "@testing-library/react";
import ThemeButton from "./ThemeButton";

describe('ThemeButton component', () => {

    test("Renders the component", () => {
        render(
            <ThemeButton theme={"light"} handleToggleTheme={()=> {}}/>
        )
        expect(true).toBeTruthy();
    });
    
    test("Component content is correct (🌙)", () => {
        render(
            <ThemeButton theme={"light"} handleToggleTheme={()=> {}}/>
        )
        const Button = ThemeButton({theme: "light", handleToggleTheme: () => {}});
        const ButtonClass = Button.type.styledComponentId;
        const ThemeButtonRoots = document.getElementsByClassName(ButtonClass);
        const style = window.getComputedStyle(ThemeButtonRoots[0]);
        expect(style.backgroundColor).toBe("rgb(255, 255, 255)");
        expect(Button.props.children).toEqual("🌙");
    });

    test("Component content is correct (☀️)", () => {
        render(
            <ThemeButton theme={"dark"} handleToggleTheme={()=> {}}/>
        )
        const Button = ThemeButton({theme: "dark", handleToggleTheme: () => {}});
        const ButtonClass = Button.type.styledComponentId;
        const ThemeButtonRoots = document.getElementsByClassName(ButtonClass);
        const style = window.getComputedStyle(ThemeButtonRoots[0]);
        expect(style.backgroundColor).toBe("rgb(41, 40, 40)");
        expect(Button.props.children).toEqual("☀️");
    });

});