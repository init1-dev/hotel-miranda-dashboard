import styled from "styled-components";

function NewEmployee () {
    return (
        <>
            <Title>NEW EMPLOYEE</Title>

            <Form id="new-employee" name="new-employee" action="">
                <GridContainer>

                    <Label htmlFor="fullname">Fullname:</Label>
                    <Input type="text" name="fullname" id="fullname" placeholder="Insert employee name" required/>

                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" name="email" id="email" placeholder="Insert employee email" required/>

                    <Label htmlFor="phone">Phone:</Label>
                    <Input type="tel" name="phone" id="phone" placeholder="Insert employee phone" required/>

                    <Label htmlFor="description">Description:</Label>
                    <TextArea name="description" id="description" cols={30} rows={10} placeholder="Insert employee description" required>
                    </TextArea>
                </GridContainer>

                <GridContainer>
                    <Label htmlFor="files">Load Photo:</Label>
                    <Input type="file" name="files" id="files" required/>

                    <Label htmlFor="room-type">Employee Type:</Label>
                    <Select name="room-type" id="room-type" required>
                        <option value="" selected hidden>Click to see options</option>
                        {
                            EmployeeTypes.map((type, index) => {
                                return <option key={index} value={type.value}>{type.label}</option>
                            })
                        }
                    </Select>

                    <Label htmlFor="start-date">Start Date:</Label>
                    <Input type="date" name="start-date" id="start-date" required/>

                    <Label htmlFor="employee-status">Status:</Label>
                    <Select name="employee-status" id="employee-status" required>
                        <option value="" selected hidden>Click to see options</option>
                        {
                            EmployeeStatus.map((type, index) => {
                                return <option key={index} value={type.value}>{type.label}</option>
                            })
                        }
                    </Select>

                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" name="password" id="password" placeholder="Insert employee password" required/>
                    
                    <Button type="submit" form="new-employee">
                        Submit
                    </Button>
                </GridContainer>
            </Form>
        </>
    );
}

const Title = styled.h1`
    margin: 0 15% 0 15%;
`

const Form = styled.form`
    background-color: ${({ theme }) => theme.contentBg};
    padding: 2rem;
    border-radius: 0.5rem;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    margin: 1rem 15% 0 15%;
    box-shadow: 1px 1px 5px black;
`

const GridContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
`

const Label = styled.label`
    display: block;
`

const Input = styled.input`
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
`

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
`

const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
`

const Button = styled.button`
    color: white;
`

const EmployeeTypes = [
    {
        label: "Maintenance",
        value: "maintenance"
    },
    {
        label: "Receptionist",
        value: "receptionist"
    },
    {
        label: "Kitchen",
        value: "kitchen"
    },
    {
        label: "Rooms",
        value: "rooms"
    },
    {
        label: "Support",
        value: "support"
    },
    {
        label: "Sales",
        value: "sales"
    },
    {
        label: "Marketing",
        value: "marketing"
    },
];

const EmployeeStatus = [
    {
        label: "Active",
        value: "active"
    },
    {
        label: "Inactive",
        value: "inactive"
    }
];

export default NewEmployee ;