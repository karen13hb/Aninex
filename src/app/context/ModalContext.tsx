"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "../components/Modal/Modal";

interface ModalContextType {
    animeId: number | null;
  openModal: (animeId: number) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [animeId, setAnimeId] = useState<number | null>(null);

    const openModal = (id: number) => {
        setAnimeId(id);
        // console.log("Modal abierto con ID:", id);
    };
    const closeModal = () => setAnimeId(null);
  
  return (
    <ModalContext.Provider value={{ animeId, openModal, closeModal }}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }
  return context;
}
