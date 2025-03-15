import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from "../Modal";
import { useModal } from "@/app/context/ModalContext";
import { fetchAnimeDetails } from "@/app/services/AnimeService";


jest.mock('@/app/context/ModalContext', () => ({
    useModal: jest.fn(),
  }));
  
  jest.mock("../../../services/AnimeService", () => ({
    fetchAnimeDetails: jest.fn()
  }));
  
  describe("Modal Component", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("No se debe renderizar si no se proporciona animeId", () => {
        (useModal as jest.Mock).mockReturnValue({ animeId: null, closeModal: jest.fn() });
        const { container } = render(<Modal />);
        expect(container.firstChild).toBeNull();
      });


    test("Renderizar spinner mientras se carga la información", async () => {
        (useModal as jest.Mock).mockReturnValue({ animeId: 1, closeModal: jest.fn() });
        (fetchAnimeDetails as jest.Mock).mockResolvedValue(new Promise(() => {}));
        render(<Modal />);
        await waitFor(() => expect(screen.getByTestId("spinner")).toBeInTheDocument());
      });
  
    test("Renderizar información del anime correctamente cuando se carga la información", async () => {
        (useModal as jest.Mock).mockReturnValue({ animeId: 1, closeModal: jest.fn() });
        (fetchAnimeDetails as jest.Mock).mockResolvedValue({
          title: { english: "Test Anime", native: "テストアニメ" },
          bannerImage: "test-banner.jpg",
          description: "Test description",
          episodes: 12,
          meanScore: 85,
          status: "Finished",
          startDate: { month: 1, day: 1, year: 2020 },
          endDate: { month: 12, day: 31, year: 2020 },
          trailer: { site: "youtube", id: "test-trailer" }
        });
        
        render(<Modal />);
        await waitFor(() => expect(screen.getByText("Test Anime")).toBeInTheDocument());
        expect(screen.getByText("Test description")).toBeInTheDocument();
        expect(screen.getByText("Episodes")).toBeInTheDocument();
        expect(screen.getByText("12")).toBeInTheDocument();
        expect(screen.getByText("Average Score")).toBeInTheDocument();
        expect(screen.getByText("85%")).toBeInTheDocument();
      });
  
    test("Cerrar modal al presionar fuera del contenido", async () => {
        const closeModalMock = jest.fn(); 
      
        (useModal as jest.Mock).mockReturnValue({
          animeId: 1,
          closeModal: closeModalMock,
        });
      
        (fetchAnimeDetails as jest.Mock).mockResolvedValue({
          title: { english: "Test Anime", native: "Test Anime Native" },
          bannerImage: "",
          episodes: 12,
          meanScore: 80,
          status: "Finished",
          startDate: { month: 1, day: 1, year: 2020 },
          endDate: { month: 3, day: 1, year: 2020 },
          description: "Test description",
        });
      
        render(<Modal />);
        // screen.debug();
        await waitFor(() => expect(screen.getByTestId("modal-overlay")).toBeInTheDocument());
        const overlay = screen.getByTestId("modal-overlay");
      
        await userEvent.click(overlay);
        expect(closeModalMock).toHaveBeenCalled();
      });

      test("No se debe cerrar el modal al presionar dentro del contenido del modal", async () => {
        const closeModalMock = jest.fn();
      
        (useModal as jest.Mock).mockReturnValue({
          animeId: 1,
          closeModal: closeModalMock,
        });
      
        (fetchAnimeDetails as jest.Mock).mockResolvedValue({
          title: { english: "Test Anime", native: "Test Anime Native" },
          bannerImage: "",
          episodes: 12,
          meanScore: 80,
          status: "Finished",
          startDate: { month: 1, day: 1, year: 2020 },
          endDate: { month: 3, day: 1, year: 2020 },
          description: "Test description",
        });
      
        render(<Modal />);
        await waitFor(() => expect(screen.getByTestId("modal-content")).toBeInTheDocument());
        const modalContent = screen.getByTestId("modal-content");
      
        await userEvent.click(modalContent);
        expect(closeModalMock).not.toHaveBeenCalled();
      });
  

  });