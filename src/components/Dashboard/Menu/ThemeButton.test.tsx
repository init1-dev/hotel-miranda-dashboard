import { render } from "@testing-library/react";
import ThemeButton from "./ThemeButton";

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the component", () => {
    
    render(<ThemeButton theme={"light"} handleToggleTheme={()=> {}}/>)
    expect(true).toBeTruthy();
});