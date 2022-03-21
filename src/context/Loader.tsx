import React, { useState, useContext } from "react";

type LoaderContextInterface = {
  loading: boolean;
  setLoading: Function;
};
const LoaderContext = React.createContext<LoaderContextInterface>(
  {} as LoaderContextInterface
);

export const LoaderProvider = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
