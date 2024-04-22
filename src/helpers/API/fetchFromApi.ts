import { getTokenFromLocalStorage } from "../localStorage/getTokenFromLocalStorage";
import { customToast } from "../toastify/customToast";

const databaseUrl = import.meta.env.VITE_API_URL;

interface FetchResponse extends Response{
    status: number;
    data: any;
}

export const fetchFromApi = async(
    requestMethod: string, 
    path: string, 
    body?: any,
    requestOptions?: object
): Promise<FetchResponse | null> => {

    if(!['GET', 'POST', 'PUT', 'DELETE', 'LOGIN'].includes(requestMethod.toUpperCase())){
        throw new Error('Invalid request method. Allowed methods: GET, POST, PUT, DELETE, LOGIN.');
    }

    if (!path.trim()) {
        throw new Error('Query parameter cannot be empty.');
    }

    const url: string = `${databaseUrl}/${path}/`;

    let fetchOptions: RequestInit = {
        method: requestMethod === 'LOGIN' ? 'POST' : requestMethod,
        headers: undefined,
        body: body ? JSON.stringify(body) : undefined
    }

    if(body){
        fetchOptions.headers = {
            'Content-Type': 'application/json'
        };
    }

    if(requestMethod !== 'LOGIN'){
        const token = getTokenFromLocalStorage();
        fetchOptions.headers = {
            ...fetchOptions.headers,
            'Authorization': `Bearer ${token}`
        }
    }

    if(requestOptions){
        fetchOptions.headers = {
            ...fetchOptions.headers,
            ...requestOptions
        }
    }

    try {
        const response = await fetch(url, fetchOptions);

        if(!response.ok){
            if(response.status === 401) {
                customToast('error', 'Incorrect username/password');
            } else if (response.status >= 500){
                customToast('error', 'Server error. Please try again later');
            } else {
                customToast('error', 'Request could not be completed successfully');
            }
        }

        const contentType = response.headers.get('content-type');
        if(contentType && contentType.includes('application/json')){
            const data = await response.json();
            
            return data;
        }
        return null;
        
    } catch (error) {
        console.error('Error while making request:', error);
        throw error;
    }
}