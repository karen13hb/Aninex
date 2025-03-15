import { fireEvent, render, screen, waitFor,act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Filters from '@/app/models/Filters';
import FormAnimes from '../FormAnimes';

describe('FormAnimes', () => {
  const defaultFilters: Filters = {
    search: '',
    genre: '',
    year: undefined,
    status: '',
    season: undefined
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: { GenreCollection: ['Action', 'Comedy', 'Drama'] },
        }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('muestra el formulario con valores predeterminados y carga los géneros', async () => {
    const onFilterChange = jest.fn();
    render(<FormAnimes filters={defaultFilters} onFilterChange={onFilterChange} />);

    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Airing Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Season/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByRole('option', { name: 'Action' })).toBeInTheDocument()
    );
    expect(screen.getByRole('option', { name: 'Comedy' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Drama' })).toBeInTheDocument();
  });

test('llama a onFilterChange cuando se modifica el input de búsqueda', () => {
    const onFilterChange = jest.fn();
    render(<FormAnimes filters={defaultFilters} onFilterChange={onFilterChange} />);
    
    const searchInput = screen.getByPlaceholderText('Escribe aquí...');
    fireEvent.change(searchInput, { target: { name: 'search', value: 'Naruto' } });
    
    expect(onFilterChange).toHaveBeenCalledWith({ ...defaultFilters, search: 'Naruto' });
  }); 

  test('llama a onFilterChange al cambiar el género', async () => {
    const onFilterChange = jest.fn();
    render(<FormAnimes filters={defaultFilters} onFilterChange={onFilterChange} />);

    await waitFor(() =>
      expect(screen.getByRole('option', { name: 'Action' })).toBeInTheDocument()
    );

    const genreSelect = screen.getByLabelText(/Genres/i);
    act( () => {
        fireEvent.change(genreSelect, { target: { name: 'genre', value: 'Comedy' } });
    });
    
    const lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.genre).toBe('Comedy');
  });

test('llama a onFilterChange al cambiar año, estado de emisión y temporada', async () => {
    const onFilterChange = jest.fn();
    render(<FormAnimes filters={defaultFilters} onFilterChange={onFilterChange} />);
    
    const yearSelect = screen.getByLabelText(/Year/i);
    await userEvent.selectOptions(yearSelect, '2023');
    let lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.year).toBe(2023);
  
    const statusSelect = screen.getByLabelText(/Airing Status/i);
    await userEvent.selectOptions(statusSelect, 'RELEASING');
    lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.status).toBe('RELEASING');
  
    const seasonSelect = screen.getByLabelText(/Season/i);
    await userEvent.selectOptions(seasonSelect, 'SUMMER');
    lastCall = onFilterChange.mock.calls[onFilterChange.mock.calls.length - 1][0];
    expect(lastCall.season).toBe('SUMMER');
  });
  
});
