import { Box, Fab } from "@mui/material";
import { useModal } from "../../context";
import { AddItem } from "../../components/AddItem";
import AddIcon from "@mui/icons-material/Add";
import { useItems } from "../../hooks";
import { Skeleton } from "@mui/material";

export const Inventory = () => {
  const { setComponent } = useModal();
  const { items, getItems } = useItems();

  function handleOpen() {
    setComponent(<AddItem getItems={getItems} />);
  }
  return (
    <Box>
      {items ? (
        items.map((item) => <div>{item.name}</div>)
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
  );
};
