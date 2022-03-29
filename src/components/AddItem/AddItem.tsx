import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Button, TextField, FormControl } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ItemDetailsInputs } from "../../interface/models/itemDetailsInputs";
import { API } from "../../services/api";
import { useModal } from "../../context";

const ItemDetailsSchema = yup.object().shape({
  itemName: yup.string().required("Required field - must be a string"),
  locationName: yup.string().required("Required field - must be a string"),
  businessName: yup.string().required("Required field - must be a string"),
  count: yup.number().required("Required field - must be a number"),
  picture: yup.string(),
  sku: yup.string(),
  expirationDate: yup.string(),
  price: yup.number().required("Required field - must be a number"),
});

const defaultValues = {
  itemName: "",
  locationName: "",
  businessName: "",
  count: 0,
  picture: "",
  sku: "",
  expirationDate: "",
  price: 0,
};
const resolver = yupResolver(ItemDetailsSchema);

export const AddItem = ({ getItems }: { getItems: Function }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemDetailsInputs>({
    defaultValues,
    resolver,
  });

  const [data, setData] = useState<ItemDetailsInputs>();

  const { setComponent } = useModal();

  const formSubmitHandler: SubmitHandler<ItemDetailsInputs> = async (
    data: ItemDetailsInputs
  ) => {
    try {
      await API.addItem(data);
      await getItems();
      setComponent(null);
    } catch (error) {
      console.log(error);
    }
  };

  async function createImage(e: any) {
    // TODO:
    // 1. Get the actual form data
    // 2. Update the actual form data
    // OR
    // Add an extra key
    // const result = await API.createImage(e.img)
    // update form data
  }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <FormControl
        sx={{
          p: 1,
          width: { xs: "auto", sm: "300px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Controller
          name="itemName"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="Item Name"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />
        <Controller
          name="locationName"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="Location Name"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />

        <Controller
          name="businessName"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="Business Name"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />

        <Controller
          name="count"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            // TODO - Specify a minimum of items
            <TextField
              type="number"
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="Count"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />

        <Controller
          name="picture"
          control={control}
          defaultValue=""
          render={({ field: { onChange, ref, value } }) => (
            // TODO: Update this form field for one that allows upload an image

            <TextField
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="Picture"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />

        <Controller
          name="sku"
          control={control}
          defaultValue=""
          render={({ field: { onChange, ref, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="SKU"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />

        <Controller
          name="expirationDate"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            // Add a toggle to show this field and the avility for the end-user to select a date
            /* {isOpen ? <ExpirationDateComponent/> : <ToggleComponent/>} */ <TextField
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="Expiration Date"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <TextField
              value={value}
              onChange={onChange}
              inputRef={ref}
              label="Item Price"
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : ""}
            />
          )}
        />

        {/* // TODO: Style this Button */}
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};
