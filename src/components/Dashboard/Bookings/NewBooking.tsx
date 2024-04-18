import { FormEvent, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { newBooking, editBooking, getBooking } from "../../../store/Bookings/bookingsThunk";
import { Button, Form, GridContainer, Input, InputDate, Label, Select, TextArea, Title } from "../../../styled/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectBooking, availableRooms } from "../../../store/Bookings/bookingsSlice";
import { format } from "date-fns";
import { ThemeContext } from "styled-components";
import CustomSwal from "../../../helpers/Swal/CustomSwal";
import BackButton from "../../Buttons/BackButton";
import { dateFromDBFormat } from "../../../helpers/dateFromDBFormat";
import { getRoomsThunk } from "../../../store/Rooms/roomsThunk";
import { BookingData } from "../../../store/interfaces";
import LoaderComponent from "../../Loader";
import { BookingForm } from "../../../helpers/API/interfaces";

function NewBooking () {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const bookingData = useAppSelector(selectBooking);
    const rooms = useAppSelector(availableRooms);
    const [formData, setFormData] = useState({} as BookingData);
    
    const location = useLocation().pathname;
    const isEdit = location.includes("edit");
    const currentId = isEdit ? id : null;
    const [fetched, setFetched] = useState(false);
    const theme = useContext(ThemeContext);
    
    const initialFetch = async () => {
        await dispatch(getRoomsThunk()).unwrap();
        if(currentId){
            await dispatch(getBooking(String(id))).unwrap();
        }
        setFetched(true);
    }

    useEffect(() => {
        initialFetch();
    }, []);

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

    useEffect(() => {
        if(rooms.length > 0){
            setFormData({
                ...sampleBooking,
                roomInfo: {
                    ...rooms[0]
                } as any
            });
        }
        
    }, [rooms])

    const sampleBooking = {
        _id: "",
        full_name: "Martin McFly",
        email: "marty@email.com",
        phone: "678234512",
        image: "https://loremflickr.com/640/480/hotel,bedroom?lock=2637158431064064",
        check_in: String(new Date("7/12/2024").toISOString().slice(0, 16)),
        check_out: String(new Date("7/15/2024").toISOString().slice(0, 16)),
        order_date: String(new Date(Date.now()).toISOString()),
        special_request: "Necesito mucha pizza",
        discount: 50,
        status: "Check In"
    };

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as BookingForm;
        navigate("/dashboard/bookings");
        
        const roomToAdd = rooms.find(room => room.room_number === Number(form.room_number.value)) as any;

        const formDataToUpdate = {
            ...formData,
            full_name: form.full_name.value,
            email: form.email.value,
            phone: form.phone.value,
            special_request: form.special_request.value,
            discount: Number(form.discount.value),
            check_in: form.check_in.value,
            check_out: form.check_out.value,
            roomInfo: {
                ...roomToAdd
            }
        };
        
        (currentId)
            ? await dispatch(editBooking({
                id: String(currentId),
                newData: {
                    ...formDataToUpdate,
                    check_in: format(formDataToUpdate.check_in, 'yyyy-MM-dd'),
                    check_out: format(formDataToUpdate.check_out, 'yyyy-MM-dd')
                }
            }))
            : await dispatch(newBooking(formDataToUpdate))

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
        (fetched)
            ? <>
                <Title>
                    <span>
                        {currentId
                            ? <>EDITING <small>#{currentId}</small></>
                            : <>NEW BOOKING</>}
                    </span>
                    <BackButton />
                </Title>

                <Form id="new-room" name="new-room" onSubmit={(e)=> handleSubmit(e)}>
                    <GridContainer>

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
                        <Label htmlFor="room_number">Room Number:</Label>
                        <Select name="room_number" id="room_number" required>
                            <option defaultValue={formData.roomInfo.room_number} hidden>{formData.roomInfo.room_number}</option>
                            {
                                rooms.map((room, index) => {
                                    return <option key={index} defaultValue={room.room_number}>{room.room_number}</option>
                                })
                            }
                        </Select>

                        <Label htmlFor="discount">Discount:</Label>
                        <InputDate type="number" name="discount" id="discount" defaultValue={formData.discount} required/>

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
        : <LoaderComponent />
    );
}

export default NewBooking;