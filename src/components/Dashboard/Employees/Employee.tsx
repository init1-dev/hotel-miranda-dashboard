import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { selecEmployee } from "../../../store/Employees/employeesSlice";
import { Title } from "../../../styled/Form";
import { ImageContainer, ImageDiv, InfoContainer, InfoContainerRow, Preview, TextDiv, TopContainerRow } from "../../../styled/Preview";
import { useEffect } from "react";
import { getEmployee } from "../../../store/Employees/employeesThunk";
import { Loader, Loading } from "../../../styled/Loading";
import { SpanStyledCheckIn, SpanStyledCheckOut } from "../../../styled/Span";
import { format } from "date-fns";

function Employee () {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const employeeData = useAppSelector(selecEmployee);

    useEffect(() => {
        dispatch(getEmployee(Number(id)));
    }, [dispatch, id]);

    return (
        <>  
            {
                employeeData.status === "fulfilled"
                    ? 
                        <>
                            <Title>
                                EMPLOYEE INFO: #{employeeData.itemData && employeeData.itemData.id}
                            </Title>

                            <Preview>

                                <InfoContainer>
                                    <TopContainerRow>
                                        <ImageDiv>
                                            <img src={employeeData.itemData && employeeData.itemData.photo} alt="imagen de perfil" />
                                        </ImageDiv>
                                        <TextDiv>
                                            <h3>{employeeData.itemData && employeeData.itemData.fullname}</h3>
                                            <small>#{employeeData.itemData && employeeData.itemData.id}</small>
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
                                            <h5>{employeeData.itemData && employeeData.itemData.employee_id}</h5>
                                        </span>
                                        <span>
                                            <small>Start Date:</small>
                                            <h5>{employeeData.itemData && format( new Date(`${employeeData.itemData.start_date}`), 'MMM do, yyyy')}</h5>
                                        </span>
                                    </InfoContainerRow>

                                    <InfoContainerRow>
                                        <span>
                                            <small>Description:</small>
                                            <h5>{employeeData.itemData && employeeData.itemData.description}</h5>
                                        </span>
                                    </InfoContainerRow>
                                    
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
                                    <div>
                                        <h4>
                                            {employeeData.itemData && employeeData.itemData.type}
                                        </h4>

                                        <p>
                                            {employeeData.itemData && employeeData.itemData.description}
                                        </p>
                                    </div>

                                    <img src={employeeData.itemData && employeeData.itemData.photo} alt="" />
                                </ImageContainer>

                            </Preview>
                        </>
                    : <Loading>
                    <Loader />
                </Loading>
            }
            
            


        </>
    );
}

export default Employee ;