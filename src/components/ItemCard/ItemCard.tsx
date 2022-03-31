import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { API } from "../../services/api";
import { sendNotification } from "../../utils/sendNotification";
import { UpdateItem } from "../UpdateItem";
import { useModal } from "../../context/ModalContext";
import { Items } from "../../models";

type ItemCardProps = {
  name?: string;
  itemCount?: number;
  picture?: string;
  expire?: string;
  price?: number;
  id: string;
  getItems: Function;
};

export const ItemCardComponent = ({
  name,
  itemCount,
  picture,
  expire,
  price,
  id,
  getItems,
}: ItemCardProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { setComponent, setTheme } = useModal();

  //TODO: have popup modal call this function if agree to delete item
  async function handleDelete(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const item = (await API.getItemById(id)) as Items;
      const result = await API.deleteItem(item);
      await getItems();
      sendNotification("Item was successfully deleted", "success");
    } catch (e) {
      sendNotification("Error trying to call the delete item api", "error");
    }
  }

  function openUpdate(id: string) {
    setTheme({ height: "auto", width: "auto" });
    setComponent(
      <UpdateItem
        id={id}
        name={name}
        count={itemCount}
        price={price}
        picture={picture}
        expirationDate={expire}
        getItems={getItems}
      />
    );
  }

  return (
    <Card sx={{ width: { xs: "auto", sm: "300px" }, borderRadius: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {/* 
            // display: box 
            // display: inline - <span> 
            */}

          <Typography variant="h5" sx={{ fontWeight: 100 }}>
            Name: {name}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 100 }}>
            Quantity: {itemCount}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 100 }}>
            Price: {price}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button disabled={isDisabled} onClick={() => openUpdate(id)}>
          Update
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
        <IconButton></IconButton>
      </CardActions>
    </Card>
  );
};
