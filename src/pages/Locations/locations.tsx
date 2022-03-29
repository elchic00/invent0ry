import React, { useState, useEffect } from 'react'
import {DataGrid, GridColumns} from '@mui/x-data-grid'
import {LoaderComponent} from "../../components";
import {useModal} from "../../context";
import {useLocations} from "../../hooks/useLocations";
import {AddLocation} from "../../components/AddLocation/AddLocation";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";



export const LocationGrid = () => {
    const { setComponent } = useModal();
    const { locations, getLocations } = useLocations();

    function handleOpen() {
        setComponent(<AddLocation getLocations={getLocations} />);
    }

    // const [tableData, setTableData] = useState< { [key: string]: locationType; }[]>([])
    const columns: GridColumns = [
        { field: 'name',  headerName: 'Name', width: 150, },
        { field: 'street', headerName: 'Street', width: 220 },
        { field: 'town', headerName: 'Town', width: 150 },
        { field: 'zip', headerName: 'Zip' , width: 150},
        // { field: 'owner', headerName: 'Owner', width: 200}
    ]


return (
        <div style={{ height: 600, width: '66%' }}>
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
                pageSize={10}
            /> : <LoaderComponent/>}
            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 20, right: 250 }}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}

export default LocationGrid;