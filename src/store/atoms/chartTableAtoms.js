import dayjs from "dayjs";
import { atom } from "recoil";

export const rcTableData = atom({
    key: "table-info",
    default: {
        step: 0,
        fbs: 0,
        date: dayjs().format("YYYY-MM-DD"),
        pulse: 0,
    },
});
