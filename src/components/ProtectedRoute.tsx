import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userRequest } from "../api/requests";
import endpoints from "../api/routes";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await userRequest.get(endpoints.user.protectedView);

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // optional loading UI
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
