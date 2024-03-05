import { redirect } from "react-router-dom";
import { fakeAuthProvider } from "../AuthProvider";

async function loginLoader() {
    if (fakeAuthProvider.isAuthenticated) {
        return redirect("/dashboard");
    }
    return null;
}

export default loginLoader;