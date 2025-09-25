import React from "react";
import { AuthService } from "../services/AuthService";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

type Props = {
    children: React.ReactNode;
}

export default function AdminRoute({ children }: Props) {
    const { user, isLoading } = useUser();

    if (isLoading) {
        return <div>Učitavanje...</div>
    }

    if (user && user.role == 'admin') {
        return <>{children}</>
    } else {
        return <Navigate to="/" />
    }

}