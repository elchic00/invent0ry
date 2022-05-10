import { FilterItems } from "../interface/models/enums/filterItems";
import { Items } from "../models";
import { API } from "../services/api";
import { useEffect, useState } from "react";
import { useItems } from "../context";

export const useFilterItems = (filter: FilterItems) => {
  const [filteredItems, setFilteredItems] = useState<Items[] | null>(null);
  const { items } = useItems();

  useEffect(() => {
    filterItems();
  }, [items]);

  async function filterItems() {
    let items = null;
    try {
      switch (filter) {
        case FilterItems.STOCK:
          items = await API.listItemsByItemCount(1);
          break;
        default:
          return;
      }
      setFilteredItems(items);
    } catch (error) {
      console.log(error);
    }
  }

  return { filteredItems };
};
