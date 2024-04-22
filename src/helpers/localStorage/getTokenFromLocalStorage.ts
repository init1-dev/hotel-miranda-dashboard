import { AuthState } from "../../store/interfaces";

export const getTokenFromLocalStorage = (): string => {
    const appStoredState = localStorage.getItem('__hotel__app__state__');
    const authState = appStoredState ? JSON.parse(appStoredState) : null;
    const auth: AuthState | null = authState ? authState.auth : null;
    const token = auth ? auth.token : null;
    
    if(!token){
        return "";
    }

    return token;
}