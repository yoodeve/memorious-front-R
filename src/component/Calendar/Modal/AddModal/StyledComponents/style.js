import { ColorPicker, Input, Modal } from "antd";
import styled from "styled-components";

export const SModal = styled(Modal)`
    .ant-modal-title {
        font-size: 26px;
        margin-bottom: 20px;
    }
`;
export const STitleInput = styled(Input)`
    font-size: 24px;
    font-weight: 700;
`;

export const SColorPicker = styled(ColorPicker)`
    margin: 10px 10px;
`;
