import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoomOutlined";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.png";
import { Outlet, Link } from "react-router-dom";
import { AmplifyAuth } from "../../services";
import { LocalStorage } from "../../services";

const drawerWidth = 260;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */

  window?: () => Window;
}

export const SideBar = ({ window }: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = async () => {
    try {
      LocalStorage.deleteUser();
      await AmplifyAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      id: "dasboard",
      name: "Dashboard",
      icon: <DashboardIcon />,
      path: "/user/dashboard",
    },
    {
      id: "inventory",
      name: "Inventory",
      icon: <InventoryIcon />,
      path: "/user/inventory",
    },
    {
      id: "locations",
      name: "Locations",
      icon: <LocationOnIcon />,
      path: "/user/locations",
    },
  ];
  const drawer = (
    <Box>
      <Box sx={{ padding: "8px" }}>
        <Link to="/">
          <img src={logo} style={{ objectFit: "contain", width: "100%" }}></img>
        </Link>
      </Box>

      <Divider />
      <List>
        {items.map((item, index) => (
          <Link to={item.path} key={item.id} style={{}}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <Button
        variant="outlined"
        onClick={() => handleSignOut()}
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          display: "flex",
          gap: 1,
        }}
      >
        Sign Out
        <MeetingRoomIcon />
      </Button>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Invent0ry
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ display: { sm: "none" } }} />

        <Outlet />
      </Box>
    </Box>
  );
};
