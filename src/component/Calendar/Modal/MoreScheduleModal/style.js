import { Modal } from "antd";
import styled from "styled-components";

export const SModal = styled(Modal)`
    .ant-modal-contents {
    }
    .ant-modal-body {
        padding: 10px;
    }
    .ant-modal-header {
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ant-modal-title {
        font-size: 26px;
    }

    .ant-modal-body {
    }
    .ant-modal-close {
        width: 28px;
        height: 28px;
        right: 20px;
        top: 20px;
    }
    .ant-modal-close-icon {
        font-size: 22px;
    }
`;
