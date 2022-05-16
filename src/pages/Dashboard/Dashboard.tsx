import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useFilterItems } from "../../hooks";
import { useBusiness } from "../../hooks";
import { useLocations } from "../../hooks";
import { useCategory } from "../../hooks";
import { useItems } from "../../context";
import { FilterItems } from "../../interface/models/enums";
import FlipCard from "../../components/FlipCard/FlipCard";
import { useEffect, useState } from "react";
import { API } from "../../services/api";
import SummaryStack from "../../components/SummaryStack/SummaryStack";

export const Dashboard = () => {
  const { locations } = useLocations();
  const { business } = useBusiness();
  const { items } = useItems();
  const { filteredItems, locationFilter, setLocationFilter, amountFilter, setAmountFilter } = useFilterItems();
  const amounts = [5, 10, 20, 50, 100, 500, 1000] 


  const selectLocation = (e:any, val:string) => {
    setLocationFilter(val)
    console.log(val)
  }

  const setAmount = (e:any, z:any) => {
    setAmountFilter(z.props.value)
  }

  return (
    <Box>
      {/*---------------------BUSINESS---------------- */}
      {business !== null ? (
        <Typography variant="h3" sx={{ fontWeight: 200, mb: 2 }}>
          {`Welcome Back, ${business?.name}`}
        </Typography>
      ) : (
        <Skeleton
          sx={{ width: { xs: 450, sm: 550 }, height: 50 }}
          variant="rectangular"
        />
      )}
      {/*---------------------SUMMARY---------------- */}
      <SummaryStack />
      {/* ----------------------LOCATIONS--------------------- */}
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 100 }}>
          Location Filter:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {locations != null ? (
            <Box>
              <Tabs 
                onChange={selectLocation}
                value={locationFilter}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab value={"all"} label={"all"} wrapped></Tab>
                {locations.map((location, i) => (
                  <Tab
                    value={location.id}
                    // elevation={1}
                    // sx={{ p: 1, width: "auto" }}
                    label={`${location.street} - ${location.town} - ${location.zip}`}
                    wrapped
                  />
                ))}  
              </Tabs>
            </Box>
          ) : (
            <Skeleton
              sx={{ width: { xs: 350, sm: 450 }, height: { xs: 200, sm: 300 } }}
              variant="rectangular"
            />
          )} 
          {/* ----------------------AMOUNT--------------------- */} 
          <Box sx={{ minWidth: 120, mr: 4, mt: { xs: 2, sm: 2, md: 2, xl: 0 } }}>
            <FormControl fullWidth>
              <InputLabel id="amounts">Quantity</InputLabel>
              <Select
                labelId="amounts"
                id="amounts"
                value={amountFilter}
                label="Sort By"
                onChange={setAmount}
              >
                {
                  amounts.map(val => (
                    <MenuItem value={val}>{`0 - ${val}`}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      {/* ----------------OUT-OF-STOCK-ITEMS---------------- */}
      <Box>
          {/* {categories && <Typography variant="h4" sx={{ mb: 2, fontWeight: 100}}>
             Number of Categories: {categories.length}
          </Typography>} */}

        <Typography variant="h4" sx={{ mb: 1, fontWeight: 100 }}>
          Items to Restock On:
        </Typography>
        <Box sx={{ pl: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {filteredItems ? (
            filteredItems.map((item) => (
              <FlipCard
                key={item.id}
                name={item.name}
                categoryId={item.categoryId}
                itemCount={item.itemCount}
                picture={item.picture || ""}
                expire={item.expire}
                price={item.price}
                id={item.id}
                locationID={item.locationsID}
              />
            ))
          ) : (
            <Skeleton variant="rectangular" width={500} height={118} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
