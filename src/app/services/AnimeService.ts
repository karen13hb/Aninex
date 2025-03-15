import { Anime } from "../models/Anime";

import { AnimeDetailsResponse } from "../models/AnimeDetailsResponse";
import { AnimeListRequest } from "../models/AnimeListRequest";
import { AnimeListResponse } from "../models/AnimeListResponse";
import { AnimeDetailsRequest } from "../models/AnimeDetailsRequest";

const API_URL = "https://graphql.anilist.co";
interface GraphQLResponse<T> {
  data: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
}

// Función base para hacer consultas

export const fetchGraphQL = async <T>(
  query: string,
  variables: object = {}
): Promise<T> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const result: GraphQLResponse<T> = await response.json();
  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
    throw new Error("Error en la consulta GraphQL");
  }

  return result.data;
};
export const fetchAnimeList = async (
  type: "season" | "allTime",
  request: AnimeListRequest = {}
): Promise<Anime[]> => {
  const {
    page = 1,
    perPage = 10,
    search,
    genre,
    season,
    seasonYear,
    status,
  } = request;

  const query = `
    query ($page: Int, $perPage: Int, $search: String, $genre: String, $season: MediaSeason, $seasonYear: Int, $status: MediaStatus) {
      Page(page: $page, perPage: $perPage) {
        media(
          sort: POPULARITY_DESC,
          search: $search,
          genre: $genre,
          season: $season,
          seasonYear: $seasonYear,
          status: $status
        ) {
          id
          title {
            english
            native
          }
          coverImage {
            extraLarge
            color
          }
        }
      }
    }
  `;

  // Asigna valores predeterminados según el tipo
  const variables = {
    page,
    perPage,
    search: search?.trim() || undefined,
    genre: genre?.trim() || undefined,
    season: season?.trim() || (type === "season" ? "WINTER" : undefined),
    seasonYear: seasonYear || (type === "season" ? 2025 : undefined),
    status: status?.trim() || undefined,
  };

  const data = await fetchGraphQL<AnimeListResponse>(query, variables);
  return data.Page.media;
};

  
export const fetchAnimeDetails = async (
  request: AnimeDetailsRequest
): Promise<Anime> => {
  const query = `
    query ($mediaId: Int) {
      Page {
        media(id: $mediaId) {
          id
          bannerImage
          title {
            english
            native
          }
          endDate {
            day
            month
            year
          }
          startDate {
            day
            month
            year
          }
          description
          episodes
          trailer {
            id
            site
          }
          meanScore
          status
        }
      }
    }
  `;

  const data = await fetchGraphQL<AnimeDetailsResponse>(query, { mediaId: request.mediaId });
  return data.Page.media[0];
};

export const fetchGenres = async (): Promise<string[]> => {
  const query = `query { GenreCollection }`;
  const data = await fetchGraphQL<{ GenreCollection: string[] }>(query);
  return data.GenreCollection;
};