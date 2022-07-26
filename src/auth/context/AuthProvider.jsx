import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"
import { types } from "../types/types"

// const initialState = {
//     logged: false
// }

const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );

    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({ children }) => {
    
    const [ authState, dispatch ] = useReducer(authReducer, {} , init);

    const onLoginAuth = ( name = '') => {
        const user = {
            id: 1,
            name: name
        }
        const action = {
            type: types.login,
            payload: user
        }
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action);
    }

    const onLogoutAuth = () => {
        localStorage.removeItem('user');
        const action = { type: types.logout }
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{ ...authState, login: onLoginAuth, logout: onLogoutAuth }}>
            { children }
        </AuthContext.Provider>
    )
}
