import React, { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { profileContainer, profileWrapper, userSelectedButton } from "./style";
import { rcChartLabelList } from "../../store/atoms/chartAtoms";
/** @jsxImportSource @emotion/react */

function ChartProfileArea({ profileName, imgSrc }) {
    const [isBtnSelected, setIsBtnSelected] = useState(false);
    const setChartLabel = useSetRecoilState(rcChartLabelList);
    const onAddLabelList = useCallback(() => {
        setIsBtnSelected(b => !b);
    }, []);

    const onAddList = user => {
        setChartLabel(chartLabel => (chartLabel.includes(user) ? chartLabel.filter(e => e !== user) : [...chartLabel, user]));
    };

    return (
        <div css={profileContainer}>
            <div css={profileWrapper}>
                <div className="profile-img-wrapper">
                    <img src={imgSrc} alt="" />
                </div>
                <span>{profileName}</span>
                <button
                    onClick={() => {
                        onAddList(profileName);
                        onAddLabelList();
                    }}
                    css={userSelectedButton(isBtnSelected)}
                >
                    상세보기
                </button>
            </div>
        </div>
    );
}

export default ChartProfileArea;
