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
  Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { API } from "../../services/api";
import { sendNotification } from "../../utils/sendNotification";
import { UpdateItem } from "../UpdateItem";
import { useModal } from "../../context/ModalContext";
import { Items } from "../../models";
import potatoes from "../../assets/potatoe.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { useItems } from "../../context";
import "../../index.css";

type ItemCardProps = {
  name?: string;
  itemCount?: number;
  picture: string;
  expire?: string;
  price?: number;
  id: string;

  flip: Function;
};

export const ItemCardComponent = ({
  name,
  itemCount,
  picture,
  expire,
  price,
  id,
  flip,
}: ItemCardProps) => {
  const { setComponent, setTheme } = useModal();
  const { listItems } = useItems();
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  function handleDeleteConfirmation(e: React.SyntheticEvent) {
    Swal.fire({
      title: `Delete ${name} from your inventory?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this item",
      backdrop: "confirmationPopupStyle",
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(e);
      } else {
        Swal.fire("Cancelled!", `${name} remains in the inventory`, "info");
      }
    });
  }

  async function handleDelete(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const item = (await API.getItemById(id)) as Items;
      await Promise.all([
        API.removeItemImage(item.picture!),
        API.deleteItem(item),
      ]);
      await listItems();
      sendNotification("Item was successfully deleted", "success");
    } catch (e) {
      console.log(e);
      sendNotification("Error trying to call the delete item api", "error");
    }
  }

  function openUpdate() {
    flip();
    // setTheme({ height: "auto", width: "auto" });
    // setComponent(
    //   <UpdateItem
    //     id={id}
    //     name={name}
    //     count={itemCount}
    //     price={price}
    //     picture={picture}
    //     expirationDate={expire}
    //     getItems={getItems}
    //   />
    // );
  }

  async function getImageLink() {
    try {
      const result = await API.getItemImage(picture);
      setImgUrl(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImageLink();
  }, []);

  return (
    <Card sx={{ width: { xs: "auto", sm: "300px" }, borderRadius: 2 }}>
      <CardActionArea>
        {imgUrl === null ? (
          <Skeleton width="100%" height="160px" />
        ) : (
          <CardMedia component="img" height="160" src={imgUrl!} alt={name} />
        )}

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
