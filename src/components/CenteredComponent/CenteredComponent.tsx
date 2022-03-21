import { Box } from "@mui/material";

export const CenteredComponent = ({
  children,
  width = 350,
}: {
  children: JSX.Element;
  width?: number | string;
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,

    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "8px",
    boxShadow: 24,
  };
  return <Box sx={style}>{children}</Box>;
};
