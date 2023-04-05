import { createContext, useContext } from "react";

type LoadingContextType = {
  loadingCarts: boolean;
  loadingAddCart: boolean;
  loadingDeleteCart: {
    [id: number]: boolean;
  };
};

export const LoadingContext = createContext<LoadingContextType>({
  loadingCarts: false,
  loadingAddCart: false,
  loadingDeleteCart: {},
});

export const useLoadingContext = () => useContext(LoadingContext);
