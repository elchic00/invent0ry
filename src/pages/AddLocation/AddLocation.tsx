import { FormControl, TextField, Button } from "@mui/material"
import { useState } from "react"
import axios from "axios";
import { DataStore } from '@aws-amplify/datastore';
import { Locations } from '../../models';

export const AddLocation =  () => {
    const [locName, setLocName] = useState("")
    const [street, setStreet] = useState("")
    const [town, setTown] = useState("")
    const [zip, setZip] = useState(0)


    async function handleSubmit() {
        const form_data = {
            'name': locName,
            'street': street,
            'town': town,
            'zip': zip
        }
        await DataStore.save(
            new Locations(form_data)
        ).then((data)=>console.log(data));

    }

    return (
        <FormControl>
            <TextField id="standard-basic" variant="standard" sx={{mb: 2}}
                       label="Name"
                       helperText="Add your location nickname, H.Q., main, etc"
                       onChange={(e) => setLocName(e.target.value)}/>
            <TextField id="standard-basic" variant="standard" sx={{mb: 2}}
                       label="Street"
                       onChange={(e) => setStreet(e.target.value)}/>
            <TextField id="standard-basic" variant="standard" sx={{mb: 2}}
                       label="Town"
                       value={town}
                       onChange={(e) => setTown(e.target.value)}>
            </TextField>
            <TextField id="standard-basic" variant="standard" type='number' sx={{mb: 4}}
                       label="Zip"
                       value={zip}
                       onChange={(e) => {
                           Number(e.target.value) < 0 ? setZip(0) : setZip(Number(e.target.value))
                       }}>
            </TextField>
            <Button variant="contained"
                    disabled={!locName || !street || !zip}
                    onClick={handleSubmit}>submit</Button>
        </FormControl>
    )
}