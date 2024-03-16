import { UserAuth } from "./useAuth";
import UserContext from './UserContext';

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const initUserString = localStorage.getItem('__auth__');
    const initUser = initUserString ? JSON.parse(initUserString) : null;
    const {state, dispatch} = UserAuth({
        auth: initUser ? initUser.auth : false,
        user: initUser ? initUser.user : null,
        email: initUser ? initUser.email : null,
        employeeId: initUser ? initUser.employeeId : null,
        photo: initUser ? initUser.photo : null
    });

    localStorage.setItem('__auth__', JSON.stringify({
        auth: state?.auth,
        user: state?.user,
        email: state?.email,
        employeeId: state?.employeeId,
        photo: state?.photo
    }))

    return (
        <UserContext.Provider value={{state: state, dispatch: dispatch}}>
            {children}
        </UserContext.Provider>
    )
};

export default AuthProvider;