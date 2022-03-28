import {
  FormControl,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { currencies } from "../../constants/currencies";
import React from "react";
import { businessType } from "../../interface/models/businessType";
import {API} from "../../services/api";
import { sendNotification } from "../../utils/sendNotification";

export const BusinessSpecifics = () => {
  const [formData, setFormData] = useState<businessType>({
    name: "",
    location_name: "",
    currency: "USD",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const currencyList = Object.keys(currencies).map((key) => (
    <MenuItem value={key}>{key}</MenuItem>
  ));

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const result = await API.businessSpecifics(formData);

      setIsDisabled(false);
    } catch (error) {
      sendNotification(
        "Error trying to call the business specifics api",
        "error"
      );
      setIsDisabled(false);
    }
  }

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <FormControl>
      <TextField
        id="standard-basic"
        variant="standard"
        sx={{ mb: 2 }}
        name="name"
        label="Business Name"
        helperText="Name of your business"
        onChange={handleChange}
        value={formData.name}
      />
      <TextField
        name="location_name"
        id="standard-basic"
        variant="standard"
        sx={{ mb: 2 }}
        label="Location Name"
        helperText="add your business address nickname, H.Q., main, etc"
        onChange={handleChange}
        value={formData.location_name}
      />
      <TextField
        sx={{ mb: 4 }}
        select
        label="Currency"
        name="currency"
        value={formData.currency}
        onChange={handleChange}
      >
        {currencyList}
      </TextField>
      <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
        submit
      </Button>
    </FormControl>
  );
};
