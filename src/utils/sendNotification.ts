import { toast } from "react-toastify";

export const sendNotification = (
  message: String,
  type: "error" | "success" | "info" | "warn"
) => {
  const toaster = toast[type].bind(toast);
  toaster(message, { position: toast.POSITION.TOP_CENTER });
};
