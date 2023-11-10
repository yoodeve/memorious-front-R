import React, { useEffect, useRef, useState } from "react";
import { labelPreset } from "../../../../constants/Calendar/labelPreset";
import LabelColorBadge from "./LabelColorBadge/LabelColorBadge";
import { SColorPicker, SModal, STitleInput } from "./StyledComponents/style";
import { SpanelBox } from "./style";
/** @jsxImportSource @emotion/react */

function AddScheduleModal({ open, setOpen, date }) {
    const defaultScheduleInput = {
        scheduleTitle: "",
        labelColor: "",
        startDate: "",
        endDate: "",
        isDayAll: 1,
        startTime: "",
        endTime: "",
        attendee: "",
        location: "",
        cycle: "",
        description: "",
    };

    //
    const [scheduleInput, setScheduleInput] = useState(defaultScheduleInput);

    // ColorPicker
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [labelColor, setLabelColor] = useState("#8BBB11");
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleTitleOnchange = e => {
        setScheduleInput({
            ...scheduleInput,
            scheduleTitle: e.target.value,
        });
        console.log(scheduleInput.scheduleTitle);
    };

    const handleLabelColorSelect = (e, color) => {
        e.stopPropagation();
        setLabelColor(color);
        setColorPickerOpen(true);
        console.log(labelColor);
    };

    const panelRender = () => {
        return (
            <div className="custom-panel" css={SpanelBox}>
                {labelPreset.colors.map(presetColor => (
                    <LabelColorBadge onClick={e => handleLabelColorSelect(e, presetColor)} color={presetColor} key={presetColor} />
                ))}
            </div>
        );
    };

    return (
        <>
            <SModal centered title="일정 생성" open={open} onOk={handleOk} onCancel={handleCancel} date={date}>
                <STitleInput name="title" ref={inputRef} onChange={handleTitleOnchange} value={scheduleInput.ScheduleTitle} placeholder="제목을 입력해주세요.(필수)" size="large" />
                <SColorPicker panelRender={panelRender} defaultValue="#8BBB11" value={labelColor} onChange={setLabelColor} open={colorPickerOpen} onOpenChange={setColorPickerOpen} />
            </SModal>
        </>
    );
}

export default AddScheduleModal;
