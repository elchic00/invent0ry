import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Button,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import React, { useState } from "react";
import { API } from "../../services/api";
import { sendNotification } from "../../utils/sendNotification";
import { UpdateItem } from "../UpdateItem";
import { useModal } from "../../context/ModalContext";
import { Items } from "../../models";
import potatoes from "../../assets/potatoe.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import '../../index.css';

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

  function handleDeleteConfirmation(e: React.SyntheticEvent) {
    Swal.fire({
      title: `Delete ${name} from your inventory?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete this item',
      backdrop: 'confirmationPopupStyle',
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(e);
      }
      else {
        Swal.fire('Cancelled!', `${name} remains in the inventory`, 'info');
      }
    })
  }

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

  function openUpdate() {
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
      <CardActionArea>
        <CardMedia component="img" height="140" image={potatoes} alt={name} />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>
              {name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 100,
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              {" "}
              Quantity:
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1.2rem", fontWeight: 100 }}
              >
                {itemCount}
              </Typography>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 100,
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              {" "}
              Price:
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1.2rem", fontWeight: 100 }}
              >
                $ {price}
              </Typography>
            </Typography>
            {expire && (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 100,
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {" "}
                Expire:
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "1.2rem", fontWeight: 100 }}
                >
                  {expire}
                </Typography>
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton onClick={openUpdate}>
          {" "}
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteConfirmation}>
          <DeleteIcon />{" "}
        </IconButton>
      </CardActions>
    </Card>
  );
};
