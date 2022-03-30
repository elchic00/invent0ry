import { useEffect, useState } from "react";
import { API } from "../services/api";
import { sendNotification } from "../utils/sendNotification";
import { Items } from "../models";

export const useItems = () => {
  const [items, setItems] = useState<Items[] | null>(null);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const result = await API.getItems();
      setItems(result);
      console.log(result);
    } catch (error) {
      console.log(error);
      sendNotification("Error trying to get items", "error");
    }
  }
  return { items, getItems };
};
