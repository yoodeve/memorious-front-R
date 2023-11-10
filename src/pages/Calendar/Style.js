import { css } from "@emotion/react";

export const SMainContainer = css`
    /* width: 98% */
    /* width: 1102.13px; */
    height: 100%;
`;

//  onClick을 사용하기 위한 div(antd onSelect 버블링 발생)
export const SdateCellBox = css`
    width: 157px;
    height: 109px;
    cursor: pointer;
`;

// 일정li를 담는 div
export const SScheduleBox = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
    :hover {
        background-color: #f1f3f490;
        filter: brightness(95%);
    }
    & > li {
    }
`;

// 일정 li
export const SScheduleText = (color, isDayAll) => css`
    width: 157.44px; //크기를 지정해 셀 내용 보장
    padding-right: 3px;
    padding-left: 4px;
    border-radius: 5px;
    background-color: ${isDayAll === 0 ? "transparent" : color};
    color: ${isDayAll === 0 ? "black" : "white"};
    font-size: 15px;
    /* 아래쪽으로 내려가는것을 막음 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
`;
