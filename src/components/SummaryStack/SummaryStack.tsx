import { useState, useEffect } from "react";
import { Box, Stack, Divider, Typography } from "@mui/material";
import { useLocations } from "../../hooks/useLocations";
import { useItems } from "../../context";

const SummaryStack = () => {
    const { locations, listLocations } = useLocations();
    const { items, listItems } = useItems();

    useEffect(() => {
        listItems();
        listLocations();
    }, []);

    function getTotalQuantity(): number {
        let quantity: number = 0;
        items && items.forEach((item) => {
            if (item.itemCount != undefined) {
                quantity += item.itemCount;
            };
        }); 
        return quantity;
    }

    function getTotalAssets(): string {
        let assets: number = 0;
        items && items.forEach((item) => {
            if (item.itemCount != undefined && item.price != undefined) {
                assets += (item.itemCount * item.price);
            };
        }); 
        return assets.toFixed(2);
    }

    return (
        <Box>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                mb={3}
            >
                <Typography variant="h5">{`Total Locations: ${locations !== null ? locations.length : 0}`}</Typography>
                <Typography variant="h5">{`Total Kinds of Products: ${items !== null ? items.length : 0}`}</Typography>
                <Typography variant="h5">{`Total Quantity: ${getTotalQuantity()}`}</Typography>
               <Typography variant="h5">{`Total Assets: $${getTotalAssets()}`}</Typography>
            </Stack>
        </Box>
    );
};

export default SummaryStack;