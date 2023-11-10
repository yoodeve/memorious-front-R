import React from "react";
import { Global, css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

function GlobalStyle() {
    const globalStyle = css`
        @font-face {
            font-family: "Pretendard-Thin";
            font-weight: 100;
            src: url("/assets/font/Pretendard-Thin.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-ExtraLight";
            font-weight: 200;
            src: url("/assets/font/Pretendard-ExtraLight.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-Light";
            font-weight: 300;
            src: url("/assets/font/Pretendard-Light.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-Medium";
            font-weight: 400;
            src: url("/assets/font/Pretendard-Medium.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-Regular";
            font-weight: 500;
            src: url("/assets/font/Pretendard-Regular.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-SemiBold";
            font-weight: 600;
            src: url("/assets/font/Pretendard-SemiBold.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-Bold";
            font-weight: 700;
            src: url("/assets/font/Pretendard-Bold.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-ExtraBold";
            font-weight: 800;
            src: url("/assets/font/Pretendard-ExtraBold.otf");
            font-display: swap;
        }
        @font-face {
            font-family: "Pretendard-Black";
            font-weight: 900;
            src: url("/assets/font/Pretendard-Black.otf");
            font-display: swap;
        }
    `;
    return <Global styles={globalStyle} />;
}

export default GlobalStyle;
