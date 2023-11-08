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

export const chartGraphDummyDataObj = name => ({
    startDate: "2023-10-23",
    [name]: {
        bloodSugar: [60, 90, 40, 70, 69, 81, 50],
        step: [10000, 12000, 9000, 500, 15000, 7000, 200],
        pulse: [54, 120, 40, 60, 70, 80, 75],
    },
});

export const chartGraphDummyDataObj2 = username => ({
    startDate: "2023-10-23",
    [username]: {
        bloodSugar: [90, 95, 44, 76, 89, 21, 80],
        step: [15000, 9000, 9700, 1000, 1000, 17000, 1200],
        pulse: [56, 140, 10, 70, 50, 100, 66],
    },
});

export const chartPeriodArray = ["1달", "3달", "6달"];

export const chartTableDummyData = [
    { date: "2023-10-23", buttons: "", FBS: 100, step: 10000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 110, step: 12000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 70, step: 15000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 40, step: 5000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 50, step: 300, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 60, step: 3000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 63, step: 4000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 71, step: 5500, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 83, step: 6300, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 92, step: 3200, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 54, step: 2200, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 57, step: 2100, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 59, step: 3000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 68, step: 10000, pulse: 120 },
    { date: "2023-10-23", buttons: "", FBS: 90, step: 11300, pulse: 120 },
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
