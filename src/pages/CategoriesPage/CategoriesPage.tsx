import { Box, Typography } from "@mui/material";
import { CategoryComponent } from "../../components/Category/Category";
import { useCategory } from "../../hooks";
import { useState } from "react";

export const CategoriesPage = () => {
  // const { categories } = useCategory();
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Box>
      <Box>
        <Typography variant="h3">Add Category</Typography>
        <Box>
          <CategoryComponent />
        </Box>
      </Box>
    </Box>
  );
};
