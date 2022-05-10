import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const useId = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id") || "";

  function handleDeleteId() {
    searchParams.delete("id");
    setSearchParams(searchParams);
  }

  useEffect(() => {
    handleDeleteId();
  }, [id]);
  return { id, handleDeleteId };
};
