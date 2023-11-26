/* eslint-disable */
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";

function Oauth2Redirect({ type }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();
    useEffect(() => {
        localStorage.setItem("accessToken", "Bearer " + searchParams.get("token"));
        window.location.replace("/");
    }, []);
    queryClient.refetchQueries(["getPrincipal"]);
    return <></>;
}

export default Oauth2Redirect;
