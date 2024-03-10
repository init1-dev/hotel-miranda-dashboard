import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const title = (location: string) => {
    switch (true) {
        // case location.startsWith('/dashboard/bookings/edit/'):
        //     return { route: "Bookings", sub: "/ Edit Booking"}
        // case location.startsWith('/dashboard/bookings/new'):
        //     return { route: "Bookings", sub: "/ New Booking"}
        case location.startsWith('/dashboard/bookings/'):
            return { route: "Bookings", sub: "Dashboard > Bookings > Booking Details"}
        case location.startsWith('/dashboard/bookings'):
            return { route: "Bookings", sub:"Dashboard > Bookings"}

        // case location.startsWith('/dashboard/rooms/edit/'):
        //     return { route: "Rooms", sub: "/ Edit Room"}
        case location.startsWith('/dashboard/rooms/new'):
            return { route: "Bookings", sub: "Dashboard > Rooms > New Room"}
        case location.startsWith('/dashboard/rooms/'):
            return { route: "Rooms", sub: "Dashboard > Rooms > Room Details"}
        case location.startsWith('/dashboard/rooms'):
            return { route: "Rooms", sub:"Dashboard > Rooms"}

        // case location.startsWith('/dashboard/employees/edit/'):
        //     return { route: "Employees", sub: "/ Edit Employee"}
        case location.startsWith('/dashboard/employees/new'):
            return { route: "Bookings", sub: "Dashboard > Employees > New Employee"}
        case location.startsWith('/dashboard/employees/'):
            return { route: "Employees", sub: "Dashboard > Employees > Employee Details"}
        case location.startsWith('/dashboard/employees'):
            return { route: "Employees", sub:"Dashboard > Employees"}

        case location.startsWith('/dashboard/messages'):
            return { route: "Messages", sub:"Dashboard > Customer Reviews"}
            
        default:
            return { route: "Dashboard", sub:""};
    }
}

const TitleComponent = () => {
    const location = useLocation().pathname;
    const route = title(location);
    const array = route.sub.split(">");

    return (
        <Location>
            <h4>{route.route}</h4>
            <small>{array.map((element, index) => {
                const formated = element.trim().toLowerCase();

                (formated === "") && ""
                
                return (formated === "dashboard")
                    ? (
                        <StyledLink key={index} to={`/dashboard`}>
                            {element + ">"}
                        </StyledLink>
                    )

                    : (
                        (index === (array.length - 1)) 
                            ? (
                                <span key={index}>
                                    {element}
                                </span>
                            ) 
                            
                            : (
                                <StyledLink key={index} to={`/dashboard/${formated}`}>
                                    {element + ">"}
                                </StyledLink>
                            )
                    )
            })}</small>
        </Location>
    )
}

const Location = styled.div`
    font: normal normal 600 20px Poppins;
    text-transform: capitalize;
    line-height: 22px;

    h4 {
        font-size: 20px;
    }

    small {
        font-size: 12px;
    }
`

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.text};
    text-decoration: none;
`

export default TitleComponent;