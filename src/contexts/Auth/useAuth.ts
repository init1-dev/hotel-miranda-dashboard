import { useReducer } from "react";

export interface State {
    auth: boolean;
    user: string | null;
    email: string | null;
}

export interface Action {
    type: string;
    payload?: {
        user?: string;
        email?: string;
    };
}

const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'login':
        return {
                ...state,
                auth: true,
                user: action.payload?.user ?? state.user,
                email: action.payload?.email ?? state.email
            }
        case 'edit':
            return {
                ...state,
                user: action.payload?.user ?? state.user,
                email: action.payload?.email ?? state.email
            }
        case 'logout':
            return {
                ...state,
                auth: false,
                user: '',
                email: ''
            }
        default:
            return state;
    }
}

export const UserAuth = ({auth, user, email}: State) => {
    const [state, dispatch] = useReducer(reducer, {auth, user, email});

    return {state, dispatch: dispatch as React.Dispatch<Action>};
}