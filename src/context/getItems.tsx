import React, { useEffect, useState, useContext } from "react";
import { Items } from "../models";
import { API } from "../services/api";
import { sendNotification } from "../utils/sendNotification";

type ItemsContextInterface = {
  items: Items[] | null;
  listItems: Function;
};

const ItemsContext = React.createContext<ItemsContextInterface>(
  {} as ItemsContextInterface
);

export const ItemsProvider = ({ children }: { children: JSX.Element }) => {
  const [items, setItems] = useState<Items[] | null>(null);

  useEffect(() => {
    listItems();
  }, []);

  async function listItems() {
    try {
      const result = await API.listItems();
      console.log(result);
      setItems(result);
    } catch (error) {
      console.log(error);
      sendNotification("Error trying to get items", "error");
    }
  }
  return (
    <ItemsContext.Provider value={{ listItems, items }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
