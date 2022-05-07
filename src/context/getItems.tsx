import React, { useEffect, useState, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SortBy } from "../interface/models/enums/sortBy";
import { Items } from "../models";
import { API } from "../services/api";
import { sendNotification } from "../utils/sendNotification";

type ItemsContextInterface = {
  items: Items[] | null;

  setItems: Function;
  listItems: Function;
};

const ItemsContext = React.createContext<ItemsContextInterface>(
  {} as ItemsContextInterface
);

export const ItemsProvider = ({ children }: { children: JSX.Element }) => {
  const [items, setItems] = useState<Items[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  // to avoid rerender useEffect every  time ItemsProvider is triggered
  const catchedSort = useMemo(() => sort, [sort]) as SortBy;

  useEffect(() => {
    listItems();
  }, [catchedSort]);

  async function listItems() {
    let sortedItems = items !== null ? [...items] : null;
    // to sort items based on a query string
    try {
      switch (catchedSort) {
        case SortBy.HIGHLOW:
          sortedItems = await API.listItemsByHighestToLowest();
          break;
        case SortBy.LOWHIGH:
          sortedItems = await API.listItemsByLowestToHighest();
          break;
        case SortBy.NEWEST:
          sortedItems = await API.listItemsByNewest();
          break;
        default:
          // To delete the previous query string
          searchParams.delete("sort");

          setSearchParams(searchParams);
          sortedItems = await API.listItems();

          break;
      }

      setItems(sortedItems);
    } catch (e) {
      console.log(e);
      sendNotification("Error trying to get items", "error");
    }
  }

  return (
    <ItemsContext.Provider value={{ items, setItems, listItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemsContext);
};
