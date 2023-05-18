import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOption: any = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
}

export const toastMessage = {
    success: (message: string) => toast.success(message, toastOption),
    error: (message: string) => toast.error(message || "Error", toastOption),
}