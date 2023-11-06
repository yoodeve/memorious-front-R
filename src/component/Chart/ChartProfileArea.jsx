import React from "react";
import { profileContainer, profileWrapper } from "./style";
/** @jsxImportSource @emotion/react */

function ChartProfileArea({ profileName, imgSrc }) {
    return (
        <div css={profileContainer}>
            <div css={profileWrapper}>
                <div className="profile-img-wrapper">
                    <img src={imgSrc} alt="" />
                </div>
                <span>{profileName}</span>
                <button>상세보기</button>
            </div>
        </div>
    );
}

export default ChartProfileArea;
