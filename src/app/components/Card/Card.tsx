import styles from "@/app/components/Card/Card.module.css"; 
import { memo, useCallback } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { addFavorite, removeFavorite } from "@/app/store/reducers/favoriteReducer";
import { Anime } from "@/app/models/Anime";

interface AnimeProps {
    anime:Anime;
    onClick: () => void;
  }

function Card({ anime,onClick }:AnimeProps) {

    const dispatch = useAppDispatch(); 
    const favorites = useAppSelector((state) => state.favorites.favorites);

    const isFavorite = favorites.some((fav) => fav.id === anime.id);

    const handleFavorite = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (isFavorite) {
          dispatch(removeFavorite(anime.id));
        } else {
          dispatch(addFavorite(anime));
        }
      },
      [dispatch, anime, isFavorite]
    );
  
    return (
      <div className={styles.animeCard} onClick={onClick}>
        <img src={anime.coverImage.extraLarge} 
        alt={anime.title.english} 
        className={styles.imageShadow}
        style={{ boxShadow: `1px 10px 15px ${anime.coverImage.color || "#00DECC"}` }} />
        <div className={styles.infoCard}>
        <h3 className={styles.cardTitle}>{anime.title.english || anime.title.native}</h3>

        <button onClick={handleFavorite} className={styles.customButton}>
        {isFavorite ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart color="red" size={24} />}
        </button>
        </div>
        
      </div>
    );
  }
  export default memo(Card);