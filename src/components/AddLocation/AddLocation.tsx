import { FormControl, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { locationType } from "../../interface/models/locationType";
import { API } from "../../services/api";
import { sendNotification } from "../../utils/sendNotification";
import { useModal } from "../../context";

export const AddLocation = ({ getLocations }: { getLocations: Function }) => {
  const [formData, setFormData] = useState<locationType>({
    name: "",
    street: "",
    town: "",
    zip: undefined,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { setComponent } = useModal();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsDisabled(true);
    try {
      // const result = await API.addLocation(formData);
      await getLocations();
      setComponent(null);
      setIsDisabled(false);
    } catch (e) {
      sendNotification("Error trying to call the add location api", "error");
      setIsDisabled(false);
    }
  }

  async function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (Number(value)) {
      setFormData((prev: locationType) => ({ ...prev, [name]: Number(value) }));
    } else setFormData((prev: locationType) => ({ ...prev, [name]: value }));
  }

  return (
    <FormControl>
      <TextField
        sx={{
          p: 1,
          width: { xs: "auto", sm: "300px" },
          display: "flex",
          flexDirection: "column",
        }}
        name="name"
        label="Name"
        helperText="Add your location nickname, H.Q., main, etc"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        sx={{
          p: 1,
          width: { xs: "auto", sm: "300px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        name="street"
        label="Street"
        value={formData.street}
        onChange={handleChange}
      />
      <TextField
        sx={{
          p: 1,
          width: { xs: "auto", sm: "300px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        name="town"
        label="Town"
        value={formData.town}
        onChange={handleChange}
      ></TextField>
      <TextField
        type="number"
        sx={{
          p: 1,
          width: { xs: "auto", sm: "300px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        name="zip"
        label="Zip"
        value={formData.zip}
        onChange={handleChange}
      ></TextField>
      <Button disabled={isDisabled} onClick={handleSubmit}>
        submit
      </Button>
    </FormControl>
  );
};
