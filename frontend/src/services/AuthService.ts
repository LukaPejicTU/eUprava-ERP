
export const AuthService = {

    setToken(token:string) {
        localStorage.setItem("token", token);
    },

    getToken(): string | null {
        return localStorage.getItem("token");
    },

    isLoggedIn() {
        return this.getToken() !== null;
    },

    logout() {
        localStorage.removeItem("token");
    },

    authorizedFetch(input: RequestInfo, init: RequestInit = {}) {
        const token = this.getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }
        const headers = new Headers(init.headers || {});
        headers.set("Authorization", `Bearer ${token}`);
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }        
        return fetch(input, {
            ...init,
            headers,
        });
    }

}