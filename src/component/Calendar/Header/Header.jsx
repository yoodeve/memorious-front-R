import { Button, Col, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
/** @jsxImportSource @emotion/react */
import ScheduleAddModal from "../Modal/EditScheduleModal";
import { SAddBtn, SFlex, SHeaderContainer, SMonthbtn, STodayBtn, SheaderDisplay } from "./style";

function Header({ value, onChange }) {
    const year = value.year();
    const month = value.month();
    const current = value.clone();
    const now = dayjs();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
        options.push(
            <Select.Option key={i} value={i} className="year-item">
                {i}
            </Select.Option>,
        );
    }

    return (
        <div css={SHeaderContainer}>
            <div css={SFlex}>
                <Button css={STodayBtn} onClick={() => onChange(now)}>
                    오늘
                </Button>
                <Button css={SMonthbtn} onClick={() => onChange(current.subtract(1, "months"))} style={{ marginRight: "10px" }}>
                    {"<"}
                </Button>
                <Button css={SMonthbtn} onClick={() => onChange(current.add(1, "months"))}>
                    {">"}
                </Button>
                <span css={SheaderDisplay}>
                    {year}년 {month + 1}월
                </span>
            </div>
            <div css={SFlex}>
                <Col>
                    <Select
                        size="large"
                        value={year}
                        onChange={newYear => {
                            onChange(current.year(newYear));
                        }}
                    >
                        {options}
                    </Select>
                </Col>
                <Button css={SAddBtn} onClick={ScheduleAddModal}>
                    + 일정 추가
                </Button>
            </div>
        </div>
    );
}

export default Header;
