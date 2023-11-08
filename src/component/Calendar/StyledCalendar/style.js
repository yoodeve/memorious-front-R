import { Calendar } from "antd";
import styled from "styled-components";

export const SCalendar = styled(Calendar)`
    /* 캘린더 헤더부 버튼 */
    .ant-picker-calendar-header {
        margin-top: 10px;
    }
    /* 캘린더 요일(월~일)부분 */
    thead tr th {
        font-size: 18px;
        text-align: center;
    }

    /* 일자(date) 텍스트 부분 */
    .ant-picker-calendar-date-value {
        text-align: center;
        font-family: "Pretendard-Bold";
    }

    /* 데이트 셀 부분 */
    tbody tr td .ant-picker-cell-inner.ant-picker-calendar-date .ant-picker-calendar-date-content {
        height: 109px;
        margin-left: 0px;
    }

    /* 데이트 셀 부분 */
    tbody tr td .ant-picker-calendar-date {
        padding: 0 !important;
        margin: 0px 0px 0px 0px !important;
        border-left: 0.5px solid rgba(5, 5, 5, 0.06) !important;
        border-right: 0.3px solid rgba(5, 5, 5, 0.06) !important;
        cursor: default;
        /* border-radius: 5px !important ; */
    }

    /* 선택된 셀 부분 */
    .ant-picker-cell-selected {
        & > div {
            background-color: white !important;
        }
    }
`;
