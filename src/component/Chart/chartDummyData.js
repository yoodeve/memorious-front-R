import ChartFirstRowDateInput from "../ChartDetail/ChartFirstRowDateInput";
import ChartTableFirstRowInput from "../ChartDetail/ChartFirstRowInput";
import ChartDetailAddBtn from "./ChartDetailAddBtn";

/* eslint-disable no-unused-vars */
export const chartProfileDummyDataObj = [
    { profileImgSrc: "", profileName: "유정" },
    { profileImgSrc: "", profileName: "정어리" },
    { profileImgSrc: "", profileName: "고등어" },
    { profileImgSrc: "", profileName: "꽁치" },
];

export const chartGraphDummyDataObj = {
    bloodSugar: [
        { date: "2023-10-20", data: 60 },
        { date: "2023-10-21", data: 90 },
        { date: "2023-10-22", data: 40 },
        { date: "2023-10-23", data: 70 },
        { date: "2023-10-24", data: 69 },
        { date: "2023-10-25", data: 81 },
        { date: "2023-10-26", data: 50 },
    ],
    step: [
        { date: "2023-10-20", data: 10000 },
        { date: "2023-10-21", data: 12000 },
        { date: "2023-10-22", data: 9000 },
        { date: "2023-10-23", data: 500 },
        { date: "2023-10-24", data: 15000 },
        { date: "2023-10-25", data: 7000 },
        { date: "2023-10-26", data: 200 },
    ],
    pulse: [
        { date: "2023-10-20", data: 54 },
        { date: "2023-10-21", data: 120 },
        { date: "2023-10-22", data: 40 },
        { date: "2023-10-23", data: 60 },
        { date: "2023-10-24", data: 70 },
        { date: "2023-10-25", data: 80 },
        { date: "2023-10-26", data: 75 },
    ],
};

export const chartGraphDummyDataObj2 = {
    bloodSugar: [
        { date: "2023-10-20", data: 90 },
        { date: "2023-10-21", data: 95 },
        { date: "2023-10-22", data: 44 },
        { date: "2023-10-23", data: 76 },
        { date: "2023-10-24", data: 89 },
        { date: "2023-10-25", data: 21 },
        { date: "2023-10-26", data: 80 },
    ],
    step: [
        { date: "2023-10-20", data: 15000 },
        { date: "2023-10-21", data: 9000 },
        { date: "2023-10-22", data: 9700 },
        { date: "2023-10-23", data: 1000 },
        { date: "2023-10-24", data: 1000 },
        { date: "2023-10-25", data: 17000 },
        { date: "2023-10-26", data: 1200 },
    ],
    pulse: [
        { date: "2023-10-20", data: 56 },
        { date: "2023-10-21", data: 140 },
        { date: "2023-10-22", data: 10 },
        { date: "2023-10-23", data: 70 },
        { date: "2023-10-24", data: 50 },
        { date: "2023-10-25", data: 100 },
        { date: "2023-10-26", data: 66 },
    ],
};

export const chartPeriodArray = ["1달", "3달", "6달"];

export const chartTableDummyData = [
    { date: "2023-10-20", buttons: "", FBS: 100, step: 10000, pulse: 120 },
    { date: "2023-10-21", buttons: "", FBS: 110, step: 12000, pulse: 120 },
    { date: "2023-10-22", buttons: "", FBS: 70, step: 15000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 40, step: 5000, pulse: 120 },
    { date: "2023-10-24", buttons: "", FBS: 50, step: 300, pulse: 120 },
    { date: "2023-10-25", buttons: "", FBS: 60, step: 3000, pulse: 120 },
    { date: "2023-10-26", buttons: "", FBS: 63, step: 4000, pulse: 120 },
    { date: "2023-10-27", buttons: "", FBS: 71, step: 5500, pulse: 120 },
    { date: "2023-10-28", buttons: "", FBS: 83, step: 6300, pulse: 120 },
    { date: "2023-10-29", buttons: "", FBS: 92, step: 3200, pulse: 120 },
    { date: "2023-10-30", buttons: "", FBS: 54, step: 2200, pulse: 120 },
    { date: "2023-10-31", buttons: "", FBS: 57, step: 2100, pulse: 120 },
    { date: "2023-11-01", buttons: "", FBS: 59, step: 3000, pulse: 120 },
    { date: "2023-11-02", buttons: "", FBS: 68, step: 10000, pulse: 120 },
    { date: "2023-11-03", buttons: "", FBS: 90, step: 11300, pulse: 120 },
];

export const tableColumns = [
    {
        title: "날짜",
        dataIndex: "date",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartFirstRowDateInput type="date" />;
            }
            return t;
        },
    },
    {
        title: "수정",
        dataIndex: "buttons",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            return i === 0 ? <ChartDetailAddBtn color="primary" type="add" /> : <ChartDetailAddBtn type="edit" />;
        },
    },
    {
        title: "공복혈당",
        dataIndex: "FBS",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartTableFirstRowInput type="fbs" />;
            }
            return t.toLocaleString("ko-KR");
        },
    },
    {
        title: "걸음수",
        dataIndex: "step",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartTableFirstRowInput type="step" />;
            }
            return t.toLocaleString("ko-KR");
        },
    },
    {
        title: "맥박",
        dataIndex: "pulse",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartTableFirstRowInput type="pulse" />;
            }
            return t.toLocaleString("ko-KR");
        },
    },
];
