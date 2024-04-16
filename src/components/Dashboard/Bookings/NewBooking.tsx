import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { newBooking, editBooking, getBooking } from "../../../store/Bookings/bookingsThunk";
import { Button, Form, GridContainer, Input, InputDate, Label, Select, TextArea, Title } from "../../../styled/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectBooking, availableRooms } from "../../../store/Bookings/bookingsSlice";
import { format } from "date-fns";
import { Loader, Loading } from "../../../styled/Loading";
import { ThemeContext } from "styled-components";
import CustomSwal from "../../../helpers/Swal/CustomSwal";
import BackButton from "../../Buttons/BackButton";
import { dateFromDBFormat } from "../../../helpers/dateFromDBFormat";

function NewBooking () {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const bookingData = useAppSelector(selectBooking);
    const rooms = useAppSelector(availableRooms);
    const location = useLocation().pathname;
    const isEdit = location.includes("edit");
    const currentId = isEdit ? id : null;
    const [fetched, setFetched] = useState(false);
    const theme = useContext(ThemeContext);
    
    const initialFetch = useCallback(async () => {
        if(currentId){
            await dispatch(getBooking(String(id))).unwrap();
            setFetched(true);
        }
    }, [id, currentId, dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);

    useEffect(() => {
        if(currentId && bookingData.itemData) {
            const check_in_date = dateFromDBFormat(bookingData.itemData.check_in);
            const check_out_date = dateFromDBFormat(bookingData.itemData.check_out);
            setFormData({
                ...bookingData.itemData,
                _id: bookingData.itemData._id ?? "",
                check_in: String(check_in_date),
                check_out: String(check_out_date),
                order_date: String(bookingData.itemData.order_date)
            });
        }
    }, [bookingData.itemData, currentId]);

    const booking = {
        _id: "",
        full_name: "Martin McFly",
        email: "marty@email.com",
        phone: "678234512",
        image: "",
        check_in: String(new Date("7/12/2024").toISOString().slice(0, 16)),
        check_out: String(new Date("7/15/2024").toISOString().slice(0, 16)),
        // extra fields
        order_date: String(new Date(Date.now()).toISOString()),
        special_request: "Necesito mucha pizza",
        discount: 50,
        status: "Check In",
        roomInfo: "661e6c37687a58494d48cb2a"
    };

    const [formData, setFormData] = useState(booking);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/dashboard/bookings");

        const formDataToUpdate = {
            ...formData,
            full_name: e.currentTarget.full_name.value,
            email: e.currentTarget.email.value,
            phone: e.currentTarget.phone.value,
            special_request: e.currentTarget.special_request.value,
            number: e.currentTarget.number.value,
            check_in: e.currentTarget.check_in.value,
            check_out: e.currentTarget.check_out.value
        };
        
        (currentId)
            ? dispatch(editBooking({
                id: String(currentId),
                newData: {
                    ...formDataToUpdate,
                    check_in: format(formDataToUpdate.check_in, 'yyyy-MM-dd'),
                    check_out: format(formDataToUpdate.check_out, 'yyyy-MM-dd')
                }
            }))
            : dispatch(newBooking(formDataToUpdate))

        const swalProps = {
            text: currentId
                    ? `Booking #${id} successfully edited`
                    : `Booking #${formDataToUpdate._id} successfully created`,
            icon: 'success' as const,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }

        await CustomSwal({data: swalProps, theme: theme})
    }

    return (
        (!currentId || currentId && fetched)
            ? <>
                {currentId
                    ? <Title>
                        <span>
                            EDITING <small>#{currentId}</small>
                        </span>
                        <BackButton />
                    </Title>
                    : <Title>
                        <span>
                            NEW BOOKING
                        </span>
                        <BackButton />
                    </Title>}

                <Form id="new-room" name="new-room" onSubmit={(e)=> handleSubmit(e)}>
                    <GridContainer>
                        {/* {new Date(formData.order_date).toISOString()} */}

                        <Label htmlFor="full_name">Fullname:</Label>
                        <Input type="text" name="full_name" id="full_name" placeholder="Insert name" defaultValue={formData.full_name} required/>

                        <Label htmlFor="email">Email:</Label>
                        <Input type="email" name="email" id="email" placeholder="Insert employee email" defaultValue={formData.email} required/>

                        <Label htmlFor="phone">Phone:</Label>
                        <Input type="tel" name="phone" id="phone" placeholder="Insert employee phone" defaultValue={formData.phone} required/>

                        <Label htmlFor="special_request">Especial Request:</Label>
                        <TextArea name="special_request" id="special_request" cols={30} rows={10} placeholder="Insert request" defaultValue={formData.special_request} >
                        </TextArea>
                    </GridContainer>

                    <GridContainer>
                        <Label htmlFor="number">Room Number:</Label>
                        <Select name="number" id="number" required>
                            <option defaultValue={formData.number} hidden>{formData.number}</option>
                            {
                                rooms.map((room, index) => {
                                    return <option key={index} defaultValue={room.room_number}>{room.room_number}</option>
                                })
                            }
                        </Select>

                        <Label htmlFor="check_in">Check In:</Label>
                        <InputDate type="datetime-local" name="check_in" id="check_in" defaultValue={formData.check_in} required/>

                        <Label htmlFor="check_out">Check Out:</Label>
                        <InputDate type="datetime-local" name="check_out" id="check_out" defaultValue={formData.check_out} required/>

                        <Button type="submit" form="new-room">
                        {currentId
                            ? "Save changes"
                            : "Submit"}
                        </Button>
                    </GridContainer>
                </Form>
            </>
        : <Loading>
            <Loader />
        </Loading>
    );
}

export default NewBooking;