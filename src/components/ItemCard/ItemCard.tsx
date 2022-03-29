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
import {sendNotification} from "../../utils/sendNotification";

type ItemCardProps = {
  name?: string;
  itemCount?: number;
  picture?: string;
  expire?: string;
  price?: number;
};

export const ItemCardComponent = ({
  name,
  itemCount,
  picture,
  expire,
  price,
}: ItemCardProps) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  async function handleUpdate(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsDisabled(true);
    try {
      //const result = await API.updateItem();
      setIsDisabled(false);
    } catch(e) {
      sendNotification( "Error trying to call the update item api",
      "error");
      setIsDisabled(false);
    }
  }
  
  async function handleDelete(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      //const result = await API.deleteItem();
      sendNotification( "Item was successfully deleted",
      "success");
    } catch(e) {
      sendNotification( "Error trying to call the delete item api",
      "error");
    }
  }

  return (
    <Card sx={{ width: { xs: "auto", sm: "300px" }, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
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
        {/* TODO:
          1. Button to update
          */
            <Button disabled={isDisabled} onClick={handleUpdate}>Update</Button>
         /* 
          2. Button to delete
          */}
            <Button onClick={handleDelete}>Delete</Button>
        <IconButton></IconButton>
      </CardActions>
    </Card>
  );
};
