import { Anime } from "./Anime";

export interface AnimeDetailsResponse {
    Page: {
      media: Anime[];
    };
}