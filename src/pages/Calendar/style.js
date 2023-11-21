import { css } from "@emotion/react";

export const SMainContainer = css`
    width: 99%;
    height: 100%;
    display: grid;
    place-items: center;
`;

//  onClick을 사용하기 위한 div(antd onSelect 버블링 발생)
export const SdateCellBox = height => css`
    width: 100%;
    height: ${height}px;
    cursor: pointer;
`;

// 일정li를 담는 div
export const SScheduleBox = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3%;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.6s;
    :hover {
        background-color: #f1f3f490;
        filter: brightness(95%);
    }
    & > li {
    }
`;

export const STimeText = css`
    display: flex;
    align-items: center; // 수직 가운데 정렬
    align-self: center;
    white-space: nowrap;
    text-align: center;
    font-size: 0.85em;
`;

// todo : 마지막 날짜인 경우 오른쪽 margin 필요
// 일정 li
export const SScheduleText = (color, isAllDay) => css`
    width: 100%; //크기를 지정해 셀 내용 보장
    padding: 0.5px 3px 0.5px 4px;
    margin-right: 4%;
    border-radius: 5px;
    background-color: ${isAllDay ? color : "transparent"};
    color: ${isAllDay ? "white" : "black"};
    font-size: 1.06em;
    /* 아래쪽으로 내려가는것을 막음 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
`;
