import { useState, useEffect } from "react";
import { Box, Stack, Divider, Typography } from "@mui/material";
import { useLocations } from "../../hooks/useLocations";
import { useItems } from "../../context";
import { useBusiness } from "../../hooks";

const SummaryStack = () => {
    const { locations } = useLocations();
    const { items } = useItems();
    const { business } = useBusiness();
    const [ totalQuantity, setTotalQuantity ] = useState<number>(0);
    const [ totalAssets, setTotalAssets ] = useState<number>(0);

    useEffect(() => {
        let quantity: number = 0;
        let assets: number = 0;
        items && items.forEach((item) => {
            if (item.itemCount != undefined) {
                quantity += item.itemCount;
                if (item.price != undefined) {
                    assets += (item.itemCount * item.price);
                }
            };
        }); 
        setTotalQuantity(quantity);
        setTotalAssets(assets);
    }, [items]);

    return (
        <Box>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                mb={2}
            >
                <Box sx={{ borderRadius: 2 }}><Typography variant="h5">{`Total Locations: ${locations !== null ? locations.length : 0}`}</Typography></Box>
                <Box sx={{ borderRadius: 2 }}><Typography variant="h5">{`Total Kinds of Products: ${items !== null ? items.length : 0}`}</Typography></Box>
                <Box sx={{ borderRadius: 2 }}><Typography variant="h5">{`Total Quantity: ${totalQuantity}`}</Typography></Box>
                <Box sx={{ borderRadius: 2 }}><Typography variant="h5">{`Total Assets: $${totalAssets}`}</Typography></Box>
            </Stack>
        </Box>
    );
};

export default SummaryStack;