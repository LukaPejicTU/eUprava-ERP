import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../services/UserService";
import { AuthService } from "../services/AuthService";

interface UserContextType {
    user: User | null;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await AuthService.getMe();
                setUser(currentUser);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}