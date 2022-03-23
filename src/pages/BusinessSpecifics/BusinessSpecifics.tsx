import { FormControl, TextField, Button, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { currencies } from "./currencies"

export const BusinessSpecifics = () => {

    const [BusinessName, setBusinessName] = useState("")
    const [LocationName, setLocationName] = useState("")
    const [currency, setCurrency] = useState(currencies.USD)

    const currencyList = Object.keys(currencies).map(key => (<MenuItem value={key}>{key}</MenuItem>))

    return (
        <FormControl>
            <TextField  id="standard-basic" variant="standard" sx={{mb:2}}
                label="Business Name"
                helperText="Name of your business"
                onChange={(e) => setBusinessName(e.target.value)}/>
            <TextField id="standard-basic" variant="standard" sx={{mb:2}}
                label="Location Name" 
                helperText="add your business address nickname, H.Q., main, etc"
                onChange={(e) => setLocationName(e.target.value)}/>
            <TextField sx={{mb:4}}
                select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}>
                {currencyList}
            </TextField>
            <Button variant="contained"
            disabled={!BusinessName || !LocationName || !currency }
            onClick={() => console.log({BusinessName, LocationName, currency})}>submit</Button>
        </FormControl>     
    )
}