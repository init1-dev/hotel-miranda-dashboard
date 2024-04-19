import { useReducer } from "react";

export interface State {
    auth: boolean;
    user: string | null;
    email: string | null;
    id: string | null;
    token: string | null;
    photo: string | null;
}

export interface Action {
    type: string;
    payload?: {
        user?: string;
        email?: string;
        id?: string;
        token?: string;
        photo?: string;
    };
}

const initialState = {
    auth: false,
    user: null,
    email: null,
    id: null,
    token: null,
    photo: null
}

const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                auth: true,
                user: action.payload?.user ?? state.user,
                email: action.payload?.email ?? state.email,
                id: action.payload?.id ?? state.id,
                token: action.payload?.token ?? state.token,
                photo: action.payload?.photo ?? state.photo
            }
        case 'edit':
            return {
                ...state,
                user: action.payload?.user ?? state.user,
                email: action.payload?.email ?? state.email
            }
        case 'logout':
            return initialState;
        default:
            return state;
    }
}

export const UserAuth = ({auth, user, email, id, token, photo}: State) => {
    const [state, dispatch] = useReducer(reducer, {auth, user, email, id, token, photo});

    return {state, dispatch: dispatch as React.Dispatch<Action>};
}