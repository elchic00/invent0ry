import { useState } from "react";

export const useOpen = () => {
  const [open, setOpen] = useState<boolean>(false);

  function handleOpen() {
    if (open) setOpen(false);
    else setOpen(true);
  }

  return { open, handleOpen };
};
