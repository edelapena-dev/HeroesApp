import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";


describe('Pruebas en <PublicRoute/>', () => { 
    
    test('Si no estoy autenticado debe de mostrar e children', () => { 
        const contextValue = {
            logged: false
        }
        render( 
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        expect( screen.getByText('Ruta Publica') ).toBeTruthy();
    });

    test('Si estoy autenticado debe de navegar a una pagina existente', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                id: 1,
                name: 'Esteban De la Peña'
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                                                    <PublicRoute>
                                                        <h1>Ruta Publica</h1>
                                                    </PublicRoute>
                        } />
                        <Route path='marvel' element={<h1>Pagina Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        screen.debug();
        expect( screen.getByText('Pagina Marvel') ).toBeTruthy();
    });

});