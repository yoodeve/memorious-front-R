import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function TokenLayout() {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        if (!token) {
            navigate("/auth/oauth2/signup", { replace: false });
        } else {
            navigate("/calendar", { replace: false });
        }
    }, [token]);
    return (
        <>
            <Outlet />
        </>
    );
}

export default TokenLayout;
