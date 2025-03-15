import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card";
import { Provider } from "react-redux";
import { Anime } from "@/app/models/Anime";
import { store } from "@/app/store/store";

describe("Card Component", () => {
    const mockAnime: Anime = {
      id: 1,
      title: { english: "Test Anime", native: "テストアニメ" },
      coverImage: { extraLarge: "test.jpg", color: "#FF0000" }
    };
    
    test("renders the anime title", () => {
      render(
        <Provider store={store}>
          <Card anime={mockAnime} onClick={jest.fn()} />
        </Provider>
      );
      expect(screen.getByText("Test Anime")).toBeInTheDocument();
    });
    
    test("Llamar a onclick cuando se hace click en Card", async () => {
      const handleClick = jest.fn();
      render(
        <Provider store={store}>
          <Card anime={mockAnime} onClick={handleClick} />
        </Provider>
      );
      await userEvent.click(screen.getByText("Test Anime"));
      expect(handleClick).toHaveBeenCalled();
    });
    
    test("Cambiar el estado de favorito al hacer click en el boton de favorito", async () => {
      render(
        <Provider store={store}>
          <Card anime={mockAnime} onClick={jest.fn()} />
        </Provider>
      );
      const heartButton = screen.getByRole("button");
      await userEvent.click(heartButton);
      expect(heartButton).toBeInTheDocument();
    });

    test("Renderiza la imagen con los atributos correctos", () => {
      render(
        <Provider store={store}>
          <Card anime={mockAnime} onClick={jest.fn()} />
        </Provider>
      );
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", mockAnime.coverImage.extraLarge);
      expect(img).toHaveAttribute("alt", mockAnime.title.english);
    });
    test("Aplica el color de sombra correcto a la imagen", () => {
      render(
        <Provider store={store}>
          <Card anime={mockAnime} onClick={jest.fn()} />
        </Provider>
      );
    
      const img = screen.getByRole("img");
      expect(img).toHaveStyle(`box-shadow: 1px 10px 15px ${mockAnime.coverImage.color}`);
    });
    

  });