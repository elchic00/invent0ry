import React, { ReactElement, useContext, useState, useEffect } from "react";
import { ItemCardComponent } from "../ItemCard/ItemCard";
import { UpdateItem } from "../UpdateItem/UpdateItem";
import { Box, CardActionArea } from "@mui/material";



// type FlipCardProps = {
//     children: JSX.Element;
// }

// type FlipCardContextInterface = {
//     card: ReactElement | null;
//     setCard: Function;
//     flip: boolean;
// }

/* TEST FLIPCARD */
// const item = {
//     name: "flipcard test",
//     itemCount: 25,
//     picture: "abcd",
//     expire: undefined,
//     price: 260,
//     id: "flipcard test"
// }

const getItems = () => {
  return true;
};
/* END TEST FLIPCARD */

const StyleFlipCardContent = {
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  transition: "transform 1s ease-in-out",
  transformStyle: "preserve-3d",
};

const FlipCard = ({
  name,
  itemCount,
  picture,
  expire,
  price,
  id,
  getItems,
  locationID
}: any) => {
  //const flipCardContext = React.createContext<FlipCardContextInterface>();
  const [flipped, setFlipped] = useState(false);

  const flip = () => {
    setFlipped(!flipped);
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "300px" },
        borderRadius: 2,
        prespective: "1000px",
        height: "440px",
      }}
    >
      <CardActionArea
        sx={{
            height: "100%"
        }}
      >
        <Box
          sx={{
            ...StyleFlipCardContent,
            position: "absolute",
            transform: `rotateY(${180 * +flipped}deg)`
          }}
        >
          <ItemCardComponent
            name={name}
            itemCount={itemCount}
            picture={picture}
            expire={expire}
            price={price}
            id={id}
            flip={flip}
          />
        </Box>
        <Box
          sx={{
            ...StyleFlipCardContent,
            transform: `rotateY(${180 * +!flipped}deg)`,
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          <UpdateItem
            id={id}
            name={name}
            count={itemCount}
            price={price}
            picture={picture}
            expirationDate={expire}
            flip={flip}
            locationID={locationID}
          />
        </Box>
      </CardActionArea>
    </Box>
  );
};

export default FlipCard;
