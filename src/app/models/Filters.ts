export default interface Filters {
    search?: string;
    genre?: string;
    year?: number;
    season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
    status?: string;
}
