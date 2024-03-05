export const toggleTheme = (currentTheme: string) => {
    const swap = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem("__current__theme__", swap);
    return swap;
};

export const loadTheme = () => {
    const persistedState = localStorage.getItem("__current__theme__");
    return persistedState ? persistedState : 'light';
};