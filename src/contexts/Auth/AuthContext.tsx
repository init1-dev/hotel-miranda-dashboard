import { HotelState } from "../../store/interfaces";
import { UserAuth } from "./useAuth";
import UserContext from './UserContext';

const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const initAppState = localStorage.getItem('__hotel__app__state__');
    
    const initState: HotelState = initAppState ? JSON.parse(initAppState) : {
        auth: null,
        app: null
    };

    const initUser = initAppState ? JSON.parse(initAppState).auth : null;
    
    const {state, dispatch} = UserAuth({
        auth: initUser ? initUser.auth : false,
        user: initUser ? initUser.user : null,
        email: initUser ? initUser.email : null,
        id: initUser ? initUser.id : null,
        token: initUser ? initUser.token : null,
        photo: initUser ? initUser.photo : null
    });

    localStorage.setItem('__hotel__app__state__', JSON.stringify({
        ...initState,
        auth: {
            auth: state?.auth,
            user: state?.user,
            email: state?.email,
            id: state?.id,
            token: state?.token,
            photo: state?.photo
        }
    }))

    return (
        <UserContext.Provider value={{state: state, dispatch: dispatch}}>
            {children}
        </UserContext.Provider>
    )
};

export default AuthProvider;