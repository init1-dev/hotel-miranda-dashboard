import Swal from "sweetalert2";
import { AmenitiesSelect, Button, Form, GridContainer, Input, Label, Select, TextArea, Title } from "../../../styled/Form";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { editRoom, getRoom, newRoom } from "../../../store/Rooms/roomsThunk";
import { selectRoom } from "../../../store/Rooms/roomsSlice";
import { Loader, Loading } from "../../../styled/Loading";

const MySwal = withReactContent(Swal)

function NewRoom () {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const roomData = useAppSelector(selectRoom);
    const location = useLocation().pathname;
    const isEdit = location.includes("edit");
    const currentId = isEdit ? id : null;
    const [fetched, setFetched] = useState(false);
    
    const initialFetch = useCallback(async () => {
        if(currentId){
            await dispatch(getRoom(Number(id))).unwrap();
            setFetched(true);
        }
    }, [id, currentId, dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);

    useEffect(() => {
        if(currentId) {
            (roomData.itemData) && setFormData(roomData.itemData);
        }
    }, [roomData.itemData, currentId]);

    const [formData, setFormData] = useState({
        id: 50,
        name: "Suite Premium Delux",
        photo: "/room.jpg",
        room_type: "Suite",
        room_number: 250,
        description: "A room description typically includes details such as the room's size, amenities, furnishings, and any unique features or characteristics it may have.",
        offer: 0,
        price: 550,
        cancellation: "A cancellation policy outlines the terms and conditions under which reservations can be canceled, including any applicable fees, deadlines, and procedures.",
        amenities: [ "24/7 Online Support", "Grocery", "Cleaning" ],
        discount: 0,
        status: "Available"
    });

    const handleAmenities = (e: FormEvent<HTMLFormElement>) => {
        const selectedOptions = e.currentTarget.amenities.selectedOptions;
        const values = [];
        for (let index = 0; index < selectedOptions.length; index++) {
            values.push(selectedOptions[index].value);
        }
        return values;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/dashboard/rooms");

        const formDataToUpdate = {
            ...formData,
            room_type: e.currentTarget.room_type.value,
            room_number: e.currentTarget.room_number.value,
            description: e.currentTarget.description.value,
            cancellation: e.currentTarget.cancellation.value,
            offer: e.currentTarget.offer.value,
            price: e.currentTarget.price.value,
            amenities: handleAmenities(e)
        };
        
        (currentId)
            ? dispatch(editRoom({
                id: Number(currentId),
                newData: formDataToUpdate
            }))
            : dispatch(newRoom(formDataToUpdate))

        MySwal.fire({
            text: currentId
                    ? `Room #${id} successfuly edited`
                    : `Room #${formDataToUpdate.id} successfuly created`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    return (
        (!currentId || currentId && fetched)
            ? <>
                {currentId
                        ? <Title>EDITING <small>#{currentId}</small></Title>
                        : <Title>NEW ROOM</Title>}

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
                        <Input type="file" name="photo" id="photo"/>

                        <Label htmlFor="offer">Offer:</Label>
                        <Input type="number" name="offer" id="offer" defaultValue={formData.offer} placeholder="Insert offer price"/>

                        <Label htmlFor="price">Price:</Label>
                        <Input type="number" name="price" id="price" defaultValue={formData.price} placeholder="Insert price" required/>

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
            : <Loading>
                <Loader />
            </Loading>
    );
}

export default NewRoom ;

const roomTypes = [ "Single Bed", "Double Bed", "Double Superior", "Suite" ];

const amenities = [ "Breakfast", "Smart Security", "Strong Locker", "Shower", "24/7 Online Support", "Kitchen", "Cleaning", "Expert Team", "High speed WiFi", "Air conditioner", "Towels", "Grocery", "Single bed", "Shop near" ];