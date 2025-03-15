import { AnimeSummary } from "./AnimeSummary";

export interface Anime extends AnimeSummary {
    title: {
      english: string;
      native: string;
    };
    trailer?: {
      site: string;
      id: string;
    };
    bannerImage?: string;
    episodes?: number;
    isFavourite?: boolean;
    meanScore?: number;
    status?: string;
    description?: string;
    startDate?: {
      day: number;
      month: number;
      year: number;
    };
    endDate?: {
      day: number;
      month: number;
      year: number;
    };
  }