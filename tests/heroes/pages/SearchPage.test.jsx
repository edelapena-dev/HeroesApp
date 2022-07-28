import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}) );

describe('Pruebas en <SearchPage />', () => { 

    test('Debe de mostrarse correctamente con valores por defecto', () => { 
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect( container ).toMatchSnapshot();
        //screen.debug();
    });

    test('Debe de mostrar ha batman y el input debe tener valor de queryString', () => { 
        
        
        const { container } = render(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <SearchPage />
            </MemoryRouter>
        )
        const inputValue = screen.getByRole('textbox');
        expect( inputValue.value ).toBe('batman');

        const imgSRC = screen.getByRole('img');
        expect( imgSRC.src ).toContain('/assets/heroes/dc-batman.jpg');
        
        const searchHero = screen.getByLabelText('searchHero')
        expect( searchHero.style.display ).toBe('none');

        const searchNoHero = screen.getByLabelText('searchNoHero')
        expect( searchNoHero.style.display ).toBe('none');
    });

    test('Debe de mostrar un error si no se encuentra un Heroe (batman123)', () => { 
        const { container } = render(
            <MemoryRouter initialEntries={ ['/search?q=batman123'] }>
                <SearchPage />
            </MemoryRouter>
        )
        const searchHero = screen.getByLabelText('searchHero')
        expect( searchHero.style.display ).toBe('none');

        const searchNoHero = screen.getByLabelText('searchNoHero');
        expect( searchNoHero.style.display ).not.toBe('none');
    });

    test('Debe de llamar al Navigate a la pantalla nueva', () => { 
        const inputValue = 'Batman';
        //TODO: Acá se declara el jest function para validar que se este ejecutando dentro del onSubmit
        const onSearchSubmit = jest.fn();
        //beforeEach( ()=> jest.clearAllMocks() );

        const { container } = render(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        
        fireEvent.input(input, { target: { value: inputValue } } );
        fireEvent.submit(form);

        expect(input.value).toBe(inputValue);
        expect(mockUseNavigate).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);

    });
});