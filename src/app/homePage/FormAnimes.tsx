import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import Filters  from "@/app/models/Filters";
import { fetchGenres } from "../services/AnimeService";

interface FormAnimesProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function FormAnimes({ filters, onFilterChange }: FormAnimesProps) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    fetchGenres()
      .then(setGenres)
      .catch((error) => console.error("Error obteniendo géneros:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters: Filters = {
      ...filters,
      [name]: name === "year" ? (Number(value) || undefined) : value,
    };
    onFilterChange(updatedFilters);
  };

  return (
    <div className="mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        <div className="col-span-1 md:col-span-3 lg:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Escribe aquí..."
              value={filters.search ?? ""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="genre">Genres</label>
          <select
            id="genre"
            name="genre"
            value={filters.genre ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">--- select ---</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="year">Year</label>
          <select
            name="year"
            id="year"
            value={filters.year ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">--- select ---</option>
            {[2021, 2022, 2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="status">Airing Status</label>
          <select
            name="status"
            id="status"
            value={filters.status ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">--- select ---</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="FINISHED">FINISHED</option>
            <option value="HIATUS">HIATUS</option>
            <option value="NOT_YET_RELEASED">NOT_YET_RELEASED</option>
            <option value="RELEASING">RELEASING</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="season">Season</label>
          <select
            name="season"
            id="season"
            value={filters.season ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">--- select ---</option>
            <option value="FALL">FALL</option>
            <option value="SPRING">SPRING</option>
            <option value="SUMMER">SUMMER</option>
            <option value="WINTER">WINTER</option>
          </select>
        </div>
      </div>
    </div>
  );
}
