import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { selecEmployee } from "../../store/Employees/employeesSlice";
import { Title } from "../../styled/Form";
import { ImageContainer, ImageDiv, InfoContainer, InfoContainerRow, Preview, TextDiv, TopContainerRow, TopContainerRowXl } from "../../styled/Preview";
import { useEffect, useState } from "react";
import { getEmployee } from "../../store/Employees/employeesThunk";
import { SpanStyledCheckIn, SpanStyledCheckOut } from "../../styled/Span";
import { format } from "date-fns";
import BackButton from "../../components/Buttons/BackButton";
import LoaderComponent from "../../components/Loader";

function Employee () {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const employeeData = useAppSelector(selecEmployee);
    const [fetched, setFetched] = useState(false);

    const initialFetch = async () => {
        await dispatch(getEmployee(String(id)));
        setFetched(true);
    }

    useEffect(() => {
        initialFetch()
    }, []);

    return (
        <>  
            {
                (employeeData.status === "fulfilled" && fetched)
                    ? 
                        <>
                            <Title>
                                <p>
                                    EMPLOYEE INFO: <small>
                                        #{employeeData.itemData && employeeData.itemData._id}
                                    </small>
                                </p>
                                <BackButton />
                            </Title>

                            <Preview>

                                <InfoContainer>
                                    <TopContainerRow>
                                        <ImageDiv>
                                            <img src={employeeData.itemData && employeeData.itemData.photo} alt="imagen de perfil" />
                                        </ImageDiv>
                                        <TextDiv>
                                            <h3>{employeeData.itemData && employeeData.itemData.fullname}</h3>
                                            <small>#{employeeData.itemData && employeeData.itemData._id}</small>
                                            <p>
                                                <small>
                                                    ({employeeData.itemData && employeeData.itemData.employee_type})
                                                </small>
                                            </p>
                                        </TextDiv>
                                    </TopContainerRow>

                                    <InfoContainerRow>
                                        <span>
                                            <small>Email:</small>
                                            <h5>{employeeData.itemData && employeeData.itemData.email}</h5>
                                        </span>
                                        <span>
                                            <small>Phone:</small>
                                            <h5>{employeeData.itemData && employeeData.itemData.phone}</h5>
                                        </span>
                                    </InfoContainerRow>
                                    <hr />
                                    <InfoContainerRow>
                                        <span>
                                            <small>Employee ID:</small>
                                            <h5>{employeeData.itemData && employeeData.itemData._id}</h5>
                                        </span>
                                        <span>
                                            <small>Start Date:</small>
                                            <h5>{employeeData.itemData && format( new Date(`${employeeData.itemData.start_date}`), 'MMM do, yyyy')}</h5>
                                        </span>
                                    </InfoContainerRow>

                                    <TopContainerRowXl>
                                        <span>
                                            <small>Description:</small>
                                            <h5>{employeeData.itemData && employeeData.itemData.description}</h5>
                                        </span>
                                    </TopContainerRowXl>
                                    
                                </InfoContainer>

                                <ImageContainer>
                                        {employeeData.itemData && employeeData.itemData.status 
                                            && <SpanStyledCheckIn>
                                                    {employeeData.itemData.status ? "Activo" : "Inactivo"}
                                                </SpanStyledCheckIn> }
                                        {employeeData.itemData && !employeeData.itemData.status
                                            && <SpanStyledCheckOut>
                                                    {employeeData.itemData.status ? "Activo" : "Inactivo"}
                                                </SpanStyledCheckOut> }
                                    <img src={employeeData.itemData && employeeData.itemData.photo} alt="" />
                                </ImageContainer>

                            </Preview>
                        </>
                    : <LoaderComponent />
            }
            
            


        </>
    );
}

export default Employee ;