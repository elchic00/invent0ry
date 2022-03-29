import { useEffect, useState } from "react";
import { API } from "../services/api";
import { sendNotification } from "../utils/sendNotification";
import { Locations } from "../models";

export const useLocations = () => {
    const [locations, setLocations] = useState<Locations[] | null>(null);

    useEffect(() => {
        getLocations();
    }, []);

    async function getLocations() {
        try {
            const result = await API.getLocations();
            setLocations(result);
        } catch (error) {
            console.log(error);
            sendNotification("Error trying to get items", "error");
        }
    }
    return { locations, getLocations };
};
