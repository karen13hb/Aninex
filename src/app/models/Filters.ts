export default interface Filters {
    search?: string;
    genre?: string;
    seasonYear?: number;
    season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
    status?: string;
}
