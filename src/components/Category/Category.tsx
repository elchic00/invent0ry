import { Box, TextField } from "@mui/material";
import { useState } from "react";

export const CategoryComponent = () => {
  const [value, setValue] = useState<string>();

  return (
    <Box component="form">
      <TextField value={value} />
    </Box>
  );
};
