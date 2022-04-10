import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { StringifyOptions } from "querystring";
import React, { useState } from "react";
import { sendNotification } from "../../utils/sendNotification";
import { ItemDetailsInputs } from "../../interface/models/itemDetailsInputs";
import { useModal } from "../../context";
import { API } from "../../services/api";
import { Items } from "../../models";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Switch from "@mui/material/Switch";
import { useLocations } from "../../hooks/useLocations";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Locations } from "../../models";

export const UpdateItem = ({
  id,
  name,
  count,
  picture,
  sku,
  price,
  expirationDate,
  getItems,
}: {
  id: string;
  name?: string;
  count?: number;
  picture?: string;
  price?: number;
  expirationDate?: string;
  sku?: string;
  getItems: Function;
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
  function handleChange(e: React.ChangeEvent | SelectChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "count" || name === "price") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleUpdate(e: any) {
    console.log("update");
    e.preventDefault();
    console.log(typeof formData.count);
    try {
      const item = (await API.getItemById(id)) as Items;
      const update = await API.updateItem({ original: item, data: formData });
      await getItems();
      setComponent(null);
      console.log(update);
    } catch (e) {
      sendNotification("Error trying to call the update item api", "error");
      setComponent(null);
      console.log(e);
    }
  }
  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={handleUpdate}>
        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Item Name"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            defaultValue={formData.itemName}
          />

          <TextField
            type="number"
            label="Count"
            name="count"
            value={formData.count}
            onChange={handleChange}
            defaultValue={formData.count}
          />

          {locations ? (
            <FormControl>
              <InputLabel id="location">Location</InputLabel>
              <Select
                name="locationName"
                id="location"
                value={formData.businessName}
                label="Location Name"
                onChange={handleChange}
              >
                {locations.map((location: Locations) => (
                  <MenuItem value={location.id}>
                    {`${location.name} - ${location.street}, ${location.town}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Skeleton width="auto" height="40px" />
          )}
          <TextField
            label="Picture"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            defaultValue={formData.picture}
          />
          <TextField
            type="number"
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            defaultValue={formData.price}
          />
          {formData.expirationDate && (
            <TextField
              label="Expiration Date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              defaultValue={formData.expirationDate}
            />
          )}

          <Button type="submit">Update</Button>
        </FormControl>
      </form>
    </Box>
  );
};
