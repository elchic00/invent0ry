import { FilterItems } from "../interface/models/enums/filterItems";
import { Items } from "../models";
import { API } from "../services/api";
import { useEffect, useState } from "react";
import { useItems } from "../context";

export const useFilterItems = () => {
  const [filteredItems, setFilteredItems] = useState<Items[] | null>(null);
  const [locationFilter, setLocationFilter] = useState("all")
  const [amountFilter, setAmountFilter] = useState(1000)
  const { items } = useItems();

  useEffect(() => {
    filterItems();
  }, [items, locationFilter, amountFilter]);

  async function filterItems() {
    let items = null;
    try {
      if(locationFilter == "all"){
        items = await API.listItemsByItemCount(amountFilter);
      } else {
        items = await API.listItemsFromLocationBelowCount(locationFilter, amountFilter)
      }
      setFilteredItems(items);
    } catch (error) {
      console.log(error);
    }
  }

  return { filteredItems, locationFilter, setLocationFilter, amountFilter, setAmountFilter };
};
