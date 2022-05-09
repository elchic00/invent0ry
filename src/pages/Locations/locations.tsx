import { useState, useCallback, useRef } from "react";
import {
  DataGrid,
  GridColumns,
  GridRowModel,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { LoaderComponent } from "../../components";
import { useModal } from "../../context";
import { useLocations } from "../../hooks/useLocations";
import { AddLocation } from "../../components/AddLocation/AddLocation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Box,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { API } from "../../services/api";
import AddIcon from "@mui/icons-material/Add";
import { sendNotification } from "../../utils/sendNotification";
import { Locations } from "../../models";
import Swal from "sweetalert2";

const columns: GridColumns = [
  // { field: "owner", headerName: "owner", width: 200 },
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "street", headerName: "Street", width: 240, editable: true },
  { field: "town", headerName: "Town", width: 185, editable: true },
  { field: "zip", headerName: "Zip", width: 120, editable: true },
  // { field: "id", headerName: "Location ID", width: 200 },
];

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
  if (newRow.name !== oldRow.name) {
    return `Name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.street !== oldRow.street) {
    return `Street from '${oldRow.street}' to '${newRow.street}'`;
  }
  if (newRow.town !== oldRow.town) {
    return `Town from '${oldRow.town || ""}' to '${newRow.town || ""}'`;
  }
  if (newRow.zip !== oldRow.zip) {
    return `Zip from '${oldRow.zip || ""}' to '${newRow.zip || ""}'`;
  }
  return null;
}

export const LocationGrid = () => {
  const { setComponent } = useModal();
  const { locations, listLocations } = useLocations();
  const [deleted, setDeleted] = useState<
    GridSelectionModel | GridSelectionModel[]
  >([]);

    function handleDeleteConfirmation(e: React.SyntheticEvent) {
      Swal.fire({
        title: `Delete these location(s)?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete this location",
        backdrop: "confirmationPopupStyle",
        focusCancel: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(e);
        } else {
          Swal.fire("Cancelled!", `Location(s) remains`, "info");
        }
      });
    }

  const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let arrLen = deleted.length;
    try {
      for (let i = 0; i <= arrLen - 1; i++) {
        const loc = (await API.getLocationById(deleted[i] as string)) as Locations;
        await API.deleteLocation(loc);
      }
      sendNotification("Location was successfully deleted", "success");
      await listLocations();
    } catch (e) {
      console.log(e)
      sendNotification("Error trying to call the api to delete this location", "error");
    }
  };

  function handleOpen() {
    setComponent(<AddLocation getLocations={listLocations} />);
  }

  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = useState<any>(null);

  const processRowUpdate = useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    try {
      // Make the HTTP request to save in the backend
      // oldRow.zip = oldRow.zip as number;
      const res = await API.updateLocation(oldRow, newRow);
      sendNotification("Location was successfully updated", "success");
      resolve(res);
      setPromiseArguments(null);
      await listLocations();
    } catch (error) {
      console.log(error);
      sendNotification("Error trying to update the location", "error");
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();`
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      // eslint-disable-next-line react/jsx-no-undef
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box
      sx={{
        height: 600,
        width: "auto",
      }}
    >
      {renderConfirmDialog()}
      {locations != null ? (
        <>
        <Typography mb={2} variant="h3">
          Locations
        </Typography>
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
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
            checkboxSelection
            onSelectionModelChange={(loc) => setDeleted(loc)}
            pageSize={10}
          />
          <LoaderComponent />
        </>
      ) : (
        <LoaderComponent />
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 185 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Fab
        color="primary"
        aria-label="remove"
        sx={{ position: "fixed", bottom: 20, right: 124 }}
        onClick={handleDeleteConfirmation}
      >
        <RemoveIcon />
      </Fab>
    </Box>
  );
};
