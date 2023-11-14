// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { CyclePreset } from "../../../../constants/Calendar/CyclePreset";
import { labelPreset } from "../../../../constants/Calendar/labelPreset";
import LabelColorBadge from "./LabelColorBadge/LabelColorBadge";
import { SAttendeeSelect, SCheckbox, SColorPicker, SCycleInput, SCycleSelect, SDatePicker, SDescriptionInput, SLocationInput, SModal, SRadio, SRadioRepeat, SRangePicker, SRepeatInput, SSelectOption, STimePicker, STitleInput } from "./StyledComponents/style";
import { SFlexBox, SPanelBox } from "./style";
/** @jsxImportSource @emotion/react */

function EditSchedule({ open, setOpen, date }) {
    const defaultStTime = date.set("hour", 12).set("m", 0).format("HH:mm");
    const defaultEndTime = date.set("hour", 13).set("m", 0).format("HH:mm");
    // 가상의 가족 데이터(사이트 로드시 가족 정보를 불러온 값)
    const mockUsers = [
        { id: 1, name: "한유정" },
        { id: 2, name: "우주영" },
        { id: 3, name: "주성광" },
    ];
    const [users, setUsers] = useState(mockUsers);
    const dateFormat = date.format("YYYY-MM-DD");

    const defaultScheduleInput = {
        title: "",
        labelColor: "f5222d",
        startDate: dateFormat,
        endDate: dateFormat,
        isDayAll: 1,
        startTime: defaultStTime,
        endTime: defaultEndTime,
        attendee: [],
        location: "",
        cycle: CyclePreset[0].value,
        repeatType: "none",
        repeatCount: "",
        repeatEndDate: dateFormat,
        description: "",
    };
    const [selectedLabel, setSelectedLabel] = useState(CyclePreset[0].label);
    const [scheduleInput, setScheduleInput] = useState(defaultScheduleInput);

    // ColorPicker
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const inputRef = useRef(null);

    // isDayAll & TimePicker

    // 제목 입력에 focus
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleOk = () => {
        // setOpen(false);
        setScheduleInput({
            ...scheduleInput,
            startTime: scheduleInput.isDayAll === 1 ? "00:00" : scheduleInput.startTime,
            endTime: scheduleInput.isDayAll === 1 ? "00:00" : scheduleInput.endTime,
            repeatEndDate: scheduleInput.repeatType === "none" ? "0000-00-00" : scheduleInput.repeatEndDate,
        });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    // ====== onChange 모음 ======
    const handleInputChange = e => {
        setScheduleInput({
            ...scheduleInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleLabelColorChange = e => {
        setScheduleInput({
            ...scheduleInput,
            labelColor: e.target.value,
        });
    };

    const handleDateChange = dates => {
        // dates 배열: [0]=startDate, [1]=endDate, type:Day.js // date
        setScheduleInput({
            ...scheduleInput,
            startDate: dates[0].format("YYYY-MM-DD"),
            endDate: dates[1].format("YYYY-MM-DD"),
        });
    };

    // <---    라벨 색상      --->
    const handleLabelColorSelect = color => {
        setScheduleInput({
            ...scheduleInput,
            labelColor: color,
        });
        setColorPickerOpen(false);
    };

    // 라벨 색상 변경 팝업 Customized
    const panelRender = () => {
        return (
            <div className="custom-panel" css={SPanelBox}>
                {labelPreset.colors.map(color => (
                    <LabelColorBadge color={color} onClick={() => handleLabelColorSelect(color)} key={color} />
                ))}
            </div>
        );
    };

    // 종일 체크박스
    const handleCheckboxChange = e => {
        setScheduleInput({
            ...scheduleInput,
            isDayAll: e.target.checked ? 1 : 0,
        });
    };

    // <---     시간변경     --->
    const handleStartTimeChange = time => {
        const StTimeInt = dayjs(time, "HHmm").format("HHmm"); // 1200
        const EndTimeInt = dayjs(scheduleInput.endTime, "HHmm").format("HHmm");

        // 같은 날짜인데 종료시간이 시작시간보다 빠를 경우 종료시간도 바꾼다
        if (scheduleInput.startDate === scheduleInput.endDate && StTimeInt >= EndTimeInt) {
            setScheduleInput({
                ...scheduleInput,
                startTime: time.format("HH:mm"),
                endTime: time.add(1, "h").format("HH:mm"),
            });
        } else {
            setScheduleInput({
                ...scheduleInput,
                startTime: time.format("HH:mm"),
            });
        }
    };
    const handleEndTimeChange = time => {
        const StTimeInt = dayjs(scheduleInput.startTime, "HHmm").format("HHmm"); // 1200
        const EndTimeInt = dayjs(time, "HHmm").format("HHmm");

        // 같은 날짜인데 종료시간이 시작시간보다 빠를 경우 시작시간도 바꾼다
        if (scheduleInput.startDate === scheduleInput.endDate && StTimeInt >= EndTimeInt) {
            setScheduleInput({
                ...scheduleInput,
                startTime: time.subtract(1, "hour").format("HH:mm"),
                endTime: time.format("HH:mm"),
            });
        } else {
            setScheduleInput({
                ...scheduleInput,
                endTime: time.format("HH:mm"),
            });
        }
    };

    // <---     참석자      --->
    // 체크한 참석자들을 Input에 저장
    const handleChange = attendeeArray => {
        setScheduleInput({
            ...scheduleInput,
            attendee: attendeeArray,
        });
    };
    // 가상의 사용자 데이터에서 검색
    const handleSearch = input => {
        // mockUser의 user 중 input를 포함하는것
        const filteredUsers = mockUsers.filter(user => user.name.toLowerCase().includes(input.toLowerCase()));
        setUsers(filteredUsers);
    };

    const handleRepeatTypeChange = e => {
        setScheduleInput({
            ...scheduleInput,
            repeatType: e.target.value,
        });
    };

    const handleRepeatDateChange = value => {
        setScheduleInput({
            ...scheduleInput,
            repeatEndDate: value.format("YYYY-MM-DD"),
        });
    };

    const handleCycleChange = menu => {
        // menu : value, label (cyclePreset 참고)
        setSelectedLabel(menu.label);
        setScheduleInput({
            ...scheduleInput,
            cycle: menu.value,
        });
    };

    // SRepeatInput 변경 시 SCycleSelect의 선택값은 변경되지 않도록 수정
    const handleCycleInputChange = e => {
        setScheduleInput({
            ...scheduleInput,
            cycle: e.target.value,
        });
    };
    return (
        <>
            <SModal centered title="일정 생성" open={open} onOk={handleOk} onCancel={handleCancel} date={date}>
                <div css={SFlexBox}>
                    <STitleInput name="title" ref={inputRef} onChange={handleInputChange} value={scheduleInput.scheduleTitle} placeholder="제목을 입력해주세요.(필수)" size="large" />
                    <SColorPicker panelRender={panelRender} value={scheduleInput.labelColor} onChange={handleLabelColorChange} open={colorPickerOpen} onOpenChange={setColorPickerOpen} />
                </div>

                <div css={SFlexBox}>
                    <SRangePicker size="large" onChange={handleDateChange} value={[dayjs(scheduleInput.startDate, "YYYY-MM-DD"), dayjs(scheduleInput.endDate, "YYYY-MM-DD")]} defaultValue={[date, date]} />
                    <SCheckbox checked={scheduleInput.isDayAll} onChange={handleCheckboxChange}>
                        종일
                    </SCheckbox>
                </div>
                {!scheduleInput.isDayAll && (
                    <div>
                        <STimePicker onSelect={handleStartTimeChange} onChange={handleStartTimeChange} value={dayjs(scheduleInput.startTime, "HH:mm")} changeOnBlur="true" minuteStep="10" format="HH:mm" size="large" />
                        ➡️
                        <STimePicker onSelect={handleEndTimeChange} onChange={handleEndTimeChange} value={dayjs(scheduleInput.endTime, "HH:mm")} minuteStep="10" format="HH:mm" size="large" />
                    </div>
                )}
                <SAttendeeSelect showSearch value={scheduleInput.attendee} mode="multiple" placeholder="참석자" filterOption={false} onSearch={handleSearch} onChange={handleChange} size="large">
                    {users.map(user => (
                        <SSelectOption key={user.id} value={user.name}>
                            {user.name}
                        </SSelectOption>
                    ))}
                </SAttendeeSelect>
                <SLocationInput name="location" onChange={handleInputChange} value={scheduleInput.location} placeholder="위치" size="large" />
                <SCycleSelect labelInValue onChange={handleCycleChange} defaultValue={{ label: CyclePreset[0].label, value: CyclePreset[0].value }} options={CyclePreset} size="large" />
                <div>
                    {selectedLabel === CyclePreset[5].label ? ( // 선택된 라벨이 "직접 입력" 일 때
                        <h1>
                            반복 주기 <SCycleInput name="CycleInput" onChange={handleCycleInputChange} value={scheduleInput.cycle} defaultValue="0" />일
                        </h1>
                    ) : null}
                </div>
                <div>
                    {selectedLabel === CyclePreset[0].label ? null : ( // 반복을 선택할 경우
                        <>
                            <h1>반복 횟수</h1>
                            <SRadioRepeat onChange={handleRepeatTypeChange} value={scheduleInput.repeatType}>
                                <h1>
                                    <SRadio value="none">없음</SRadio>
                                </h1>
                                <h1>
                                    <SRadio value="date">종료일자</SRadio>
                                    {scheduleInput.repeatType === "date" ? (
                                        <>
                                            <SDatePicker onChange={handleRepeatDateChange} value={dayjs(scheduleInput.repeatEndDate)} showToday={false} />
                                        </>
                                    ) : null}
                                </h1>
                                <h1>
                                    <SRadio value="count">반복횟수</SRadio>
                                    {scheduleInput.repeatType === "count" ? (
                                        <>
                                            <SRepeatInput name="repeatCount" onChange={handleInputChange} value={scheduleInput.repeatCount} />번
                                        </>
                                    ) : null}
                                </h1>
                            </SRadioRepeat>
                        </>
                    )}
                </div>

                <SDescriptionInput name="description" onChange={handleInputChange} value={scheduleInput.description} placeholder="설명" size="large" />
            </SModal>
        </>
    );
}

export default EditSchedule;
