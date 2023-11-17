/* eslint-disable */
import React from "react";
import { useQueryClient } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";

function Oauth2Redirect({ type }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();

    localStorage.setItem("accessToken", "Bearer " + searchParams.get("token"));
    queryClient.refetchQueries(["getPrincipal"]);
    return <Navigate to={"/"} />;
}

export default Oauth2Redirect;
