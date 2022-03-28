import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Button, TextField, FormControl } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ItemDetailsInputs {
  itemName: string;
  locationName: string;
  businessName: string;
  count: number;
  picture: string;
  sku: string;
  expirationDate: string;
  price: number;
}

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
export const AddItem = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemDetailsInputs>({
    defaultValues,
    resolver,
  });

  const formSubmitHandler: SubmitHandler<ItemDetailsInputs> = (
    data: ItemDetailsInputs
  ) => {
    // const options = {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json;charset=UTF-8",
    //     },
    //     body: JSON.stringify({
    //         'name': businessName,
    //         'locationName': locationName,
    //         'currency': currency
    //     })}
    // fetch(url, options)
    //     .then((response) => {response.json();
    //         console.log(response);})

    console.log("form data:", data);
  };

  function onSubmit(data: any) {
    console.log(data);
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
            <TextField
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
            <TextField
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

        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};
