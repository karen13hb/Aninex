import { render, screen } from "@testing-library/react";
import Alert from "../Alert";


describe("Alert Component", () => {
    test("Renderizar la alerta", () => {
      render(<Alert message="Test Alert" type="success" />);
      expect(screen.getByText("Test Alert")).toBeInTheDocument();
    });
    
    test("Aplicar clase correcta para el tipo de alerta", () => {
      render(<Alert message="Success Alert" type="success" />);
      expect(screen.getByText("Success Alert")).toHaveClass("success");
    });    

    test("Muestra el mensaje correcto", () => {
      const testMessage = "This is an important alert"
      render(<Alert message={testMessage} />)
      expect(screen.getByText(testMessage)).toBeInTheDocument()
    })
    
    test("No se renderiza sin mensaje", () => {
      const { container } = render(<Alert />);
      expect(container.firstChild).toBeNull();
    });

  });