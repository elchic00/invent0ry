import React, { useState, useEffect } from "react";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { LoaderComponent } from "../../components";
import { useModal } from "../../context";
import { useLocations } from "../../hooks/useLocations";
import { AddLocation } from "../../components/AddLocation/AddLocation";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const LocationGrid = () => {
  const { setComponent, setTheme } = useModal();
  const { locations, getLocations } = useLocations();

  function handleOpen() {
    setTheme({ height: "auto", width: "auto" });
    setComponent(<AddLocation getLocations={getLocations} />);
  }

  // const [tableData, setTableData] = useState< { [key: string]: locationType; }[]>([])
  const columns: GridColumns = [
    { field: "name", headerName: "Name", width: 180 },
    { field: "street", headerName: "Street", width: 240 },
    { field: "town", headerName: "Town", width: 185 },
    { field: "zip", headerName: "Zip", width: 120 },
    { field: "owner", headerName: "Owner", width: 200 },
    // { field: 'owner', headerName: 'Owner', width: 200}
  ];

  return (
    <div
      style={{
        height: 600,
        width: "60%",
        position: "fixed",
        bottom: 20,
        right: 260,
      }}
    >
      {locations != null ? (
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(236,236,236,1)",
              color: "rgba(0,0,0,100)",
              fontSize: 16,
            },
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          // sx={{ m: 2}}
          rows={locations}
          columns={columns}
          pageSize={10}
        />
      ) : (
        <LoaderComponent />
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 200 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default LocationGrid;
