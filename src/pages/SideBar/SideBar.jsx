/* eslint-disable no-unused-vars */
import { css } from "@emotion/react";
import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { Reset } from "styled-reset";
import SidebarContainer from "../../component/Sidebar";
import { instance } from "../../config";
/** @jsxImportSource @emotion/react */

export const mainContainer = css`
    display: flex;
    justify-content: flex-start;
    min-width: 1300px;
    width: 75%;
    height: 100vh;
    margin: 0 auto;
    box-shadow:
        rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px;
    * {
        box-sizing: border-box;
        font-family: "Pretendard-Medium";
        font-size: 14px;
        pre {
            font-size: 0.9rem;
            line-height: 1rem;
            white-space: pre-wrap;
        }
    }
`;

const contentsContainer = css`
    width: 100%;
    max-width: 1300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function SideBar() {
    const getPrincipal = useQuery(
        ["getPrincipal"],
        async () => {
            try {
                const option = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };

                return await instance.get("/api/account/principal", option);
            } catch (err) {
                window.location.replace("/auth/oauth2/signin");
                throw new Error(err);
            }
        },
        {
            retry: 0,
            refetchInterval: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
        },
    );

    return getPrincipal.isSuccess ? (
        <>
            <Reset />
            <div id="parent-container" css={mainContainer}>
                <SidebarContainer principal={!getPrincipal.isLoading && getPrincipal.data.data} />
                <div css={contentsContainer}>{!getPrincipal.isLoading && <Outlet />}</div>
            </div>
        </>
    ) : null;
}

export default SideBar;
