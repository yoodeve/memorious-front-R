import { atom } from "recoil";

export const rcUserOnChartArray = atom({
    key: "chart_label_list",
    default: [],
});

export const rcChartStartDate = atom({
    key: "chart_start_date",
    default: 1,
});
