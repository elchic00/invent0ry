import { FormControl, TextField, Button } from "@mui/material"
import React, { useState } from "react"
import {locationType} from "../../interface/models/locationType";
import {API} from "../../services/api";
import {sendNotification} from "../../utils/sendNotification";

export const AddLocation =  () => {
    const [formData, setFormData] = useState<locationType>({
        name: "",
        street: '',
        town: "",
        zip: 11111,
    })
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    async function handleSubmit(e : React.SyntheticEvent) {
        e.preventDefault();
        setIsDisabled(true);
        try{
            const result = await API.addLocation(formData)
            setIsDisabled(false);
        } catch(e ){
            sendNotification( "Error trying to call the add location api",
                "error");
            setIsDisabled(false);
        }
    }

    async function handleChange(e: React.ChangeEvent) {
        const {name, value} = e.target as HTMLInputElement;
        if(Number(value)){
            setFormData((prev: locationType) => ({...prev, [name]: Number(value)}))
        }
        else
            setFormData((prev: locationType) => ({...prev, [name]: value}))
    }

    return (
        <FormControl>
            <TextField id="standard-basic" variant="standard" sx={{mb: 2}}
                       name='name'
                       label="Name"
                       helperText="Add your location nickname, H.Q., main, etc"
                       value={formData.name}
                       onChange={handleChange}
            />
            <TextField id="standard-basic"
                       variant="standard"
                       sx={{mb: 2}}
                       name='street'
                       label="Street"
                       value={formData.street}
                       onChange={handleChange}/>
            <TextField id="standard-basic" variant="standard" sx={{mb: 2}}
                       name='town'
                       label="Town"
                       value={formData.town}
                       onChange={handleChange}>
            </TextField>
            <TextField id="standard-basic" variant="standard" type='number' sx={{mb: 2}}
                       name='zip'
                       label="Zip"
                       value={formData.zip}
                       onChange={handleChange}>
            </TextField>
            <Button variant="contained"
                    disabled={isDisabled}
                    onClick={handleSubmit}>submit</Button>
        </FormControl>
    )
}