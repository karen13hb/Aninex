import { Anime } from "./Anime";

export interface AnimeListResponse {
    Page: {
      media: Anime[];
    };
  }