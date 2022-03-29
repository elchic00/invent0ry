import { Box } from "@mui/material";

export const CenteredComponent = ({
  children,
  width = "350px",
  height = "500px",
}: {
  children: JSX.Element;
  width?: number | string;
  height?: number | string;
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width,
    overflow: "auto",
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "8px",
    boxShadow: 24,
    height,
  };
  return <Box sx={style}>{children}</Box>;
};
