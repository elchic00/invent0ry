import { Box, Button, FormControl, TextField } from "@mui/material";
import { StringifyOptions } from "querystring";
import React, { useState } from "react";
import { sendNotification } from "../../utils/sendNotification";
import { ItemDetailsInputs } from "../../interface/models/itemDetailsInputs";
import { useModal } from "../../context";
export const UpdateItem = ({
  id,
  name,
  count,
  picture,
  sku,
  price,
  expirationDate,
}: {
  id: string;
  name?: string;
  count?: number;
  picture?: string;
  price?: number;
  expirationDate?: string;
  sku?: string;
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

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdate(e: any) {
    e.preventDefault();

    try {
      //const result = await API.updateItem();
    } catch (e) {
      sendNotification("Error trying to call the update item api", "error");
      setComponent(null);
    }
  }
  return (
    <Box sx={{ p: 2 }}>
      <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

        <Button>Update</Button>
      </FormControl>
    </Box>
  );
};
