import { BookingData, EmployeeData, MessageData, RoomData } from "../../store/interfaces";

// const databaseUrl = 'https://4oi46otzmb.execute-api.eu-west-3.amazonaws.com/dev';
const databaseUrl = 'http://localhost:3000';

interface FetchResponse {
    status: number;
    data: BookingData[] | RoomData[] | EmployeeData[] | MessageData[];
}

export const fetchFromApi = async(requestMethod: string, query: string, token: string, requestOptions?: RequestInit): Promise<FetchResponse | undefined> => {
    const url: string = `${databaseUrl}/${query}/`;
    const requestHeaders: HeadersInit = {
        'Authorization': token
    };

    const fetchOptions: RequestInit = {
        method: requestMethod,
        headers: requestHeaders,
        ...requestOptions
    };

    try {
        const response = await fetch(url, fetchOptions);
        if(!response.ok){
            throw new Error('Request could not be completed successfully');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error while making request:", error);
        throw error;
    }
}