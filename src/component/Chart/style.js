import { css } from "@emotion/react";

export const ChartContiner = css`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const chartSidebarContainer = css`
    width: 180px;
    height: 100%;
    background-color: #6f6257;
`;

export const periodTab = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    margin: 20px;
    * {
        color: #fffbf5;
    }
`;

export const periodLabel = css`
    margin: 5px 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    input {
        display: none;
    }
    label {
        font-family: "Pretendard-Light";
        font-size: 12px;
        width: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    label::before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background-color: #fffbf5;
        margin-right: 5px;
    }
    input:checked + label::before {
        content: "✓";
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10px;
        height: 10px;
        background-color: #e6a156;
        margin-right: 5px;
    }
`;

export const profileContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    * {
        color: #fffbf5;
    }
`;

export const profileWrapper = css`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .profile-img-wrapper {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
    }
    button {
    }
`;

export const chartMainContainer = css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
        text-align: center;
        font-family: "Pretendard-Black";
        font-size: 30px;
        margin: 20px 0;
    }
    .chart-button-area {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 50px 10px 0;
        button {
            padding: 5px;
            margin-right: 15px;
            height: fit-content;
            color: #6f6257;
            border: 1px solid #6f6257;
            border-radius: 6px;
            background-color: #f5efe6;
        }
    }
`;
export const userSelectedButton = css`
    input {
        display: none;
    }
    label::before {
        content: "적용하기";
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        background-color: #fffbf5;
        color: #6f6257;
    }
    input:checked + label::before {
        background-color: #e6a156;
    }
`;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;"#"
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
// export const ChartSidebar = css``;
