import React, { useState, useEffect } from 'react'
import {API} from "../../services/api";
import {DataGrid, GridColumns} from '@mui/x-data-grid'

export const LocationGrid = () => {
    const [tableData, setTableData] = useState([])
    const columns: GridColumns = [
        { field: 'name',  headerName: 'Name', width: 150, },
        { field: 'street', headerName: 'Street', width: 220 },
        { field: 'town', headerName: 'Town', width: 150 },
        { field: 'zip', headerName: 'Zip' , width: 150},
        // { field: 'owner', headerName: 'Owner', width: 200}
    ]

    useEffect(() => {
            API.getLocations().then((data)=> JSON.stringify(data)).then((data)=>JSON.parse(data)).then((data)=>setTableData(data))},[])
    return (
        <div style={{ height: 600, width: '66%' }}>
            <DataGrid
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
                rows={tableData}
                columns={columns}
                pageSize={10}
            />
        </div>
    )
}

export default LocationGrid;