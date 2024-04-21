import { AmenitiesSelect, Button, Form, GridContainer, Input, Label, Select, TextArea, Title } from "../../../styled/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { FormEvent, useContext, useEffect, useState } from "react";
import { editRoom, getRoom, newRoom } from "../../../store/Rooms/roomsThunk";
import { selectRoom } from "../../../store/Rooms/roomsSlice";
import { ThemeContext } from "styled-components";
import CustomSwal from "../../../helpers/Swal/CustomSwal";
import BackButton from "../../Buttons/BackButton";
import { isRoomExist } from "../../../helpers/API/isExist";
import { RoomForm } from "../../../helpers/API/interfaces";
import { customToast } from "../../../helpers/toastify/customToast";
import LoaderComponent from "../../Loader";

function RoomForm () {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const roomData = useAppSelector(selectRoom);
    const location = useLocation().pathname;
    const isEdit = location.includes("edit");
    const currentId = isEdit ? id : null;
    const [fetched, setFetched] = useState(false);
    const theme = useContext(ThemeContext);
    
    const initialFetch = async () => {
        if(currentId){
            await dispatch(getRoom(String(id))).unwrap();
            setFetched(true);
        }
    }

    useEffect(() => {
        initialFetch()
    }, []);

    useEffect(() => {
        if(currentId && roomData.itemData) {
            setFormData({
                ...roomData.itemData,
                _id: roomData.itemData._id ?? ""
            });
        }
    }, [roomData.itemData, currentId]);

    const initialRoom = {
        _id: "",
        name: "Suite Premium Delux",
        photo: "/room.jpg",
        room_type: "Suite",
        room_number: 50,
        description: "A room description typically includes details such as the room's size, amenities, furnishings, and any unique features or characteristics it may have.",
        offer: false,
        discount: 10,
        price: 55000,
        cancellation: "A cancellation policy outlines the terms and conditions under which reservations can be canceled, including any applicable fees, deadlines, and procedures.",
        amenities: [ "24/7 Online Support", "Grocery", "Cleaning" ],
        status: "Available"
    };

    const [formData, setFormData] = useState(initialRoom);

    const handleAmenities = (formValue: HTMLFormElement) => {
        const selectedOptions = formValue.selectedOptions;
        const values = [];
        for (let index = 0; index < selectedOptions.length; index++) {
            values.push(selectedOptions[index].value);
        }
        return values;
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as RoomForm;
        
        try {
            const isExist = await isRoomExist(form.room_number.value, currentId);

            if(isExist){
                customToast('error', 'Room already exist');
                throw new Error("Room already exist");
            }
            
            const formDataToUpdate = {
                ...formData,
                room_type: form.room_type.value,
                room_number: form.room_number.value,
                description: form.description.value,
                cancellation: form.cancellation.value,
                offer: form.discount.value > 0 ? true : false,
                price: Number((form.price.value * 100).toFixed(2)),
                discount: form.discount.value,
                amenities: handleAmenities(form.amenities),
                photo: form.photo.value
            };

            if(currentId){
                dispatch(editRoom({
                    id: String(currentId),
                    newData: formDataToUpdate
                }))
            } else {
                dispatch(newRoom(formDataToUpdate))
            }
    
            const swalProps = {
                text: currentId
                        ? `Room #${id} successfully edited`
                        : `Room #${formDataToUpdate._id} successfully created`,
                icon: 'success' as const,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }
    
            navigate("/dashboard/rooms");
    
            await CustomSwal({data: swalProps, theme: theme})

        } catch (error) {
            throw new Error(`${error}`);
        }
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
                            NEW ROOM
                        </span>
                        <BackButton />
                    </Title>}

                <Form id="new-room" name="new-room" onSubmit={(e)=> handleSubmit(e)}>
                    <GridContainer>
                        <Label htmlFor="room_type">Room Type:</Label>
                        <Select name="room_type" id="room_type" required>
                            <option defaultValue={formData.room_type} hidden>{formData.room_type}</option>
                            {
                                roomTypes.map((type, index) => {
                                    return <option key={index} value={type}>{type}</option>
                                })
                            }
                        </Select>

                        <Label htmlFor="room_number">Room Number:</Label>
                        <Input type="number" name="room_number" id="room_number" defaultValue={formData.room_number} placeholder="Room number" required/>

                        <Label htmlFor="description">Description:</Label>
                        <TextArea name="description" id="description" cols={30} rows={10} defaultValue={formData.description} placeholder="Insert room description" required>
                        </TextArea>

                        <Label htmlFor="cancellation">Cancelation Policy:</Label>
                        <TextArea name="cancellation" id="cancellation" cols={30} rows={10} defaultValue={formData.cancellation} placeholder="Insert cancelation policy" required>
                        </TextArea>
                    </GridContainer>

                    <GridContainer>
                        <Label htmlFor="photo">Load Images:</Label>
                        <Input type="text" name="photo" id="photo" defaultValue={formData.photo} placeholder="Insert photo url"/>

                        <Label htmlFor="discount">Offer:</Label>
                        <Input type="number" name="discount" id="discount" defaultValue={formData.discount} placeholder="Insert discount"/>

                        <Label htmlFor="price">Price:</Label>
                        <Input type="number" name="price" id="price" defaultValue={(formData.price / 100).toFixed(2)} placeholder="Insert price" required/>

                        <Label htmlFor="amenities">Amenities:</Label>
                        <AmenitiesSelect multiple name="amenities" id="amenities" defaultValue={formData.amenities} required>
                            {
                                amenities.map((type, index) => {
                                    return <option key={index}>{type}</option>
                                })
                            }
                        </AmenitiesSelect>
                        <Button type="submit" form="new-room">
                            Submit
                        </Button>
                    </GridContainer>
                </Form>
            </>
            : <LoaderComponent />
    );
}

export default RoomForm ;

const roomTypes = [ "Single Bed", "Double Bed", "Double Superior", "Suite" ];

const amenities = [ "Breakfast", "Smart Security", "Strong Locker", "Shower", "24/7 Online Support", "Kitchen", "Cleaning", "Expert Team", "High speed WiFi", "Air conditioner", "Towels", "Grocery", "Single bed", "Shop near" ];