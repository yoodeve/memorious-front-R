/* eslint-disable prettier/prettier */
import { css } from "@emotion/react";

export const SMainContainer = css`
    width: 99%;
    height: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
`;

//  onClick을 사용하기 위한 div(antd onSelect 버블링 발생)
export const SdateCellBox = height => css`
    width: 100%;
    height: ${height}px;
    cursor: pointer;
`;
export const SEmptyBox = (index, visibleSchedulesNum) => css`
    display: ${index > visibleSchedulesNum - 1 ? "none" : "flex"};
    position: relative;
    z-index: 0;
    width: 0%;
    height: 23px;
    margin-bottom: 2%;
    font-size: 1em;
    padding: 0.5px 3px 0.5px 4px;
    overflow: hidden;
    color: transparent;
    background-color: transparent;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
`;

// 일정li를 담는 div
export const SScheduleBox = (dayDiff, isAllDay, color, index, visibleSchedulesNum) => css`
    //만약
    display: ${index > visibleSchedulesNum ? "none" : "flex"};
    position: absolute;
    top: ${26 * index}px;
    align-items: center;
    width: ${dayDiff === 0 || dayDiff === 1 ? 96 : (100 + 0.435) * dayDiff - 4}%;
    border-radius: 5px;
    padding-left: 3px;
    background-color: ${!isAllDay && dayDiff === 0 ? "transparent" : color};
    transition: background-color 0.6s;
    cursor: pointer;
    color: ${!isAllDay && dayDiff === 0 ? "black" : "white"};
    z-index: 9;
    :hover {
        filter: brightness(95%);
    }
`;

export const SMoreText = index => css`
    position: absolute;
    top: ${26 * index}px;
    left: 2px;
    width: 92%;
    align-items: center;
    cursor: pointer;
    padding: 1px 3px 1px 4px;
    transition: background-color 0.6s;
    margin: 2% 0%;
    border-radius: 5px;
    :hover {
        background-color: #dbdbdb60;
    }
`;

// todo : 마지막 날짜인 경우 오른쪽 margin 필요
// 일정 li
export const SScheduleText = dayDiff => css`
    width: ${dayDiff === 0 || dayDiff === 1 ? 96 : (100 + 0.42) * dayDiff - 4}%;
    padding: 0.5px 3px 0.5px 4px;
    /* 아래쪽으로 내려가는것을 막음 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
`;

// 시간 표시(종일이 아닌 경우)
export const STimeText = css`
    display: flex;
    padding-left: 2px;
    align-items: center; // 수직 가운데 정렬
    white-space: nowrap;
    text-align: center;
    font-size: 0.8em;
`;

export const SModalScheduleBox = (dayDiff, isAllDay, color) => css`
    display: flex;
    width: 250px;
    justify-content: center;
    align-items: center;
    margin-bottom: 2%;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.6s;
    background-color: ${!isAllDay && dayDiff === 0 ? "transparent" : color};
    color: ${!isAllDay && dayDiff === 0 ? "black" : "white"};
    :hover {
        filter: brightness(95%);
    }
`;

export const SModalScheduleText = css`
    width: 250px;
    padding: 0.5px 3px 0.5px 4px;
    /* 아래쪽으로 내려가는것을 막음 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
`;
