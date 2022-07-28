import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { Navbar } from "../../src/ui/components";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}) );

describe('Pruebas en Navbar', () => { 
    
    const contextValue = {
        logged: true,
        user: {
            id : 1,
            name: 'Esteban De la Peña'
        },
        logout: jest.fn()
    }

    beforeEach( ()=> jest.clearAllMocks() );

    test('si esta autenticado debe mostrar usuario', () => { 
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        screen.debug();
        expect( screen.getByText('Esteban De la Peña') ).toBeTruthy();
    });

    test('debe de llamar el logout y navigate cuando se hace click en logout', () => { 
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        //Se busca el boton que se quiere evualuar con el click
        const logoutButton = screen.getByRole('button');
        //este evento ejecuta el click del boton a evaluar
        fireEvent.click(logoutButton);
        expect(contextValue.logout ).toHaveBeenCalled();
        expect( mockUseNavigate ).toHaveBeenCalledWith("/login", { "replace": true });
        
    });

});