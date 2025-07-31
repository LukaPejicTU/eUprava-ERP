import React from "react";
import { AuthService } from "../services/AuthService";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    if (!AuthService.isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
