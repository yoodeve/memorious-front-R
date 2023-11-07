import React, { useMemo } from "react";
import styled from "styled-components";
import { Badge, Calendar } from "antd";

/** @jsxImportSource @emotion/react */
import { SMainContainer } from "./Style";

// import "./CalendarPage.css";

function CalendarPage() {
    const getMonthData = value => {
        if (value.month() === 3) {
            return 1;
        }
    };
    const getListData = value => {
        let listData;
        switch (value.date()) {
            case 15:
                listData = [
                    {
                        type: "warning",
                        content: "This is warning event",
                    },

                    {
                        type: "error",
                        content: "This is error event 1.",
                    },
                ];
                break;
            case 14:
                listData = [
                    {
                        type: "success",
                        content: "zzz",
                    },
                ];
                break;
            default:
        }
        return listData || [];
    };

    const onPanelChange = (value, mode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const monthCellRender = value => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = value => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current, info) => {
        console.log(current);
        // console.log(info);
        if (info.type === "date") return dateCellRender(current);
        if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    const tableCss = useMemo(() => {
        return { width: "1102px" };
    }, []);

    const SCalendar = styled(Calendar)`
        thead tr th {
            font-size: 24px;
            text-align: center;
        }

        .ant-picker-calendar-header {
            display: flex;
            justify-content: space-around;
        }
        /* 요일 표시 중앙으로  */
        .ant-picker-calendar&.ant-picker-calendar-full &.ant-picker-panel {
        }

        .css-1rclprt-SideBar * {
            font-size: 24px;
        }

        .ant-picker-calendar-date {
            height: 130px;
        }

        .ant-picker-calendar-date-value {
            text-align: center;
            font-family: "Pretendard-Bold";
        }

        .ant-picker-cell ant-picker-cell-in-view {
            height: 135px;
        }
        .ant-picker-calendar-date-content {
            height: 135px;
        }
    `;

    return (
        <div css={SMainContainer}>
            <SCalendar onPanelChange={onPanelChange} cellRender={cellRender} style={tableCss} />
            {/* <Calendar onPanelChange={onPanelChange} cellRender={cellRender} style={tableCss} /> */}
        </div>
    );
}

export default CalendarPage;
