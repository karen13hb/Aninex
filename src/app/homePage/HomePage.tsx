"use client";
import { useState, useCallback, useEffect } from "react";
import Card from "../components/Card/Card";
import { useAnimeList } from "../hooks/useAnimeList";
import { useModal } from "../context/ModalContext";
import { useRouter, useSearchParams } from "next/navigation";
import Filters  from "@/app/models/Filters";
import FormAnimes from "@/app/homePage/FormAnimes";
import Spinner from "../components/Spinner/Spinner";
import Alert from "../components/Alert/Alert";


export default function HomePage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  

  const initialFilters = {
    search: searchParams.get("search") || undefined,
    genre: searchParams.get("genre") || undefined,
    year: searchParams.get("year") ? parseInt(searchParams.get("year")!) : undefined,
    season: (searchParams.get("season") as "WINTER" | "SPRING" | "SUMMER" | "FALL") || undefined,
    status: searchParams.get("status") || undefined,
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const { openModal } = useModal();

  useEffect(() => {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.genre) params.set("genre", filters.genre);
      if (filters.year) params.set("year", filters.year.toString());
      if (filters.season) params.set("season", filters.season);
      if (filters.status) params.set("status", filters.status);
      const queryString = params.toString();
      router.replace(`/?${queryString}`, undefined);
  }, [filters, router]);
  

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);
  
  

  const isFiltering = Boolean(
    filters.search || filters.genre || filters.year || filters.season || filters.status
  );

  const { animes: filteredAnimes, loading: loadingFiltered, error: errorFiltered } =
    useAnimeList({
      type:"season",
      page: 1,
      perPage: 12,
      ...filters,
    });

  const { animes: popularSeason, loading: loadingSeason, error: errorSeason } =
    useAnimeList({
      type: "season",
      page: 1,
      perPage: 6,
    });

  const { animes: popularAllTime, loading: loadingAllTime, error: errorAllTime } =
    useAnimeList({
      type: "allTime",
      page: 1,
      perPage: 6,
    });

  return (
    <>
     <FormAnimes filters={filters} onFilterChange={handleFilterChange} />
      
      <div>
        {isFiltering ? (
          <div>
            <div className="mb-4 flex items-center">
              <span className="mr-2 font-bold text-gray">Results for:</span>
              {filters.search && <span className="mr-2 text-gray">search: {filters.search}</span>}
              {filters.genre && <span className="mr-2 text-gray">| genre: {filters.genre}</span>}
              {filters.year && <span className="mr-2 text-gray">| year: {filters.year}</span>}
              {filters.season && <span className="mr-2 text-gray">| season: {filters.season}</span>}
              {filters.status && <span className="mr-2 text-gray">| status: {filters.status}</span>}
              <button
                className="ml-4 close-button"
                onClick={() => {
                  setFilters({
                    search: "",
                    genre: "",
                    year: undefined,
                    season: undefined,
                    status: "",
                  });
                }}
              >
                X
              </button>
            </div>
            {loadingFiltered && <Spinner />}
            {errorFiltered && <Alert message={errorFiltered} type="warning"/>}
            <div className="anime-list">
              {filteredAnimes.length === 0 && !loadingFiltered ? (
                <p className="text-gray" style={{width:"100%"}}>No Results for your filters</p>
              ) : (
                filteredAnimes.map((anime) => (
                  <Card key={anime.id} anime={anime} onClick={() => openModal(anime.id)} />
                ))
              )}
            </div>
          </div>
        ) : (
          <>
            <h1 className="mb-6">POPULAR THIS SEASON</h1>
            {loadingSeason && <Spinner />}
            {errorSeason && <Alert message={errorSeason} type="warning"/>}
            <div className="anime-list">
              {popularSeason.map((anime) => (
                <Card key={anime.id} anime={anime} onClick={() => openModal(anime.id)} />
              ))}
            </div>
            <h1 className="mb-6">ALL TIME POPULAR</h1>
            {loadingAllTime && <Spinner />}
            {errorAllTime && <Alert message={errorAllTime} type="warning" />}
            <div className="anime-list">
              {popularAllTime.map((anime) => (
                <Card key={anime.id} anime={anime} onClick={() => openModal(anime.id)} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
