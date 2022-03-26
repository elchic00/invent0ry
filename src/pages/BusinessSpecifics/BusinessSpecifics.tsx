import { FormControl, TextField, Button, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { currencies } from "./currencies"
import axios from "axios";
import {DataStore} from "@aws-amplify/datastore";
import {Business} from "../../models";


export const BusinessSpecifics = () => {

    const [businessName, setBusinessName] = useState("")
    const [locationName, setLocationName] = useState("")
    const [currency, setCurrency] = useState(currencies.USD)

    const currencyList = Object.keys(currencies).map(key => (<MenuItem value={key}>{key}</MenuItem>))

    async function handleSubmit(){
        const form_data ={
                'name': businessName,
                'location_name': locationName,
                'currency': currency
        }
        await DataStore.save(
            new Business(form_data)
        ).then((data)=>console.log(data));
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