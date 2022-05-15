import { useState, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  FormControl,
  Typography,
  Skeleton,
  MenuItem,
  InputLabel,
  TextFieldProps,
  Box,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ItemDetailsInputs } from "../../interface/models/itemDetailsInputs";
import { API } from "../../services/api";
import { useModal } from "../../context";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Switch from "@mui/material/Switch";
import {useLocations, useCategory, useOpen} from "../../hooks";
import {CategoryForm} from "../CategoryForm";
import Select from "@mui/material/Select";
import { Locations } from "../../models";
import { useItems } from "../../context";
import box from "../../assets/box.png";

const label = { inputProps: { "aria-label": "Switch demo" } };

const ItemDetailsSchema = yup.object().shape({
  itemName: yup.string().required("Required field - must be a string"),
  locationName: yup.string().required("Required field - must be a string"),
  categoryId: yup.string(),
  // businessName: yup.string().required("Required field - must be a string"),
  count: yup
    .number()
    .required("Required field - must be a number")
    .min(0, "Item Quantity cannot be negative"),
  picture: yup.string(),
  sku: yup.string(),
  expirationDate: yup.string(),
  price: yup
    .number()
    .required("Required field - must be a number")
    .min(0, "Item Price cannot be negative"),
});

const defaultValues = {
  itemName: "",
  categoryId: "",
  locationID: "",
  businessId: "",
  count: 0,
  picture: "",
  sku: "",
  expirationDate: undefined,
  price: 0,
};
const resolver = yupResolver(ItemDetailsSchema);

export const AddItem = ({ setValue }: { setValue?: Function }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemDetailsInputs>({
    defaultValues,
    resolver,
  });
  const [isOpen, setIsOpen] = useState<boolean>();
  const [isOpenNewCat, setIsOpenNewCat] = useState<boolean>();
  const { setComponent } = useModal();
  const { locations } = useLocations();
  const { listItems } = useItems();
  const {categories, listCategories} = useCategory();
  const [image, setImage] = useState<any>(box);
  const imageKey = useRef<string>();
  const { open, handleOpen } = useOpen();

  const formSubmitHandler: SubmitHandler<ItemDetailsInputs> = async (
    data: ItemDetailsInputs
  ) => {
    let formData = { ...data, picture: imageKey.current };

    try {
      await API.addItem(formData);
      listItems();
      // change the tab number on the Walkthrough component
      setValue && setValue(3);
      setComponent(null);
    } catch (error) {
      console.log(error);
      setComponent(null);
    }
  };

  const imageHandler = async (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    try {
      const result = await API.uploadItemImage({
        file: file,
        fileName: file.name,
      });

      imageKey.current = result.key;

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          <Box>
            <Box
              sx={{
                p: 1,
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={image}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            <input
              type="file"
              accept="image/*"
              name="image-upload"
              id="input"
              onChange={imageHandler}
            />
          </Box>
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
                error={!!errors.itemName}
                helperText={errors.itemName ? errors.itemName?.message : ""}
              />
            )}
          />
          {locations && (
            <Controller
              name="locationID"
              control={control}
              render={({ field: { onChange, ref, value } }) => (
                <FormControl>
                  <InputLabel id="location">Location</InputLabel>
                  <Select
                    id="location"
                    value={value}
                    label="Location"
                    onChange={onChange}
                    inputRef={ref}
                  >
                    {locations.map((location: Locations) => (
                      <MenuItem value={location.id}>
                        {`${location.name} - ${location.street}, ${location.town}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          )}
          {/* <Controller
            name="businessName"
            control={control}
            render={({ field: { onChange, ref, value } }) => (
              <TextField
                value={business || ""}
                onChange={onChange}
                inputRef={ref}
                label="Business Name"
                variant="outlined"
                error={!!errors.price}
                helperText={errors.price ? errors.price?.message : ""}
              />
            )}
          /> */}
          <Controller
            name="count"
            control={control}
            render={({ field: { onChange, ref, value } }) => (
              <TextField
                type="number"
                inputProps={{ inputMode: 'numeric', min: 0 }}
                value={value}
                onChange={onChange}
                inputRef={ref}
                label="Count"
                variant="outlined"
                error={!!errors.price}
                helperText={
                  errors.price
                    ? errors.price?.message
                    : "Minimum Item Quantity is 0"
                }
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
          <Typography variant="body2" sx={{ fontWeight: 100, color: "red" }}>
            <Switch {...label} onClick={() => setIsOpenNewCat(!isOpenNewCat)} /> Add new category?
          </Typography>
          {isOpenNewCat && <CategoryForm handleOpen={handleOpen} listCategories={listCategories}/>}
          {categories  && (
              <Controller
                  name="categoryId"
                  control={control}
                  render={({ field: { onChange, ref, value } }) => (
                      <FormControl>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            id="category"
                            value={value}
                            label="Category"
                            onChange={onChange}
                            inputRef={ref}
                        >
                          {categories.map((category) => (
                              <MenuItem value={category.id}>
                                {category.name}
                              </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                  )}
              />
          )}
          <Typography variant="body2" sx={{ fontWeight: 100, color: "red" }}>
            <Switch {...label} onClick={() => setIsOpen(!isOpen)} /> is the item
            perishable ?
          </Typography>

          {isOpen && (
            <Controller
              name="expirationDate"
              control={control}
              render={({ field: { onChange, ref, value } }) => (
                <DatePicker
                  // inputFormat="yyyy-MM-dd"
                  label="Expiration Date"
                  value={value}
                  onChange={onChange}
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} />}
                  inputRef={ref}
                />
              )}
            />
          )}
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, ref, value } }) => (
              <TextField
                type="number"
                inputProps={{ inputMode: "decimal", min: 0, step: ".01" }}
                value={value}
                onChange={onChange}
                inputRef={ref}
                label="Item Price"
                variant="outlined"
                error={!!errors.price}
                helperText={
                  errors.price
                    ? errors.price?.message
                    : "Minimum Item Price is 0"
                }
              />
            )}
          />
          {/* // TODO: Style this Button */}
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </LocalizationProvider>
  );
};