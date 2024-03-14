import { createContext } from 'react';
import { Action, State, UserAuth } from "./useAuth";

export const UserContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({ 
    state: {auth: false, user: null, email: null}, dispatch: () => {}
});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const initUserString = localStorage.getItem('__auth__');
    const initUser = initUserString ? JSON.parse(initUserString) : null;
    const {state, dispatch} = UserAuth({
        auth: initUser ? initUser.auth : false,
        user: initUser ? initUser.user : null,
        email: initUser ? initUser.email : null
    });

    localStorage.setItem('__auth__', JSON.stringify({auth: state?.auth, user: state?.user, email: state?.email}))

    return (
        <UserContext.Provider value={{state: state, dispatch: dispatch}}>
            {children}
        </UserContext.Provider>
    )
};

