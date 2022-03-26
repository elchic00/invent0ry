import { FormControl, TextField, Button, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { currencies } from "./currencies"
import axios from "axios";


export const BusinessSpecifics = () => {
    const url = 'https://invent0ry-back3nd.herokuapp.com/businesses/'
    const headers = {
        Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
    }
    const [businessName, setBusinessName] = useState("")
    const [locationName, setLocationName] = useState("")
    const [currency, setCurrency] = useState(currencies.USD)

    const currencyList = Object.keys(currencies).map(key => (<MenuItem value={key}>{key}</MenuItem>))

    function handleSubmit(){
        const data ={
                'name': businessName,
                'location_name': locationName,
                'currency': currency
        }
        axios.post(url,data,{headers}).then(({data}) => { console.log(data); })


    }

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
            disabled={!businessName || !locationName || !currency }
            onClick={handleSubmit}>submit</Button>
        </FormControl>     
    )
}
//() => console.log({BusinessName, LocationName, currency})