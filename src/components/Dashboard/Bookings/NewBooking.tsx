import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../hooks/store";
import { newBooking } from "../../../store/Bookings/bookingsThunk";
import { Button, Form, GridContainer, Input, Label, Select, TextArea, Title } from "../../../styled/Form";
import { useNavigate } from "react-router-dom";

function NewBooking () {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "Mark Hopper",
        email: "email@prueba.com",
        phone: "123456789",
        image: "",
        special_request: "pizza",
        number: 60,
        check_in: "2024-06-12",
        check_out: "2024-06-18",
        // extra fields
        id: 50,
        order_date: "6/5/2024",
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(formData);
        navigate("/dashboard/bookings");
        dispatch(newBooking(formData));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            <Title>NEW BOOKING</Title>

            <Form id="new-room" name="new-room" onSubmit={(e)=> handleSubmit(e)}>
                <GridContainer>

                    <Label htmlFor="full_name">Fullname:</Label>
                    <Input type="text" name="full_name" id="full_name" placeholder="Insert name" value={formData.full_name} onChange={handleInputChange} required/>

                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" name="email" id="email" placeholder="Insert employee email" value={formData.email} onChange={handleInputChange} required/>

                    <Label htmlFor="phone">Phone:</Label>
                    <Input type="tel" name="phone" id="phone" placeholder="Insert employee phone" value={formData.phone} onChange={handleInputChange} required/>

                    <Label htmlFor="special_request">Especial Request:</Label>
                    <TextArea name="special_request" id="special_request" cols={30} rows={10} placeholder="Insert request" value={formData.special_request} onChange={handleInputChange} >
                    </TextArea>
                </GridContainer>

                <GridContainer>
                    <Label htmlFor="number">Room Number:</Label>
                    <Select name="number" id="number" onChange={handleInputChange} required>
                        <option defaultValue={formData.number} hidden>60</option>
                        {
                            avaibleRooms.map((number, index) => {
                                return <option key={index} value={number}>{number}</option>
                            })
                        }
                    </Select>

                    <Label htmlFor="check_in">Check In:</Label>
                    <Input type="date" name="check_in" id="check_in" value={formData.check_in} onChange={handleInputChange} required/>

                    <Label htmlFor="check_out">Check Out:</Label>
                    <Input type="date" name="check_out" id="check_out" value={formData.check_out} onChange={handleInputChange} required/>

                    <Button type="submit" form="new-room">
                        Submit
                    </Button>
                </GridContainer>
            </Form>
        </>
    );
}

export default NewBooking ;

const avaibleRooms = [13, 19, 23, 27, 29, 42, 49, 53, 59, 66, 76, 77, 84, 93, 94, 100];