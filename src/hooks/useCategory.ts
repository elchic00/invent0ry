import { useState, useEffect } from "react";
import { Categories } from "../models";
import { API } from "../services/api";

export const useCategory = () => {
  const [categories, setCategories] = useState<Categories[] | null>(null);

  useEffect(() => {
    listCategories();
  }, []);

  async function listCategories() {
    try {
      const result = await API.listCategories();
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  }

  return { categories };
};
