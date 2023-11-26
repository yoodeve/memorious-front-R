import { css } from "@emotion/react";
import { Input, Modal, Select } from "antd";
import styled from "styled-components";

export const SContentsBox = css`
    & > p {
        margin-bottom: 20px;
    }

    span {
        margin: 0px 8px;
    }

    .emailInputBox {
        padding: 10px 10px 10px 20px;
    }
`;

export const SModal = styled(Modal)`
    font-size: 18px;
    .ant-modal-title {
        font-size: 28px;
        padding: 10px 10px;
    }

    .ant-modal-body {
        font-size: 24px;
        padding: 20px 20px 20px 30px;
    }

    .ant-modal-footer {
        & > button {
            width: 80px;
            height: 50px;
            font-size: 18px;
        }
        & > button:nth-child(1) {
            margin-right: 10px;
        }
    }
    .ant-modal-close-icon {
        font-size: 24px;
        padding: 10px;
        margin-right: 10px;
    }
`;

export const SInput = styled(Input)`
    font-size: 22px;
`;

export const SSelect = styled(Select)`
    .ant-select-selection-item {
        font-size: 22px;
    }
    .ant-select-selector {
        height: 49.67px !important;
    }
`;
