import React, { useCallback, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileContainer, profileWrapper, userSelectedButton } from "./style";
import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";

/** @jsxImportSource @emotion/react */

function ChartProfileArea({ index, profileName, imgSrc }) {
    const [chartLabel, setChartLabel] = useRecoilState(rcUserOnChartArray);
    const [checked, setChecked] = useState(false);

    useLayoutEffect(() => {
        setChartLabel(["유정", "정어리"]);
    }, []);

    const onAddLabelList = useCallback(
        profile => () => {
            setChartLabel(prevLabels => {
                const updatedLabels = prevLabels.includes(profile) ? prevLabels.filter(e => e !== profile) : [...prevLabels, profile];
                return updatedLabels;
            });
            setChecked(chartLabel.includes(profileName));
        },
        [checked],
    );

    useLayoutEffect(() => {
        setChecked(chartLabel.includes(profileName));
    }, [chartLabel]);

    return (
        <div css={profileContainer}>
            <div css={profileWrapper}>
                <div className="profile-img-wrapper">
                    <img src={imgSrc} alt="" />
                </div>
                <span>{profileName}</span>
                <div css={userSelectedButton}>
                    <input id={index} type="checkbox" checked={checked} onChange={onAddLabelList(profileName)} />
                    <label htmlFor={index} />
                </div>
            </div>
        </div>
    );
}

export default ChartProfileArea;
