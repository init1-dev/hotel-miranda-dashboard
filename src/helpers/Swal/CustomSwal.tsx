import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DefaultTheme } from "styled-components";

const MySwal = withReactContent(Swal)

interface SwalData {
    title?: JSX.Element | string;
    text?: string;
    icon?: SweetAlertIcon | undefined;
    html?: JSX.Element | string;
    showConfirmButton?: boolean;
    confirmButtonText?: string;
    confirmButtonColor?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    cancelButtonColor?: string;
    reverseButtons?: boolean;
    timer?: number;
    timerProgressBar?: boolean;
    width?: number;
}

interface CustomSwalProps {
    data: SwalData;
    theme: DefaultTheme | undefined;
}

const CustomSwal = ({data, theme}:CustomSwalProps) => {
    return (
        MySwal.fire({
            title: data.title,
            text: data.text,
            icon: data.icon ? data.icon : undefined,
            html: data.html ? data.html : "",
            showConfirmButton: data.showConfirmButton ? data.showConfirmButton : false,
            showCancelButton: data.showCancelButton? data.showCancelButton : false,
            reverseButtons: data.reverseButtons? data.reverseButtons : false,
            confirmButtonText: data.confirmButtonText? data.confirmButtonText : "",
            confirmButtonColor: data.confirmButtonColor? data.confirmButtonColor : "",
            cancelButtonText: data.cancelButtonText? data.cancelButtonText : "",
            cancelButtonColor: data.cancelButtonColor ? data.cancelButtonColor : "",
            timer: data.timer ? data.timer : 0,
            timerProgressBar: data.timerProgressBar ? data.timerProgressBar : false,
            width: data.width && data.width,
            color: theme ? theme.text : "white",
            background: theme ? theme.contentBg : "black",
        })
    )
}

export default CustomSwal;