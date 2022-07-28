import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => { 

    const initialSate = {
        logged: false,
        user: {}
    }

    test('debe retornar el estado por defecto', () => { 
        const newState = authReducer(initialSate, {});
        expect(newState).toBe(initialSate);
    });

    test('debe de llamar el login autenticar y establecer el user', () => { 
        const newUser = {
            id: 1,
            name: 'Esteban De la Peña'
        }
        const action = {
            type: types.login,
            payload: newUser
        }
        const newState = authReducer(initialSate, action);
        
        expect(newState.logged).toBe(true);
        expect(newState).toEqual({
                                    logged: true,
                                    user: action.payload
                                });
    });

    test('debe de llamar el logout borrar el name del usuario y logged en false', () => { 
        const action = {
            type: types.logout
        }
        const newState = authReducer(initialSate, action);
        expect(newState.logged).toBe(false);
        expect(newState).toEqual({ logged : false });
    });
});