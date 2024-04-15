import { customToast } from "../toastify/customToast";

const databaseUrl = 'https://4oi46otzmb.execute-api.eu-west-3.amazonaws.com/dev';
// const databaseUrl = 'http://localhost:3000';

interface FetchResponse extends Response{
    status: number;
    data: any;
}

export const fetchFromApi = async(requestMethod: string, query: string, token?: string | null, body?: any, requestOptions?: object): Promise<FetchResponse | null> => {

    if(!['GET', 'POST', 'PUT', 'DELETE'].includes(requestMethod.toUpperCase())){
        throw new Error('Invalid request method. Allowed methods: GET, POST, PUT, DELETE.');
    }

    if (!query.trim()) {
        throw new Error('Query parameter cannot be empty.');
    }

    const url: string = `${databaseUrl}/${query}/`;

    let fetchOptions: RequestInit = {
        method: requestMethod,
        headers: {
            'Authorization': `Bearer ${token}` || ""
        },
        body: undefined
    }

    if(requestOptions){
        fetchOptions.headers = {
            ...fetchOptions.headers,
            ...requestOptions
        }
    }

    if(body) {
        fetchOptions.headers = {
            ...fetchOptions.headers,
            'Content-Type': 'application/json'
        };

        fetchOptions.body = JSON.stringify(body);
    }

    console.log(fetchOptions);

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
            console.log(data);
            
            return data;
        }
        return null;
        
    } catch (error) {
        console.error('Error while making request:', error);
        throw error;
    }
}