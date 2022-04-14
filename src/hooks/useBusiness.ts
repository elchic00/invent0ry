import { useEffect, useState } from "react";
import { API } from "../services/api";
import { sendNotification } from "../utils/sendNotification";
import { Business } from "../models";

export const useBusiness = () => {
  const [business, setBusiness] = useState<Business | null>(null);

  useEffect(() => {
    listBusiness();
  }, []);

  async function listBusiness() {
    try {
      const result = await API.getBusinessByUsername();
      setBusiness(result);
    } catch (error) {
      console.log(error);
      sendNotification("Error trying to get items", "error");
    }
  }
  return { business };
};
