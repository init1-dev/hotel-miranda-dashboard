import MessagesSlider from "../components/Dashboard/Messages/MessagesSlide";
import Calendar from "../components/Calendar/Calendar";
import KpisComponent from "../components/Dashboard/KPIs/KpisComponent";

function Dashboard() {
    
    return (
        <>
            <KpisComponent />

            {/* <h2>CALENDARIO Y GRAFICOS</h2> */}
            <Calendar />
            {/* <h2>BOOKINGS STATISTICS</h2> */}
            <MessagesSlider />
        </>
    );
}



export default Dashboard;