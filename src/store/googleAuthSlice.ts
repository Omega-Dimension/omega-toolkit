import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* ---------------- Types ---------------- */

interface GoogleAuthState {
  accessToken: string | null;
}

const GOOGLE_KEY = "google-auth";

/* ---------------- Storage Helpers ---------------- */

function saveToken(token: string | null) {
  if (token) {
    localStorage.setItem(GOOGLE_KEY, token);
  } else {
    localStorage.removeItem(GOOGLE_KEY);
  }
}

function loadToken(): GoogleAuthState {
  const token = localStorage.getItem(GOOGLE_KEY);
  return { accessToken: token };
}

/* ---------------- Initial State ---------------- */

const initialState: GoogleAuthState = loadToken();

/* ---------------- Slice ---------------- */

const googleAuthSlice = createSlice({
  name: GOOGLE_KEY,
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      saveToken(action.payload);
    },
    clearToken: (state) => {
      state.accessToken = null;
      saveToken(null);
    },
  },
});

/* ---------------- Exports ---------------- */

export const { setToken, clearToken } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;