import { getTokenFromLocalStorage } from "../localStorage/getTokenFromLocalStorage";
import { employeesCollection, roomsCollection } from "./apiVariables";
import { fetchFromApi } from "./fetchFromApi";

export const isUserExist = async(email: string, currentId: string | null | undefined) => {
    const token = getTokenFromLocalStorage();
    const isUserExist = await fetchFromApi("GET", `${employeesCollection}/getUser/${email}`, token);

    if(isUserExist?.data !== null && currentId === null){
        return true;
    }

    return false;
}

export const isRoomExist = async(number: string, currentId: string | null | undefined) => {
    const token = getTokenFromLocalStorage();
    const isRoomExist = await fetchFromApi("GET", `${roomsCollection}/getRoom/${number}`, token);

    if(isRoomExist?.data !== null && currentId === null){
        return true;
    }

    return false;
}