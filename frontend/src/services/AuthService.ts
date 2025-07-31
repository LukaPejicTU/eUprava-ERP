
export const AuthService = {

    setToken(token:string) {
        localStorage.setItem("token", token);
    },

    getToken(): string | null {
        return localStorage.getItem("token");
    },

    isLoggedIn() {
        return this.getToken() !== null;
    }
}