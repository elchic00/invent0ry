import {
  FormControl,
  TextField,
  Button,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { currencies } from "../../constants/currencies";
import React from "react";
import { businessType } from "../../interface/models/businessType";
import { API } from "../../services/api";
import { sendNotification } from "../../utils/sendNotification";
import { useLocations } from "../../hooks/useLocations";
import { useBusiness } from "../../hooks/useBusiness";
import { Locations } from "../../models";

export const BusinessProfile = () => {
  const [formData, setFormData] = useState<businessType>({
    name: "",
    businessLocationsId: "",
    currency: "USD",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const { locations } = useLocations();
  const { business } = useBusiness();

  const getBusiness = async () => {
    setFormData({
      name: business!.name!,
      businessLocationsId: business!.businessLocationsId!,
      currency: business!.currency!,
    });
  };

  useEffect(() => {
    business && getBusiness();
  }, [business]);

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
    <MenuItem key={`${key}-id`} value={key}>
      {key}
    </MenuItem>
  ));

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const locationObject = await API.getLocationById(
        formData.businessLocationsId
      );
      const result = await API.updateBusiness(locationObject!, formData);
      setIsDisabled(false);
      sendNotification("Business was successfully updated", "success");
    } catch (error) {
      sendNotification(
        "Error trying to call the business profile api",
        "error"
      );
      setIsDisabled(false);
    }
  }

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return business == null ? (
    <Skeleton variant="rectangular" width={250} height={350} />
  ) : (
    <FormControl>
      <TextField
        id="standard-basic"
        variant="standard"
        sx={{ mb: 3, width: 250 }}
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
      <Button
        sx={{ width: 200 }}
        variant="contained"
        onClick={handleSubmit}
        disabled={isDisabled}
      >
        submit
      </Button>
    </FormControl>
  );
};
