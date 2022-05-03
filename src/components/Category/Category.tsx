import { Box, Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { CategoryType } from "../../interface/models/categoryType";
import { API } from "../../services/api";

export const CategoryComponent = ({
  categoryInput,
}: {
  categoryInput?: CategoryType;
}) => {
  const [value, setValue] = useState<string>(categoryInput!.name || "");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function handleAdd(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      await API.addCategory({ name: value });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      await API.updateCategory({ id: categoryInput!.id, name: value });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      component="form"
      sx={{ display: "flex", gap: 2, alignItems: "center" }}
    >
      <TextField value={value} onChange={handleChange} variant="standard" />

      {categoryInput != null ? (
        <Button onClick={handleSave}>Save</Button>
      ) : (
        <Button onClick={handleAdd}>Add</Button>
      )}
    </Box>
  );
};
