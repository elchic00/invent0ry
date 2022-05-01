import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { sendNotification } from "../../utils/sendNotification";
import { ItemDetailsInputs } from "../../interface/models/itemDetailsInputs";
import { useModal } from "../../context";
import { API } from "../../services/api";
import { Items } from "../../models";
import { useLocations } from "../../hooks/useLocations";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Locations } from "../../models";
import { useItems } from "../../context";
import { useImageUrl } from "../../hooks";
import { ImageOutlined } from "@mui/icons-material";
import box from "../../assets/box.png";

export const UpdateItem = ({
  id,
  name,
  count,
  picture,
  sku,
  price,
  expirationDate,
  locationID,
  flip,
}: {
  id: string;
  name?: string;
  count?: number;
  picture: string;
  price?: number;
  expirationDate?: string;
  sku?: string;
  flip: Function;
  locationID: string;
}) => {
  const [formData, setFormData] = useState<ItemDetailsInputs>({
    itemName: name,
    count,
    picture,
    price,
    expirationDate,
    sku,
  });
  const { setComponent } = useModal();
  const { locations } = useLocations();
  const { listItems } = useItems();
  const { imgUrl, setImgUrl } = useImageUrl(picture);
  const imageKey = useRef<string>(picture);

  function handleChange(e: React.ChangeEvent | SelectChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "count" || name === "price") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleUpdate(e: any) {
    e.preventDefault();
    let data = { ...formData, picture: imageKey.current };
    try {
      const item = (await API.getItemById(id)) as Items;
      const update = await API.updateItem({ original: item, data });
      await listItems();
      setComponent(null);
      flip();

      sendNotification("Item was successfully updated", "success");
    } catch (e) {
      sendNotification("Error trying to call the update item api", "error");
      setComponent(null);
      console.log(e);
    }
  }

  const imageHandler = async (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUrl(reader.result);
      }
    };
    try {
      const result = await API.uploadItemImage({
        file: file,
        fileName: file.name,
      });

      imageKey.current = result.key;

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{height: "100%"}}>
      <form onSubmit={handleUpdate}>
        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%"}}>
          <Box>
            <Box
              sx={{
                p: 1,
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={imgUrl || box}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            <input
              type="file"
              accept="image/*"
              name="image-upload"
              id="input"
              onChange={imageHandler}
            />
          </Box>

          <TextField
            label="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
          />

          <TextField
            type="number"
            label="Count"
            name="count"
            value={formData.count}
            onChange={handleChange}
          />

          {locations ? (
            <FormControl>
              <InputLabel id="location">Location</InputLabel>
              <Select
                name="locationName"
                id="location"
                value={formData.businessId}
                label="Location Name"
                onChange={handleChange}
                defaultValue={locationID}
              >
                {locations.map((location: Locations, i) => (
                  <MenuItem value={location.id} key={location.id}>
                    {`${location.name} - ${location.street}, ${location.town}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Skeleton width="auto" height="40px" />
          )}

          <TextField
            type="number"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {formData.expirationDate && (
            <TextField
              label="Expiration Date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
            />
          )}

          <Button type="submit">Update</Button>
          <Button onClick={() => flip()}>Cancel</Button>
        </FormControl>
      </form>
    </Box>
  );
};
