import { useCallback } from "react";
import { Box, Stack, Divider, Typography } from "@mui/material";
import { useLocations } from "../../hooks/useLocations";
import { useItems } from "../../context";
import { useCount } from "../../hooks/useCount";

const SummaryStack = () => {
  const { locations } = useLocations();
  const { items } = useItems();
  const { count } = useCount();

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 1, sm: 1, md: 2 }}
        mb={3}
      >
        <Typography variant="h5">{`Total Locations: ${
          locations !== null ? locations.length : 0
        }`}</Typography>
        <Typography variant="h5">{`Total Kinds of Products: ${
          items !== null ? items.length : 0
        }`}</Typography>
        <Typography variant="h5">{`Total Quantity: ${count.quantity}`}</Typography>
        <Typography variant="h5">{`Total Assets: $${count.assets}`}</Typography>
      </Stack>
    </Box>
  );
};

export default SummaryStack;
