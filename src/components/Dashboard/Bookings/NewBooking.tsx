import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { newBooking, editBooking, getBooking } from "../../../store/Bookings/bookingsThunk";
import { Button, Form, GridContainer, Input, Label, Select, TextArea, Title } from "../../../styled/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectBooking, availableRooms } from "../../../store/Bookings/bookingsSlice";
import { format } from "date-fns";
import { Loader, Loading } from "../../../styled/Loading";
import { ThemeContext } from "styled-components";
import CustomSwal from "../../../helpers/Swal/CustomSwal";

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
            await dispatch(getBooking(Number(id))).unwrap();
            setFetched(true);
        }
    }, [id, currentId, dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);

    useEffect(() => {
        if(currentId) {
            (bookingData.itemData) && setFormData(
                {...bookingData.itemData,
                    check_in: format(bookingData.itemData.check_in, 'yyyy-MM-dd'),
                    check_out: format(bookingData.itemData.check_out, 'yyyy-MM-dd')
                });
        }
    }, [bookingData.itemData, currentId]);

    const [formData, setFormData] = useState({
        full_name: "Martin McFly",
        email: "marty@email.com",
        phone: "678234512",
        image: "",
        special_request: "Necesito mucha pizza",
        number: 93,
        check_in: format("6/12/2024", 'yyyy-MM-dd'),
        check_out: format("6/18/2024", 'yyyy-MM-dd'),
        // extra fields
        id: 50,
        order_date: new Date(Date.now()).toISOString(),
        price: 477.7,
        type: "Single Bed",
        status: "Check In",
        amenities: [
            "24/7 Online Support",
            "Single bed",
            "Breakfast"
        ],
        room_status: "Booked",
        foto: "image.jpg",
        description: "booking"
    });

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
                id: Number(currentId),
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
                    : `Booking #${formDataToUpdate.id} successfully created`,
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
                    ? <Title>EDITING <small>#{currentId}</small></Title>
                    : <Title>NEW BOOKING</Title>}

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
                        <Input type="date" name="check_in" id="check_in" defaultValue={formData.check_in} required/>

                        <Label htmlFor="check_out">Check Out:</Label>
                        <Input type="date" name="check_out" id="check_out" defaultValue={formData.check_out} required/>

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