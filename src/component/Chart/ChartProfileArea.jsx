/* eslint-disable no-unused-vars */
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
// import { useRecoilState } from "recoil";
import { profileContainer, profileWrapper, userSelectedButton } from "./style";
import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";
/** @jsxImportSource @emotion/react */

function ChartProfileArea({ index, user }) {
    const [chartLabel, setChartLabel] = useRecoilState(rcUserOnChartArray);
    const [checked, setChecked] = useState(false);

    const onAddLabelList = useCallback(
        e => {
            setChartLabel(el => {
                return el.map((obj, i) => {
                    return parseInt(e.target.id, 10) === i ? { ...obj, checked: !obj.checked } : obj;
                });
            });
        },
        [checked],
    );

    useLayoutEffect(() => {
        chartLabel?.forEach(e => {
            console.log(e);
            setChecked(e.checked);
        });
    }, [chartLabel]);

    return (
        <div css={profileContainer}>
            <div css={profileWrapper}>
                <div className="profile-img-wrapper">
                    <img src={user.imgSrc} alt="" />
                </div>
                <span>{user.nickname}</span>
                <div css={userSelectedButton}>
                    <input id={index} type="checkbox" checked={user.checked} onChange={onAddLabelList} />
                    <label htmlFor={index} />
                </div>
            </div>
        </div>
    );
}

export default ChartProfileArea;
