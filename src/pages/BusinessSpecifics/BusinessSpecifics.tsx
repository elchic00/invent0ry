import {
  FormControl,
  TextField,
  Button,
  MenuItem,
  Skeleton,
  Select,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { currencies } from "../../constants/currencies";
import React from "react";
import { businessType } from "../../interface/models/businessType";
import { API } from "../../services/api";
import { sendNotification } from "../../utils/sendNotification";
import { Controller } from "react-hook-form";
import { Locations } from "../../models";
import { useLocations } from "../../hooks/useLocations";

export const BusinessSpecifics = () => {
  const [formData, setFormData] = useState<businessType>({
    name: "",
    businessLocationsId: "",
    currency: "USD",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { locations } = useLocations();

  const locSelect = locations ? (
    locations.map((location) => (
      <MenuItem value={location.id}>
        {`${location.name} - ${location.street}, ${location.town}`}
      </MenuItem>
    ))
  ) : (
    <Skeleton width="500px" height="200px" />
  );

  const currencyList = Object.keys(currencies).map((key) => (
    <MenuItem value={key}>{key}</MenuItem>
  ));

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const result = await API.addBusinessSpecifics(formData);
      setIsDisabled(false);
      sendNotification("Business was successfully added", "success");
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
        sx={{ mb: 3 }}
        name="name"
        label="Business Name"
        helperText="Name of your business"
        onChange={handleChange}
        value={formData.name}
      />

      <TextField
        sx={{ mb: 4 }}
        select
        label="Location"
        name="businessLocationsId"
        value={formData.businessLocationsId}
        onChange={handleChange}
      >
        {locSelect}
      </TextField>
      <TextField
        sx={{ mb: 4, width: 110 }}
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
