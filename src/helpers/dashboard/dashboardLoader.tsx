import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { fakeAuthProvider } from "../AuthProvider";

function protectedLoader({ request }: LoaderFunctionArgs) {
    // If the user is not logged in and tries to access `/dashboard`, we redirect
    // them to `/login` with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (!fakeAuthProvider.isAuthenticated) {
        const params = new URLSearchParams();

        params.set("from", new URL(request.url).pathname);
        
        return redirect("/login?" + params.toString());
    }
    return null;
}

export default protectedLoader;