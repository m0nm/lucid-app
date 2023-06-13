import * as L from "@/constants/local-events";
import { useIsAuth, useUser } from "@/lib/auth";

export const useShouldShowTour = () => {
  const isAuth = useIsAuth();

  const { data: user } = useUser({ enabled: isAuth });

  if (isAuth) {
    if (user && user.__v === 0) return true;
    return false;
  }

  const localItemsExist = Boolean(
    localStorage.getItem(L.NOTE_STORAGE) ||
      localStorage.getItem(L.NOTEBOOK_STORAGE) ||
      localStorage.getItem(L.TAG_STORAGE) ||
      localStorage.getItem(L.TASK_STORAGE)
  );

  if (!isAuth) {
    if (localItemsExist) return false;
    return true;
  }

  return false;
};
