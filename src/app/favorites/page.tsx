"use client";

import Card from "../components/Card/Card";
import { useAppSelector } from "../store/store";
import styles from "./FavoritesPage.module.css";
import { useModal } from "../context/ModalContext";

 function FavoritesPage() {
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const { openModal } = useModal();
  return (
    <>
    <div className={styles.favoritesContainer}>
      {favorites.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        <div className="anime-list">
        {favorites.map((anime) => (
          <Card key={anime.id} anime={anime} onClick={() => openModal(anime.id)} />
        ))}
      </div>
      )}
    </div>

    </>
  );
}
export default  FavoritesPage;