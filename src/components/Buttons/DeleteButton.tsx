import { useNavigate } from "react-router-dom";
import CustomSwal from "../../helpers/Swal/CustomSwal";
import { ActionButtonIcon } from "../../styled/Button";
import { customToast } from "../../helpers/toastify/customToast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useAppDispatch } from "../../hooks/store";
import { AsyncThunk } from "@reduxjs/toolkit";

interface DeleteButtonProps {
    type: string;
    action: AsyncThunk<string, string, {}>;
    id: string;
    goBack?: boolean;
}

const DeleteButton = ({
    type,
    action,
    id,
    goBack
}: DeleteButtonProps) => {
    const theme = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <ActionButtonIcon onClick={async(e) => {
            e.stopPropagation()

            const swalProps = {
                title: `<small>You're going to delete ${type.toLowerCase()} #${id}</small>`,
                text: `This action is irreversible`,
                icon: 'warning' as const,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                confirmButtonColor: '#ff0000',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            }

            await CustomSwal({data: swalProps, theme: theme})
            .then(async(result) => {
                if (result.isConfirmed) {
                    dispatch(action(id));
                    const swalProps = {
                        text: `${type} #${id} deleted successfully`,
                        icon: 'success' as const,
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    }
                    if(goBack){
                        navigate(-1);
                    }
                    await CustomSwal({data: swalProps, theme: theme})
                }
            }).catch((error) => {
                customToast('error', error);
            });
        }}>
            <RiDeleteBin5Line />
        </ActionButtonIcon>
    );
}

export default DeleteButton;