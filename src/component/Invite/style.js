import { css } from "@emotion/react";
import { Modal } from "antd";
import styled from "styled-components";

export const SContentsBox = css`
    & > p {
        margin-bottom: 20px;
    }

    & > div > span {
        margin: 0px 8px;
    }

    .emailInputBox {
        padding: 0px 10px 0px 20px;
    }
`;

export const SModal = styled(Modal)`
    .ant-modal-title {
        font-size: 22px;
        margin-bottom: 20px;
    }
    .ant-modal-close-icon {
        font-size: 24px;
        padding: 10px;
        margin-right: 10px;
    }

    .ant-modal-body {
        margin: 0px 0px 20px 20px;
    }
`;
