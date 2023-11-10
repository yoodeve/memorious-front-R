import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../config";

function Oauth2Redirect({ type }) {
    const navigate = useNavigate();
    const token = new URL(window.location.href).searchParams.get("token");

    useEffect(() => {
        if (type === "naver") {
            instance
                .get("/api/auth/oauth2/signin", {
                    headers: {
                        Authorization: token,
                    },
                })
                .then(res => {
                    console.log(res);
                    localStorage.setItem("accessToken", `Bearer ${res.data}`);
                    navigate("/");
                });
        }
    }, [type]);
    return <>Redirecting</>;
}

export default Oauth2Redirect;
