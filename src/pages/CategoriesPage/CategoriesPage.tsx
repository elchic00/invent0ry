import { CircularProgress, Typography } from "@mui/material";
import { useCategory } from "../../hooks";
import { CategoryFields } from "./CategoryFields";

export const CategoriesPage = () => {
  const { categories, listCategories } = useCategory();

  if (categories)
    return (
      <CategoryFields categories={categories} listCategories={listCategories} />
    );

  return <CircularProgress />;
};
