import MessagesSlider from "../components/Dashboard/Messages/MessagesSlide";
import Calendar from "../components/Calendar/Calendar";
import KpisComponent from "../components/Dashboard/KPIs/KpisComponent";

function Dashboard() {
    
    return (
        <>
            <KpisComponent />

            <Calendar />

            <MessagesSlider />
        </>
    );
}



export default Dashboard;