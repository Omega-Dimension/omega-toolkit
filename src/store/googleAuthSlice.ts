import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* ---------------- Types ---------------- */
interface UserInfo {
  email: string | null;
}

interface GoogleAuthState {
  accessToken: string | null;
  user: UserInfo | null; // Added user object
}

const TOKEN_KEY = "google-access-token";
const USER_KEY = "google-user-info";

/* ---------------- Storage Helpers ---------------- */

function loadInitialState(): GoogleAuthState {
  const token = localStorage.getItem(TOKEN_KEY);
  const userJson = localStorage.getItem(USER_KEY);
  return {
    accessToken: token,
    user: userJson ? JSON.parse(userJson) : null,
  };
}

/* ---------------- Slice ---------------- */

const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState: loadInitialState(),
  reducers: {
    // Modified to accept both token and user info
    setAuthData: (
      state,
      action: PayloadAction<{ token: string; email: string | null }>,
    ) => {
      state.accessToken = action.payload.token;
      state.user = { email: action.payload.email };

      localStorage.setItem(TOKEN_KEY, action.payload.token);
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});

export const { setAuthData, clearAuth } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;
