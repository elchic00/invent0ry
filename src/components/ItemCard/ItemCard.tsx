import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

type ItemCardProps = {
  name?: string;
  itemCount?: number;
  picture?: string;
  expire?: string;
  price?: number;
};
export const ItemCardComponent = ({
  name,
  itemCount,
  picture,
  expire,
  price,
}: ItemCardProps) => {
  return (
    <Card sx={{ width: { xs: "auto", sm: "250px" } }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* 
            // display: box 
            // display: inline - <span> 
            */}

          <Typography variant="h4" sx={{ fontWeight: 100 }}>
            name: {name}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 100 }}>
            price: {price}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {/* TODO:
          1. Button to update
          
          2. Button to delete
          */}
        <IconButton></IconButton>
      </CardActions>
    </Card>
  );
};
