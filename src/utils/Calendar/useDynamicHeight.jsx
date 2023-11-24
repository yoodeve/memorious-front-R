import { useEffect, useState } from "react";
import getWeekCount from "./getWeekCount";
// 화면 비율에따라 5행 / 6행 다르게 표시
const useDynamicHeight = date => {
    const defaultHeight = 133;
    const [customHeight, setCustomHeight] = useState(defaultHeight);
    const [rowNumber, setRowNumber] = useState(5);

    const updateDynamicHeight = () => {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        let calculatedHeight;
        const viewportRatio = viewportWidth / viewportHeight;

        if (viewportRatio <= 1.9) {
            calculatedHeight = (viewportHeight - 265) / 6;
            setRowNumber(6);
        } else {
            calculatedHeight = (viewportHeight - 240) / 5;
            setRowNumber(5);
        }
        // 높이에 따라 height를 조절()
        if (getWeekCount(date) === 6) {
            calculatedHeight = (viewportHeight - 268) / 6;
            setRowNumber(6);
        }
        setCustomHeight(calculatedHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", updateDynamicHeight);
        updateDynamicHeight();

        return () => {
            window.removeEventListener("resize", updateDynamicHeight);
        };
    }, []);

    useEffect(() => {
        updateDynamicHeight();
    }, [date]);
    useEffect(() => {
        updateDynamicHeight();
    }, [customHeight]);
    return { customHeight, rowNumber };
};

export default useDynamicHeight;
