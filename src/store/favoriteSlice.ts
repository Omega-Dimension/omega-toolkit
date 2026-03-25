import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* ---------------- Types ---------------- */

export interface FavoriteState {
  items: string[];
}

const FAV_KEY = "favorite-tools";

/* ---------------- Storage Helpers ---------------- */

function saveFavorites(items: string[]) {
  localStorage.setItem(FAV_KEY, JSON.stringify(items));
}

function loadFavorites(): FavoriteState {
  const data = localStorage.getItem(FAV_KEY);

  if (!data) return { items: [] };

  try {
    return { items: JSON.parse(data) };
  } catch {
    localStorage.removeItem(FAV_KEY);
    return { items: [] };
  }
}

/* ---------------- Initial State ---------------- */

const initialState: FavoriteState = loadFavorites();

/* ---------------- Slice ---------------- */

const favoriteSlice = createSlice({
  name: FAV_KEY,
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (state.items.includes(id)) {
        state.items = state.items.filter((item) => item !== id);
      } else {
        state.items.push(id);
      }

      saveFavorites(state.items);
    },

    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        saveFavorites(state.items);
      }
    },

    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
      saveFavorites(state.items);
    },

    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem(FAV_KEY);
    },
  },
});

/* ---------------- Exports ---------------- */

export const { toggleFavorite, addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
