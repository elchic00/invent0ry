import { API } from "../services/api";
import React, { useState, useEffect } from "react";

export const useImageUrl = (picture: string) => {
  const [imgUrl, setImgUrl] = useState<any | null>(null);

  async function getImageLink() {
    try {
      const result = await API.getItemImage(picture);
      setImgUrl(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getImageLink();
  }, [picture]);

  return { imgUrl, setImgUrl };
};
