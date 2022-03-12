import { Box } from "@mui/material";
import React from "react";
import sampleImage from "../../assets/inventory-logo.jpg";

export const LogoComp = () => {
  return (
    <img
      src={sampleImage}
      style={{ objectFit: "contain", width: 450, height: 450 }}
    />
  );
};
