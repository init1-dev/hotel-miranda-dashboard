import { Bounce, ToastOptions, toast } from "react-toastify";

export const customToast = (type: string, message: string, props?: ToastOptions ) => {
    const toastOptions = {
        ...props,
        position: props ? props.position : 'top-right',
        autoClose: props?.autoClose ? props.autoClose : 2500,
        hideProgressBar: props ? props.hideProgressBar : false,
        closeOnClick: props ? props.closeOnClick : true,
        pauseOnHover: props ? props.pauseOnHover : true,
        draggable: props ? props.draggable : true,
        progress: props ? props.progress : 0,
        theme: props ? props.theme : "light",
        transition: Bounce
    };
    (toast as any)[type](message, toastOptions);
}