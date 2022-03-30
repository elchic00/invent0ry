import { Box, Button, FormControl, TextField } from "@mui/material";
import { StringifyOptions } from "querystring";
import React, { useState } from "react";
import { sendNotification } from "../../utils/sendNotification";
import { ItemDetailsInputs } from "../../interface/models/itemDetailsInputs";
import { useModal } from "../../context";
import { API } from "../../services/api";
import { Items } from "../../models";
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

  function handleChange(e: React.ChangeEvent) {
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
        <FormControl
          //onSubmit={handleUpdate}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* {[key in keyof formData]: <TextField>
          }
        })} */}
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
