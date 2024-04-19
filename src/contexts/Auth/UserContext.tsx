import { createContext } from "react";
import { Action, State } from "./useAuth";

const UserContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({ 
    state: {
        auth: false, 
        user: null, 
        email: null, 
        id: null,
        token: null,
        photo: null
    }, dispatch: () => {}
});

export default UserContext;