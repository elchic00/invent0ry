import {
  Box,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useModal } from "../../context";
import { AddItem } from "../../components/AddItem";
import AddIcon from "@mui/icons-material/Add";
import { useItems } from "../../context";
import { Skeleton } from "@mui/material";
import FlipCard from "../../components/FlipCard/FlipCard";
import { useEffect, useState } from "react";
import { SortByComponent } from "../../components/SortBy/SortBy";

export const Inventory = () => {
  const { setComponent, setTheme } = useModal();
  const { items, listItems } = useItems();

  function handleOpen() {
    setTheme({ height: "400px", width: "auto" });
    setComponent(<AddItem />);
  }

  useEffect(() => {
    listItems();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //maxWidth: "1200px",
          mb: 3,
          mr: 6,
        }}
      >
        <Typography mb={2} variant="h3">
          Items
        </Typography>

        <SortByComponent />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {items ? (
          items.map((item) => (
            <FlipCard
              key={item.id}
              name={item.name}
              categoryId={item.categoryId}
              itemCount={item.itemCount}
              picture={item.picture || ""}
              expire={item.expire}
              price={item.price}
              id={item.id}
              locationID={item.locationsID}
            />
          ))
        ) : (
          <Skeleton variant="rectangular" width={500} height={118} />
        )}
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 20, right: 30 }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};
