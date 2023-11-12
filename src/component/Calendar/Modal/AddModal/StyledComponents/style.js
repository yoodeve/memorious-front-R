import { Checkbox, ColorPicker, DatePicker, Input, Modal, Radio, Select, TimePicker } from "antd";
import styled from "styled-components";

export const SModal = styled(Modal)`
    .ant-modal-body {
        padding: 20px;
    }
    .ant-modal-title {
        font-size: 26px;
        margin-bottom: 20px;
    }
    & h1 {
        font-size: 18px;
        font-weight: 600;
    }
`;

export const STitleInput = styled(Input)`
    font-size: 24px;
    font-weight: 700;
    margin: 20px 0px;
    width: 380px;
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
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 600;

    /* todo
    Ok 버튼 지우기 */
`;

export const SAttendeeSelect = styled(Select)`
    margin: 20px 0px;
    width: 400px;
    font-size: 16px !important;
    font-weight: 600;
`;

export const SSelectOption = styled(Select.Option)``;

export const SLocationInput = styled(Input)`
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
    width: 400px;
`;
export const SCycleSelect = styled(Select)`
    width: 400px;
    margin-bottom: 20px;
`;

export const SCycleInput = styled(Input)`
    width: 40px;
    margin-left: 20px;
    font-size: 18px;
    height: 40px;
`;
export const SDescriptionInput = styled(Input.TextArea)`
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
    width: 400px;
`;

export const SRadioRepeat = styled(Radio.Group)`
    margin: 5px 0px;
`;
export const SRadio = styled(Radio)`
    margin: 5px 0px;
    font-weight: 600;
    font-size: 18px;
`;

export const SDatePicker = styled(DatePicker)`
    margin-right: 20px;
    .anticon-close-circle {
        display: none !important;
    }
`;
export const SRepeatInput = styled(Input)`
    width: 40px;
`;
