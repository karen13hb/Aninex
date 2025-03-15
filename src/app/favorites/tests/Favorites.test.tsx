import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritesPage from '../page';
import { useAppSelector } from '@/app/store/store';
import { useModal } from '@/app/context/ModalContext';


// Mockeamos el hook del store para controlar los favoritos
jest.mock('@/app/store/store', () => ({
  useAppSelector: jest.fn(),
}));

// Mockeamos el hook del Modal para verificar la función openModal
jest.mock('@/app/context/ModalContext', () => ({
  useModal: jest.fn(),
}));

// Mockeamos el componente Card para evitar renderizar el componente real
jest.mock('@/app/components/Card/Card', () => ({
  __esModule: true,
  default: ({ anime, onClick }: { anime: { id: number; title: string }; onClick: () => void }) => (
    <div data-testid="card" onClick={onClick}>
      {anime.title}
    </div>
  ),
}));

describe('FavoritesPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('muestra mensaje "No tienes favoritos aún" cuando no hay favoritos', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);
    (useModal as jest.Mock).mockReturnValue({ openModal: jest.fn() });
    
    render(<FavoritesPage />);
    
    expect(screen.getByText('No tienes favoritos aún.')).toBeInTheDocument();
  });

  test('muestra una lista de cards cuando hay favoritos', () => {
    const favorites = [
      { id: 1, title: 'Anime 1' },
      { id: 2, title: 'Anime 2' },
    ];
    (useAppSelector as jest.Mock).mockReturnValue(favorites);
    (useModal as jest.Mock).mockReturnValue({ openModal: jest.fn() });
    
    render(<FavoritesPage />);
    
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(favorites.length);
    expect(screen.getByText('Anime 1')).toBeInTheDocument();
    expect(screen.getByText('Anime 2')).toBeInTheDocument();
  });

  test('llama a openModal con el id correcto cuando se hace click en una card', async () => {
    const favorites = [
      { id: 1, title: 'Anime 1' },
    ];
    const openModalMock = jest.fn();
    (useAppSelector as jest.Mock).mockReturnValue(favorites);
    (useModal as jest.Mock).mockReturnValue({ openModal: openModalMock });
    
    render(<FavoritesPage />);
    
    const card = screen.getByTestId('card');
    await userEvent.click(card);
    
    expect(openModalMock).toHaveBeenCalledWith(1);
  });
});
