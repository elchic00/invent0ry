import { FormControl, TextField, Button } from "@mui/material"
import { useState } from "react"
import axios from "axios";

export const AddLocation = () => {
    const url = 'https://invent0ry-back3nd.herokuapp.com/locations/'
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
    }
    const [locName, setLocName] = useState("")
    const [street, setStreet] = useState("")
    const [town, setTown] = useState("")
    const [zip, setZip] = useState(0)


    function handleSubmit(){
        const form_data = {
            'name': locName,
            'street': street,
            'town': town,
            'zip': zip
        }
        axios.post(url,form_data,{headers}).then(({data}) => { console.log(data); })

    }

    return (
        <FormControl>
            <TextField  id="standard-basic" variant="standard" sx={{mb:2}}
                        label="Name"
                        helperText="Add your location nickname, H.Q., main, etc"
                        onChange={(e) => setLocName(e.target.value)}/>
            <TextField id="standard-basic" variant="standard" sx={{mb:2}}
                       label="Street"
                       onChange={(e) => setStreet(e.target.value)}/>
            <TextField id="standard-basic" variant="standard" sx={{mb:2}}
                       label="Town"
                       value={town}
                       onChange={(e) => setTown(e.target.value)}>
            </TextField>
            <TextField id="standard-basic" variant="standard" type='number' sx={{mb:4}}
                       label="Zip"
                       value={zip}
                       onChange={(e) => {
                           Number(e.target.value) < 0 ? setZip(0) : setZip(Number(e.target.value))
                       }}>
            </TextField>
            <Button variant="contained"
                    disabled={!locName || !street || !zip }
                    onClick={handleSubmit}>submit</Button>
        </FormControl>
    )
}
//() => console.log({BusinessName, LocationName, currency})