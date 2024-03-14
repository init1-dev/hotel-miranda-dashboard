import { createContext } from 'react';
import { Action, State, UserAuth } from "./useAuth";

export const UserContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({ 
    state: {auth: false, user: '', email: ''}, dispatch: () => {}
});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const initAuth = localStorage.getItem('auth') ? localStorage.getItem('auth') : null;
    const initUserString = localStorage.getItem('user');
    const initUser = initUserString ? JSON.parse(initUserString) : null;
    const {state, dispatch} = UserAuth({
        auth: initAuth ? initAuth === '1' : false,
        user: initUser ? initUser.user : '',
        email: initUser ? initUser.email : ''
    });

    localStorage.setItem('auth', state?.auth ? '1' : '0');
    localStorage.setItem('user', JSON.stringify({user: state?.user, email: state?.email}))

    return (
        <UserContext.Provider value={{state: state, dispatch: dispatch}}>
            {children}
        </UserContext.Provider>
    )
};

