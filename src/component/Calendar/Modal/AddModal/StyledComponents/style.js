import { Checkbox, ColorPicker, DatePicker, Input, Modal, Radio, Select, TimePicker } from "antd";
import styled from "styled-components";

export const SModal = styled(Modal)`
    .ant-modal-body {
        padding: 20px;
    }
    .ant-modal-title {
        font-size: 26px;
    }
`;

export const STitleInput = styled(Input)`
    width: 380px;
    font-size: 24px;
    font-weight: 700;
`;

export const SColorPicker = styled(ColorPicker)`
    margin-left: 20px;
`;

export const SRangePicker = styled(DatePicker.RangePicker)`
    margin-right: 20px;
    .anticon-close-circle {
        display: none !important;
    }
`;

export const SCheckbox = styled(Checkbox)`
    font-size: 22px;
    font-weight: 700;
`;

export const STimePicker = styled(TimePicker)`
    font-size: 20px;
    font-weight: 600;

    .ant-picker {
        border: 1px 0px 1px 1px solid #d9d9d9 !important;
    }
    .ant-picker-input > input {
        border: 1px 0px 1px 1px solid #d9d9d9 !important;
    }

    .anticon-close-circle {
        display: none !important;
    }
    /* todo
    Ok 버튼 지우기 */
`;

export const SAttendeeSelect = styled(Select)`
    width: 400px;
    margin-bottom: 20px;
    font-size: 16px !important;
    font-weight: 600;
`;

export const SSelectOption = styled(Select.Option)``;

export const SLocationInput = styled(Input)`
    width: 400px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
`;

export const SCycleSelect = styled(Select)`
    width: 400px;
    margin-bottom: 10px;
`;

export const SCycleInput = styled(Input)`
    width: 40px;
    margin: 0px 10px 0px 20px;
`;

export const SRadioGroup = styled(Radio.Group)`
    margin: 0px 0px;
`;

export const SRadio = styled(Radio)`
    margin-top: 100px 0px;
    font-weight: 500;
    font-size: 14px;
`;

export const SDatePicker = styled(DatePicker)`
    width: 110px;
    .anticon-close-circle {
        display: none !important;
    }
`;

export const SRepeatInput = styled(Input)`
    width: 40px;
`;

export const SDescriptionInput = styled(Input.TextArea)`
    width: 400px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
`;
