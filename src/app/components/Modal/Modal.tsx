import { useModal } from "@/app/context/ModalContext";
import styles from "./Modal.module.css";
import { useEffect, useState } from "react";
import { fetchAnimeDetails } from "../../services/AnimeService";
import { Anime } from "@/app/models/Anime";
import Spinner from "../Spinner/Spinner";

export default function Modal() {
  const { animeId, closeModal } = useModal();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!animeId) return;

    let isMounted = true;

    const loadAnimeDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchAnimeDetails({ mediaId: animeId });
        if (isMounted) {
          setAnime(data);
        }
      } catch (error) {
        console.error("Error al obtener detalles:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAnimeDetails();

    return () => {
      isMounted = false;
    };
  }, [animeId]);

  if (!animeId) return null;

  return (
    <div className={styles.modalOverlay} data-testid="modal-overlay" onClick={closeModal}>
      <div className={styles.modalContent} data-testid="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          X
        </button>
        {loading && <Spinner/>}
        {anime && (
          <>
            <img
              src={anime.bannerImage || "https://dummyimage.com/600x200/cccccc/000000.png?text=No+Image+Available"}
              alt={anime.title.english || anime.title.native || "Imagen del Anime"}
            />

            <div className={styles.infoAnime}>
              <h2 className={styles.title}>{anime.title.english}</h2>
              <h2 className={`${styles.title} mb-6`}>{anime.title.native}</h2>
              <p
                className="mb-6 text-justify"
                dangerouslySetInnerHTML={{ __html: anime.description || "" }}
              />
              <div className={styles.itemsAnime}>
                <div className={styles.textInf}>
                  <p className={styles.titleInf}>Episodes</p>
                  <p>{anime.episodes || "N/A"}</p>
                </div>
                <div className={styles.textInf}>
                  <p className={styles.titleInf}>Average Score</p>
                  <p>{anime.meanScore}%</p>
                </div>
                <div className={styles.textInf}>
                  <p className={styles.titleInf}>Status</p>
                  <p>{anime.status}</p>
                </div>
                <div className={styles.textInf}>
                  <p className={styles.titleInf}>Start Date</p>
                  <p>
                    {anime.startDate?.month}/{anime.startDate?.day}, {anime.startDate?.year}
                  </p>
                </div>
                <div className={styles.textInf}>
                  <p className={styles.titleInf}>End Date</p>
                  <p>
                    {anime.endDate?.month}/{anime.endDate?.day}, {anime.endDate?.year}
                  </p>
                </div>
              </div>
              {anime.trailer && anime.trailer.site === "youtube" && (
                <div className={styles.videoContainer}>
                  <iframe
                    className="rounded-lg"
                    width="80%"
                    height="315"
                    src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                    title="Trailer de Anime"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
