import { AuthState } from "../../store/interfaces";

export const getTokenFromLocalStorage = () => {
    const appStoredState = localStorage.getItem('__hotel__app__state__');
    const authState = appStoredState ? JSON.parse(appStoredState) : null;
    const auth: AuthState | null = authState ? authState.auth : null;
    const token = auth ? auth.token : null;
    
    if(!token){
        throw new Error("No token found");
    }

    return token;
}