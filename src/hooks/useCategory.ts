import { useState, useEffect } from "react";
//import { Category } from "../models";
import { API } from "../services/api";

export const useCategory = () => {
  //const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    listCategories();
  }, []);

  async function listCategories() {
    try {
      // const result = await API.listCategories();
      //setCategories(result);
    } catch (error) {
      console.log(error);
    }
  }

  // return { categories };
};
