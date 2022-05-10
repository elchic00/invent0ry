import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useFilterItems } from "../../hooks";
import { useBusiness } from "../../hooks";
import { useLocations } from "../../hooks";
import { useCategory } from "../../hooks";
import { FilterItems } from "../../interface/models/enums";
import FlipCard from "../../components/FlipCard/FlipCard";
import { useEffect, useState } from "react";
import { API } from "../../services/api";

export const Dashboard = () => {
  const { locations } = useLocations();
  const { business } = useBusiness();
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
        <Typography variant="h3" sx={{ fontWeight: 200, mb: 5 }}>
          {`Welcome Back, ${business?.name}`}
        </Typography>
      ) : (
        <Skeleton
          sx={{ width: { xs: 450, sm: 550 }, height: 50 }}
          variant="rectangular"
        />
      )}
      {/* ----------------------LOCATIONS--------------------- */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 100 }}>
          Location Filter:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {locations != null ? (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                onChange={selectLocation}
                value={locationFilter}
              >
                <Tab value={"all"} label={"all"}></Tab>
                {locations.map((location, i) => (
                  <Tab
                    value={location.id}
                    // elevation={1}
                    // sx={{ p: 1, width: "auto" }}
                    label={`${location.street} - ${location.town} - ${location.zip}`}
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
          <Box sx={{ minWidth: 120 }}>
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
