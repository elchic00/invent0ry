import {useState, useEffect, useCallback, useRef} from 'react'
import {DataGrid, GridColumns, GridRowModel} from '@mui/x-data-grid'
import {LoaderComponent} from "../../components";
import {useModal} from "../../context";
import {useLocations} from "../../hooks/useLocations";
import {AddLocation} from "../../components/AddLocation/AddLocation";
import {
    Alert,
    AlertProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Snackbar
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import {locationType} from "../../interface/models/locationType";
import {API} from "../../services/api";
import AddIcon from "@mui/icons-material/Add";

const columns: GridColumns = [
    { field: 'name',  headerName: 'Name', width: 180, editable: true},
    { field: 'street', headerName: 'Street', width: 240, editable: true },
    { field: 'town', headerName: 'Town', width: 185 , editable: true},
    { field: 'zip', headerName: 'Zip' , width: 120, editable: true},
    // { field: 'owner', headerName: 'Owner', width: 200}
]

const useFakeMutation = () => {
    return useCallback(
        (location: Partial<locationType>) =>
            new Promise<Partial<locationType>>((resolve, reject) =>
                setTimeout(() => {
                    if (location.name?.trim() === '') {
                        reject();
                    } else {
                        resolve(location);
                    }
                }, 200),
            ),
        [],
    );
};

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
    if (newRow.name !== oldRow.name) {
        return `Name from '${oldRow.name}' to '${newRow.name}'`;
    }
    if (newRow.street !== oldRow.street) {
        return `Street from '${oldRow.street}' to '${newRow.street}'`;
    }
    if (newRow.town !== oldRow.town) {
        return `Town from '${oldRow.town || ''}' to '${newRow.town || ''}'`;
    }
    if (newRow.zip !== oldRow.zip) {
        return `Zip from '${oldRow.zip || ''}' to '${newRow.zip || ''}'`;
    }
    return null;
}

export const LocationGrid = () => {
    const { setComponent } = useModal();
    const { locations, getLocations } = useLocations();
    // const [rows, setRows] = useState(data);
    const [deletedRows, setDeletedRows] = useState([]);

    // const handleRowSelection = (e) => {
    //     setDeletedRows([...deletedRows, ...locations.filter((r) => r.id === e.data.id)]);
    // };

    // const handlePurge = () => {
    //     setRows(
    //         rows.filter((r) => deletedRows.filter((sr) => sr.id === r.id).length < 1)
    //     );
    // };

    function handleOpen() {
        setComponent(<AddLocation getLocations={getLocations} />);
    }
    function handleDelete(){

    }
    const mutateRow = useFakeMutation();
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const [promiseArguments, setPromiseArguments] = useState<any>(null);

    const [snackbar, setSnackbar] = useState<Pick<
        AlertProps,
        'children' | 'severity'
        > | null>(null);

    const handleCloseSnackbar = () => setSnackbar(null);

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
        [],
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
            const response = await mutateRow(newRow);
            await API.updateLocation(oldRow, newRow)
            console.log(response)
            setSnackbar({ children: 'Location successfully saved', severity: 'success' });
            resolve(response);
            setPromiseArguments(null);
        } catch (error) {
            console.log(error)
            setSnackbar({ children: "Name can't be empty", severity: 'error' });
            reject(oldRow);
            setPromiseArguments(null);
        }
    };

    const handleEntered = () => {
        // The `autoFocus` is not used because, if used, the same Enter that saves
        // the cell triggers "No". Instead, we manually focus the "No" button once
        // the dialog is fully open.
        // noButtonRef.current?.focus();
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
        <div style={{
            height: 600,
            width: '60%',
            position: "fixed",
            bottom: 20,
            right: 260}}>
            {renderConfirmDialog()}
            {locations != null ? <DataGrid
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "rgba(236,236,236,1)",
                        color: "rgba(0,0,0,100)",
                        fontSize: 16,
                    },
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}
                // sx={{ m: 2}}
                rows={locations}
                columns={columns}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
                checkboxSelection
                // onRowSelected={handleRowSelection}
                pageSize={10}
            /> : <LoaderComponent/>}
            {!!snackbar && (
                <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 20, right: 180 }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 20, right: 120 }}
                onClick={handleDelete}
            >
                <RemoveIcon />
            </Fab>
        </div>
    )
}

