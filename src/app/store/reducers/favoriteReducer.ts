
import { Anime } from "@/app/models/Anime";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FavoriteState {
  favorites: Anime[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Anime>) {
      if (!state.favorites.some((anime) => anime.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter((anime) => anime.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
