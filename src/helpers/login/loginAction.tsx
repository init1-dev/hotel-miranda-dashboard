import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../AuthProvider";

async function loginAction({ request }: LoaderFunctionArgs) {
    const formData = await request.formData();
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Validate our form inputs and return validation errors via useActionData()
    if (!username) {
        return {
            error: "You must provide a username to log in",
        };
    }

    // Sign in and redirect to the proper destination if successful.
    try {
        await fakeAuthProvider.signin(username, password);
    } catch (error) {
        // Unused as of now but this is how you would handle invalid
        // username/password combinations - just like validating the inputs
        // above
        return {
            error: "Invalid login attempt",
        };
    }

    const redirectTo = formData.get("redirectTo") as string | null;
    console.log(redirectTo);
    
    return redirect(redirectTo || "/");
}

export default loginAction;