import React, { useCallback, useLayoutEffect, useState } from "react";
// import { useRecoilState } from "recoil";
import { profileContainer, profileWrapper, userSelectedButton } from "./style";
// import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";

/** @jsxImportSource @emotion/react */

function ChartProfileArea({ index, user, userList }) {
    const [chartLabel, setChartLabel] = useState(userList);
    const [checked, setChecked] = useState(false);

    const onAddLabelList = useCallback(
        nickname => () => {
            setChartLabel(prevLabels => {
                const updatedLabels = prevLabels.includes(nickname) ? prevLabels.filter(f => f !== nickname) : [...prevLabels, nickname];
                return updatedLabels;
            });
            setChecked(chartLabel.includes(user));
        },
        [checked],
    );

    useLayoutEffect(() => {
        console.log(chartLabel);
        setChecked(chartLabel.includes(user));
    }, [chartLabel]);

    return (
        <div css={profileContainer}>
            <div css={profileWrapper}>
                <div className="profile-img-wrapper">
                    <img src={user.imgSrc} alt="" />
                </div>
                <span>{user.nickname}</span>
                <div css={userSelectedButton}>
                    <input id={index} type="checkbox" checked={checked} onChange={onAddLabelList(user)} />
                    <label htmlFor={index} />
                </div>
            </div>
        </div>
    );
}

export default ChartProfileArea;
