import React, { ReactElement, useContext, useState, useEffect } from "react";

type ModalProps = {
  children: JSX.Element;
};

type ModalContextInterface = {
  component: ReactElement | null;
  setComponent: Function;
  open: boolean;
  theme: ModalTheme;
  setTheme: Function;
};

type ModalTheme = {
  width?: string;
  height?: string;
};
const ModalContext = React.createContext<ModalContextInterface>(
  {} as ModalContextInterface
);

export const ModalProvider = ({ children }: ModalProps) => {
  const [component, setComponent] = useState<ReactElement | null>(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ModalTheme>({
    width: "auto",
    height: "auto",
  });

  useEffect(() => {
    setOpen(true);
  }, [component]);

  return (
    <ModalContext.Provider
      value={{ component, setComponent, open, theme, setTheme }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
