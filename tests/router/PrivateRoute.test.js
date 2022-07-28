import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => { 

    test('Si no estoy autenticado debe de mostrar el children', () => { 
        
        Storage.prototype.setItem = jest.fn();


        const contextValue = {
            logged: true,
            user: {
                id: 1,
                name: 'Esteban De la Peña'
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=superman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        screen.debug();
        expect( screen.getByText('Ruta Privada') ).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath","/search?q=superman");
    });

});