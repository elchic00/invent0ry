import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BusinessForm } from "../../components/BusinessForm";
import { AddLocation } from "../../components/AddLocation";
import { AddItem } from "../../components/AddItem";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const WalkThrough = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} aria-label="basic tabs example">
          <Tab label="Add a location" {...a11yProps(0)} />
          <Tab label="Add a business" {...a11yProps(1)} />
          <Tab label="Add an item" {...a11yProps(2)} />
          <Tab label="Thank you" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddLocation setValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BusinessForm setValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddItem setValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box>Thank you</Box>
      </TabPanel>
    </Box>
  );
};
