import { useEffect, useState } from "react";
import { API } from "../services/api";
import { useLoader } from "../context";
import { sendNotification } from "../utils/sendNotification";
export const useItems = () => {
  const [items, setItems] = useState<any>();
  const { setLoading } = useLoader();
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      setLoading(true);
      const result = await API.getItems();
      setItems(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      sendNotification("Error trying to get items", "error");
    }
  }
  return { items, setItems };
};
