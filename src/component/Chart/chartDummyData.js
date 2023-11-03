import ChartFirstRowDateInput from "../ChartDetail/ChartFirstRowDateInput";
import ChartTableFirstRowInput from "../ChartDetail/ChartFirstRowInput";

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

export const chartPeriodArray = ["1달", "3달", "6달"];

export const chartTableDummyData = [
    { date: "2023-10-20", FBS: 100, step: 10000, pulse: 120 },
    { date: "2023-10-21", FBS: 110, step: 12000, pulse: 120 },
    { date: "2023-10-22", FBS: 70, step: 15000, pulse: 120 },
    { date: "2023-10-23", FBS: 40, step: 5000, pulse: 120 },
    { date: "2023-10-24", FBS: 50, step: 300, pulse: 120 },
    { date: "2023-10-25", FBS: 60, step: 3000, pulse: 120 },
    { date: "2023-10-26", FBS: 63, step: 4000, pulse: 120 },
    { date: "2023-10-27", FBS: 71, step: 5500, pulse: 120 },
    { date: "2023-10-28", FBS: 83, step: 6300, pulse: 120 },
    { date: "2023-10-29", FBS: 92, step: 3200, pulse: 120 },
    { date: "2023-10-30", FBS: 54, step: 2200, pulse: 120 },
    { date: "2023-10-31", FBS: 57, step: 2100, pulse: 120 },
    { date: "2023-11-01", FBS: 59, step: 3000, pulse: 120 },
    { date: "2023-11-02", FBS: 68, step: 10000, pulse: 120 },
    { date: "2023-11-03", FBS: 90, step: 11300, pulse: 120 },
];

export const tableColumns = [
    {
        title: "날짜",
        dataIndex: "date",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartFirstRowDateInput />;
            }
            return t;
        },
    },
    {
        title: "공복혈당",
        dataIndex: "FBS",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartTableFirstRowInput />;
            }
            return t;
        },
    },
    {
        title: "걸음수",
        dataIndex: "step",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartTableFirstRowInput />;
            }
            return t;
        },
    },
    {
        title: "맥박",
        dataIndex: "pulse",
        onHeaderCell: () => ({ style: { background: "#6F6257", color: "#fffbf5", textAlign: "center", fontSize: "16px" } }),
        render: (t, r, i) => {
            if (i === 0) {
                return <ChartTableFirstRowInput />;
            }
            return t;
        },
    },
];
