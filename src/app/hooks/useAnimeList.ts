import { useState, useEffect } from "react";
import { Anime } from "../models/Anime";
import { fetchAnimeList } from "../services/AnimeService";
import { AnimeListRequest } from "../models/AnimeListRequest";

interface AnimeListParams extends AnimeListRequest {
  type: "season" | "allTime";
 
}
export function useAnimeList({
  type,
  page = 1,
  perPage = 6,
  search,
  genre,
  season,
  seasonYear,
  status,
}: AnimeListParams) {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAnimes() {
      setLoading(true);
      setError(null);

      const request: AnimeListRequest = {
        page,
        perPage,
        search: search?.trim() || undefined,
        genre: genre?.trim() || undefined,
        season: season || (type === "season" ? "WINTER" : undefined),
        seasonYear: seasonYear || (type === "season" ? 2025 : undefined),
        status: status?.trim() || undefined,
      };

      try {
        const animeData = await fetchAnimeList(type, request);
        if (isMounted) {
          setAnimes(animeData);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Error al cargar animes.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAnimes();

    return () => {
      isMounted = false;
    };
  }, [type, page, perPage, search, genre, season, seasonYear, status]);

  return { animes, loading, error };
}