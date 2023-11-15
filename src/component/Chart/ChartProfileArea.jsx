import React, { useCallback, useLayoutEffect, useState } from "react";
// import { useRecoilState } from "recoil";
import { profileContainer, profileWrapper, userSelectedButton } from "./style";
// import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";

/** @jsxImportSource @emotion/react */

function ChartProfileArea({ index, user, userList }) {
    const [chartLabel, setChartLabel] = useState(userList.map(e => e.nickname));
    const [checked, setChecked] = useState(false);

    const onAddLabelList = useCallback(
        profile => () => {
            setChartLabel(prevLabels => {
                const updatedLabels = prevLabels.includes(profile) ? prevLabels.filter(e => e !== profile) : [...prevLabels, profile];
                return updatedLabels;
            });
            setChecked(chartLabel.includes(user.nickname));
        },
        [checked],
    );

    useLayoutEffect(() => {
        setChecked(chartLabel.includes(user.nickname));
    }, [chartLabel]);

    return (
        <div css={profileContainer}>
            <div css={profileWrapper}>
                <div className="profile-img-wrapper">
                    <img src={user.imgSrc} alt="" />
                </div>
                <span>{user.nickname}</span>
                <div css={userSelectedButton}>
                    <input id={index} type="checkbox" checked={checked} onChange={onAddLabelList(user.nickname)} />
                    <label htmlFor={index} />
                </div>
            </div>
        </div>
    );
}

export default ChartProfileArea;
