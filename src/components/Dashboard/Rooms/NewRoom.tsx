import { AmenitiesSelect, Button, Form, GridContainer, Input, Label, Select, TextArea, Title } from "../../../styled/Form";

function NewRoom () {

    return (
        <>
            <Title>NEW ROOM</Title>

            <Form id="new-room" name="new-room" action="">
                <GridContainer>
                    <Label htmlFor="room-type">Room Type:</Label>
                    <Select name="room-type" id="room-type" required>
                        <option value="" selected hidden>Click to see options</option>
                        {
                            roomTypes.map((type, index) => {
                                return <option key={index} value={type.value}>{type.label}</option>
                            })
                        }
                    </Select>

                    <Label htmlFor="room-number">Room Number:</Label>
                    <Input type="number" name="room-number" id="room-number" placeholder="Room number" required/>

                    <Label htmlFor="description">Description:</Label>
                    <TextArea name="description" id="description" cols={30} rows={10} placeholder="Insert room description" required>
                    </TextArea>

                    <Label htmlFor="cancelation-policy">Cancelation Policy:</Label>
                    <TextArea name="cancelation-policy" id="cancelation-policy" cols={30} rows={10} placeholder="Insert cancelation policy" required>
                    </TextArea>
                </GridContainer>

                <GridContainer>
                    <Label htmlFor="files">Load Images:</Label>
                    <Input type="file" name="files" id="files"/>

                    <Label htmlFor="offer">Offer:</Label>
                    <Input type="number" name="offer" id="offer" placeholder="Insert offer price"/>

                    <Label htmlFor="price">Price:</Label>
                    <Input type="number" name="price" id="price" placeholder="Insert price" required/>

                    

                    <Label htmlFor="amenities">Amenities:</Label>
                    <AmenitiesSelect multiple name="amenities" id="amenities" required>
                        {
                            amenities.map((type, index) => {
                                return <option key={index} value={type.value}>{type.label}</option>
                            })
                        }
                    </AmenitiesSelect>
                    <Button type="submit" form="new-room">
                        Submit
                    </Button>
                </GridContainer>
            </Form>
        </>
    );
}

export default NewRoom ;

const roomTypes = [
    {
        label: "Single Bed",
        value: "single-bed"
    },
    {
        label: "Double Bed",
        value: "double-bed"
    },
    {
        label: "Double Superior",
        value: "double-superior"
    },
    {
        label: "Suite",
        value: "suite"
    }
];

const amenities = [
    {
        label: "Breakfast",
        value: "breakfast"
    },
    {
        label: "Smart Security",
        value: "smart-security"
    },
    {
        label: "Strong Locker",
        value: "strong-locker"
    },
    {
        label: "Shower",
        value: "shower"
    },
    {
        label: "24/7 Online Support",
        value: "24-online-support"
    },
    {
        label: "Kitchen",
        value: "kitchen"
    },
    {
        label: "Cleaning",
        value: "cleaning"
    },
    {
        label: "Expert Team",
        value: "expert-team"
    },
    {
        label: "High speed WiFi",
        value: "high-speed-wifi"
    },
    {
        label: "Air conditioner",
        value: "air-conditioner"
    },
    {
        label: "Towels",
        value: "towels"
    },
    {
        label: "Grocery",
        value: "grocery"
    },
    {
        label: "Single bed",
        value: "single-bed"
    },
    {
        label: "Shop near",
        value: "shop-near"
    },
]