import React, { useState, useEffect } from 'react'
import {API} from "../../services/api";
import { DataGrid } from '@mui/x-data-grid'

export const LocationGrid = () => {
    const [tableData, setTableData] = useState([])
    const columns = [
        { field: 'name', headerName: 'Name', width: 200},
        { field: 'street', headerName: 'Street', width: 200 },
        { field: 'town', headerName: 'Town', width: 200 },
        { field: 'zip', headerName: 'Zip' , width: 200},
        // { field: 'owner', headerName: 'Owner', width: 200}
    ]

    useEffect(() => {
            API.getLocations().then((data)=> JSON.stringify(data)).then((data)=>JSON.parse(data)).then((data)=>setTableData(data))},[])
    return (
        <div style={{ height: 600, width: '80%' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={10}
            />
        </div>
    )
}

export default LocationGrid;