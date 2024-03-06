interface AuthProvider {
    isAuthenticated: boolean;
    username: string | null;
    password: string | null;
    email: string | null;
    signin(username: string, password: string): Promise<void>;
    signout(): Promise<void>;
}

const storedUser = localStorage.getItem('__user__');
let userJSON;
if(storedUser) {
    userJSON = JSON.parse(storedUser);
} else {
    userJSON = null;
}
const user = userJSON ? userJSON.username : null;
const password = userJSON ? userJSON.password : null;

export const fakeAuthProvider: AuthProvider = {
    isAuthenticated: Boolean(user),
    username: user,
    password: password,
    email: "init1.dev@gmail.com",
    async signin(username: string, password: string) {
        await new Promise((r) => setTimeout(r, 500));

        fakeAuthProvider.isAuthenticated = true;
        fakeAuthProvider.username = username;
        fakeAuthProvider.password = password;

        localStorage.setItem('__user__', JSON.stringify({
            username: this.username,
            email: this.email
        }));
    },
    async signout() {
        await new Promise((r) => setTimeout(r, 500));

        fakeAuthProvider.isAuthenticated = false;
        fakeAuthProvider.username = "";
        fakeAuthProvider.password = "";

        localStorage.setItem('__user__', '');
    },
};