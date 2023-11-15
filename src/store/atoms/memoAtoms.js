import { atom } from "recoil";

export const rcMemoPage = atom({
    key: "memo_page",
    default: 0,
});

export const rcMemoList = atom({
    key: "memo_list",
    default: [],
});
