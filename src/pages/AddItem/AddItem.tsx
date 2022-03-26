import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const url = 'https://invent0ry-back3nd.herokuapp.com/items/'

interface ItemDetailsInputs {
    item_name:string;
  location_name: string;
  idbusiness: string;
  count: number;
  Picture: string;
  SKU: string;
  Expiration_date: string;
  price: number;
}

const ItemDetailsSchema = yup.object().shape({
  location_name: yup.string().required("Required field - must be a string"),
  business_name: yup.string().required("Required field - must be a string"),
  count: yup.number().required("Required field - must be a number"),
  Picture: yup.string(),
  SKU: yup.string(),
  Expiration_date: yup.string(),
  price: yup.number().required("Required field - must be a number")
});

export const AddItem = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ItemDetailsInputs>({
    resolver: yupResolver(ItemDetailsSchema)
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
      //         'location_name': locationName,
      //         'currency': currency
      //     })}
      // fetch(url, options)
      //     .then((response) => {response.json();
      //         console.log(response);})

      console.log("form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Controller
        name="location_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Location Name"
            variant="outlined"
            error={!!errors.location_name}
            helperText={
              errors.location_name ? errors.location_name?.message : ""
            }
          />
        )}
      />
      <br/><br/>
      <Controller
        name="idbusiness"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Business Name"
            variant="outlined"
            error={!!errors.idbusiness}
            helperText={
              errors.idbusiness ? errors.idbusiness?.message : ""
            }
          />
        )}
      />
      <br/><br/>
      <Controller
        name="count"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Item Count"
            variant="outlined"
            error={!!errors.count}
            helperText={errors.count ? errors.count?.message : ""}
          />
        )}
      />
      <br/><br/>
      <Controller
        name="Picture"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Item Image Link"
            variant="outlined"
            error={!!errors.Picture}
            helperText={errors.Picture ? errors.Picture?.message : ""}
          />
        )}
      />
      <br/><br/>
      <Controller
        name="SKU"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="SKU"
            variant="outlined"
            error={!!errors.SKU}
            helperText={errors.SKU ? errors.SKU?.message : ""}
          />
        )}
      />
      <br/><br/>
      <Controller
        name="Expiration_date"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Expiration Date"
            variant="outlined"
            error={!!errors.Expiration_date}
            helperText={"MM/DD/YYYY format"}
          />
        )}
      />
      <br/><br/>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Item Price"
            variant="outlined"
            error={!!errors.price}
            helperText={errors.price ? errors.price?.message : ""}
          />
        )}
      />
      <br/><br/>
      <Button type="submit">Submit</Button>
    </form>
  );
};
