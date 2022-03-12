import { Box, Typography } from "@mui/material";
//import { AuthenticatorComp } from "../../components/Auth";
import logo from "../../assets/logo.png";

export const AuthPage = () => {
  return (
    <Box variant="div" sx={{ display: "flex", height: "100vh" }}>
      <Box
        variant="div"
        sx={{
          flexGrow: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, color: "#8C6239", mb: 3 }}
          >
            Invent0ry
          </Typography>
          {/*<AuthenticatorComp />*/}
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          background: "#F8F8F9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: 300, maxHeight: 300 }}>
          <img
            src={logo}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          ></img>
        </Box>
      </Box>
    </Box>
  );
};
