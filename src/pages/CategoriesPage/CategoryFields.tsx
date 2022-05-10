import { Box, IconButton, Typography } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Category } from "../../models";

import { CategoryForm } from "../../components/CategoryForm/CategoryForm";
import { useOpen } from "../../hooks";

export const CategoryFields = ({
  categories,
  listCategories,
}: {
  categories: Category[];
  listCategories: Function;
}) => {
  const { open, handleOpen } = useOpen();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Categories</Typography>
      <Box>
        {categories!.length === 0 ? (
          <Typography>Add a category here </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "start",
            }}
          >
            {categories!.map((category) => (
            //   <FormFieldItem
            //     name={category.name}
            //     key={category.id}
            //     id={category.id}
            //     listFields={listCategories}
            //   >
            //     {({ handleOpen }) => (
            //       <CategoryForm
            //         categoryField={category.name}
            //         handleOpen={handleOpen}
            //         listCategories={listCategories}
            //       />
            //     )}
            //   </FormFieldItem>
            ))}
          </Box>
        )}

        <Box>
          {open ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              <CategoryForm
                handleOpen={handleOpen}
                listCategories={listCategories}
              />
              <IconButton onClick={() => handleOpen()}>
                <CloseIcon />
              </IconButton>{" "}
            </Box>
          ) : (
            <IconButton onClick={() => handleOpen()}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
