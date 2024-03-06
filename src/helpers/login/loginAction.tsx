import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../AuthProvider";

async function loginAction({ request }: LoaderFunctionArgs) {
    const formData = await request.formData();
    const username = (formData.get("username") as string).trim().toLocaleLowerCase();
    const password = (formData.get("password") as string).trim().toLocaleLowerCase();

    if (!username || !password) {
        return {
            error: "You must provide a valid username/password to log in",
        };
    }

    try {      
        const apiUrl = "https://tararoutray.com/demo/react-auth/login.php";
        const requestOptions = {
            method: "GET"
        };

        const response = await fetch(apiUrl, requestOptions);

        if (response.ok) {
            const responseData = await response.json();

            if (responseData.status === 1 && username === "init.dev" && password === "12345") {
                await fakeAuthProvider.signin(username, password);
                const redirectTo = formData.get("redirectTo") as string | null;
                return redirect(redirectTo || "/");
            } else {
                return {
                    error: "Invalid login attempt",
                };
            }
        } else {
            throw new Error("Error de red o solicitud fallida");
        }
        
    } catch (error) {
        // Unused as of now but this is how you would handle invalid username/password combinations
        return error;
    }
}

export default loginAction;