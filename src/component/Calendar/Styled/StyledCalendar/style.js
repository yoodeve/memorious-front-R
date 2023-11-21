import { Calendar } from "antd";
import styled from "styled-components";

export const SCalendar = styled(Calendar)`
    /* 캘린더 헤더부 버튼 */
    .ant-picker-calendar-header {
        margin-top: 10px;
    }

    /* 헤더 제외한 나머지  */
    .ant-picker-panel {
        width: 100%;
        /* width: 1109px !important; */
    }

    /* 캘린더 전체 부분 패딩제거 */
    .ant-picker-body {
        padding: 0px !important;
    }

    /* 월요일~ 일요일 문자 추가 */
    .ant-picker-content thead tr th:nth-child(1)::after {
        content: "n";
    }
    .ant-picker-content thead tr th:nth-child(2)::after {
        content: "n";
    }
    .ant-picker-content thead tr th:nth-child(3)::after {
        content: "e";
    }
    .ant-picker-content thead tr th:nth-child(4)::after {
        content: "d";
    }
    .ant-picker-content thead tr th:nth-child(5)::after {
        content: "u";
    }
    .ant-picker-content thead tr th:nth-child(6)::after {
        content: "i";
    }
    .ant-picker-content thead tr th:nth-child(7)::after {
        content: "t";
    }

    .ant-picker-content thead tr th {
        margin-bottom: 10px;
    }

    /* 캘린더 요일(월~일)부분 */
    thead tr th {
        padding: 0px !important;
        text-align: center;
        font-size: 16px;
        cursor: default;
    }

    /* 요일부 맨 왼쪽*/
    thead tr th:first-child {
        border-left: 0px;
    }
    /* 요일부 맨 오른쪽 */
    thead tr th:last-child {
        border-right: 0px;
    }

    /* 요일 표시부분 스타일 변경 */
    .ant-picker-content thead tr th {
        color: #444;
    }

    /* 요일 각각의 셀 */
    tbody tr td {
        border-right: 1px solid #e7e7e7 !important;
        border-top: 1px solid #e7e7e7 !important;
    }

    /* 왼쪽 테두리   */
    tbody tr td:first-child .ant-picker-calendar-date {
        /* border-left: 1px solid #e7e7e7 !important; */
        border-left: 0px;
    }
    /* 오른쪽 테두리 */
    tbody tr td:last-child .ant-picker-calendar-date {
        border-right: 0px;
    }

    /* 첫번째 행의 위 */
    tbody tr:nth-child(1) td .ant-picker-calendar-date {
    }

    /* 마지막 행의 아래 */
    tbody tr:nth-child(5) td .ant-picker-calendar-date {
        border-bottom: 0px solid #e7e7e7 !important;
    }

    /* 데이트 셀 크기설정 */
    tbody tr td .ant-picker-cell-inner.ant-picker-calendar-date .ant-picker-calendar-date-content {
        height: 100%;
        margin-left: 0px;
    }

    /* 일자 텍스트 부분 */
    .ant-picker-calendar-date-value {
        text-align: center;
        font-weight: 600;
        margin: 2px 0px 2px 0px;
    }

    /* 데이트 셀 전체(날짜부분 포함) */
    tbody tr td .ant-picker-calendar-date {
        padding: 0 !important;
        margin: 0px 0px 0px 0px !important;
        border-top: 0px !important;
        overflow: hidden !important;
        ::-webkit-scrollbar {
            width: 2px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #66666640; /* 스크롤바 핸들 색상 */
            border-radius: 10%;
        }

        /* 애니메이션 효과 */
        ::-webkit-scrollbar-thumb {
            transition: background-color 0.3s ease-in-out;
        }
    }

    /* 선택된 셀 */
    .ant-picker-cell-selected {
        & > div {
            background-color: #dbdbdb30 !important;
        }
    }

    /* 6번째 행 제거 */
    tbody tr:nth-child(6) .ant-picker-calendar-date {
        display: ${props => (props.rowNumber === 5 ? "none" : "")};
    }
    tbody tr:nth-child(6) td {
        display: ${props => (props.rowNumber === 5 ? "none" : "")};
    }
`;
