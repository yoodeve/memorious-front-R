import React, { useMemo } from "react";
import styled from "styled-components";
import { Badge, Button, Calendar } from "antd";
/** @jsxImportSource @emotion/react */
import { SMainContainer } from "./Style";

const HeaderRender = ({ value, onChange }) => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", margin: "0 20px" }}>
            <span style={{ fontSize: "1.5rem" }}>{value.year()}</span>
            <div>
                <Button onClick={() => onChange(value.clone().subtract(1, "years"))}>이전달</Button>
                <Button type="primary" onClick={() => onChange(value.clone().add(1, "years"))}>
                    다음달
                </Button>
            </div>
        </div>
    );
};

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
                        type: "#213978",
                        content: "This is warning event",
                    },

                    {
                        type: "red",
                        content: "This is error event 1.",
                    },
                    {
                        type: "#666",
                        content: "This is error event 1.",
                    },
                ];
                break;
            case 14:
                listData = [
                    {
                        type: "#888",
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
            <div>
                <ul className="events">
                    {listData.map(item => {
                        return (
                            <li key={item.content}>
                                <Badge color={item.type} text={item.content} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        if (info.type === "month") return monthCellRender(current);
        return info.originNode;
    };

    const tableCss = useMemo(() => {
        return { width: "100%", height: "max-content" };
    }, []);

    const SCalendar = styled(Calendar)`
        thead tr th {
            font-size: 24px;
            text-align: center;
        }

        .ant-picker-calendar-header {
            display: flex;
            justify-content: flex-end;
            position: relative;
            .ant-select {
                &:nth-of-type(1) {
                    margin-left: 10px;
                }
                &:nth-of-type(2) {
                    margin-right: 800px;
                }
            }
        }
        /* 요일 표시 중앙으로  */
        .ant-picker-calendar .ant-picker-calendar-full .ant-picker-panel {
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
        tbody tr td .ant-picker-cell-inner.ant-picker-calendar-date .ant-picker-calendar-date-content {
            height: 110px;
        }
    `;

    return (
        <div css={SMainContainer}>
            <SCalendar headerRender={HeaderRender} dateCellRender={dateCellRender} onPanelChange={onPanelChange} cellRender={cellRender} style={tableCss} />
            {/* <Calendar onPanelChange={onPanelChange} cellRender={cellRender} style={tableCss} /> */}
        </div>
    );
}

export default CalendarPage;
