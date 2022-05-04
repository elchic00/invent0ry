import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { API } from "../../services/api";
import React, { useState } from "react";
import { SortBy } from "../../interface/models/enums";
import { useItems } from "../../context";
import { useSearchParams } from "react-router-dom";
import { sortByField } from "@aws-amplify/core";

export const SortByComponent = () => {
  const [value, setValue] = useState<SortBy>(SortBy.FEATURED);
  const { items, setItems } = useItems();
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleChange(e: SelectChangeEvent) {
    const value = e.target.value as SortBy;
    setValue(value);
    setSearchParams({ sort: value });
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sortBy">Sort By</InputLabel>
        <Select
          labelId="sortBy"
          id="sortBy"
          value={value}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value={SortBy.FEATURED}>Featured</MenuItem>
          <MenuItem value={SortBy.NEWEST}>Newest</MenuItem>
          <MenuItem value={SortBy.PRICE_HIGHLOW}>Price: High-Low</MenuItem>
          <MenuItem value={SortBy.PRICE_LOWHIGH}>Price: Low-High</MenuItem>
          <MenuItem value={SortBy.QUANTITY_HIGHLOW}>Quantity: High-Low</MenuItem>
          <MenuItem value={SortBy.QUANTITY_LOWHIGH}>Quantity: Low-High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
