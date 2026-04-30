import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typed dispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

// Typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
