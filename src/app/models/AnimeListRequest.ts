export interface AnimeListRequest {
    page?: number;
    perPage?: number;
    search?: string;
    genre?: string;
    season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
    seasonYear?: number;
    status?: string;
  }
  