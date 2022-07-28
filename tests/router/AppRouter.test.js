import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';


describe('Pruebas en <AppRouter />', () => {
    
    test('debe de mostrar el login si no esta autenticado', () => { 
        
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        screen.debug();
        expect( screen.getByText('LoginPage') ).toBeTruthy();
        expect( screen.getByText('Login') ).toBeTruthy();

    });

    test('debe de mostrar el componente de Marvel si esta autenticado', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                id : 1,
                name: 'Esteban De la Peña'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        screen.debug();
        expect( screen.getByText('Marvel Comics') ).toBeTruthy();
        expect( screen.getByText('Esteban De la Peña') ).toBeTruthy();
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);
    });

})