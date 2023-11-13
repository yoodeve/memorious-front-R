// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { CyclePreset } from "../../../../constants/Calendar/CyclePreset";
import { labelPreset } from "../../../../constants/Calendar/labelPreset";
import LabelColorBadge from "./LabelColorBadge/LabelColorBadge";
import { SAttendeeSelect, SCheckbox, SColorPicker, SCycleInput, SCycleSelect, SDatePicker, SDescriptionInput, SLocationInput, SModal, SRadio, SRadioRepeat, SRangePicker, SRepeatInput, SSelectOption, STimePicker, STitleInput } from "./StyledComponents/style";
import { SFlexBox, SPanelBox } from "./style";
import { ScheduleData } from "../../../../constants/Calendar/SchduleData";
/** @jsxImportSource @emotion/react */

function AddScheduleModal({ open, setOpen, date }) {
    // 시간 선택시 UX를 위해 기본 시간을 중앙에 있는 값으로 변경
    const defaultStTime = date.set("hour", 12).set("m", 0).format("HH:mm");
    const defaultEndTime = date.set("hour", 13).set("m", 0).format("HH:mm");
    const formattedDate = date.format("YYYY-MM-DD");

    const defaultScheduleInput = {
        title: "",
        labelColor: "f5222d",
        startDate: formattedDate,
        endDate: formattedDate,
        isDayAll: 1,
        startTime: defaultStTime,
        endTime: defaultEndTime,
        attendee: [],
        location: "",
        cyclePeriod: CyclePreset[0].value,
        repeatType: "none",
        repeatCount: "",
        repeatEndDate: formattedDate,
        description: "",
    };

    const [selectedLabel, setSelectedLabel] = useState(CyclePreset[0].label);
    const [scheduleInput, setScheduleInput] = useState(defaultScheduleInput);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);

    // 가상의 가족 데이터(사이트 로드시 가족 정보를 불러온 값)
    const mockUsers = [
        { id: 1, name: "한유정" },
        { id: 2, name: "우주영" },
        { id: 3, name: "주성광" },
    ];
    const [users, setUsers] = useState(mockUsers);

    // 제목입력에 focus 줌
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // 확인버튼 클릭시
    const handleOk = () => {
        // setOpen(false);
        setScheduleInput({
            ...scheduleInput,
            startTime: scheduleInput.isDayAll === 1 ? "00:00" : scheduleInput.startTime,
            endTime: scheduleInput.isDayAll === 1 ? "00:00" : scheduleInput.endTime,
            repeatEndDate: scheduleInput.repeatType === "none" ? "0000-00-00" : scheduleInput.repeatEndDate,
        });
        console.log(scheduleInput);
        ScheduleData.push(scheduleInput);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    // <=====    Input 상태변경(다수 사용)      =====>
    const handleInputChange = e => {
        setScheduleInput({
            ...scheduleInput,
            [e.target.name]: e.target.value,
        });
    };

    // <=====    라벨 색상      =====>
    const handleLabelColorClick = color => {
        console.log("color", color);
        setScheduleInput({
            ...scheduleInput,
            labelColor: color,
        });
        setColorPickerOpen(false);
    };

    // 라벨 색상 변경 팝업을 Customized
    const panelRender = () => {
        return (
            <div className="custom-panel" css={SPanelBox}>
                {labelPreset.colors.map(color => (
                    <LabelColorBadge color={color} onClick={() => handleLabelColorClick(color)} key={color} />
                ))}
            </div>
        );
    };

    // <=====    날짜변경      =====>
    const handleDateChange = dates => {
        // dates 배열: [0]=startDate, [1]=endDate, type:Day.js // date
        setScheduleInput({
            ...scheduleInput,
            startDate: dates[0].format("YYYY-MM-DD"),
            endDate: dates[1].format("YYYY-MM-DD"),
        });
    };

    // <=====    종일 상태변경      =====>
    const handleCheckboxChange = e => {
        setScheduleInput({
            ...scheduleInput,
            isDayAll: e.target.checked ? 1 : 0,
        });
    };

    // <=====    시간 변경      =====>
    const handleStartTimeChange = time => {
        // 선택된 시작시간과 종료시간을 비교하기 위한
        console.log("timeChange!");
        const stTime = dayjs(time, "HH:mm");
        const endTime = dayjs(scheduleInput.endTime, "HH:mm");
        const timeDiff = endTime.diff(stTime, "minute");

        // 같은 날짜인데 종료시간이 시작시간보다 빠를 경우 종료시간을 시작시간의 한시간 뒤로 바꿈
        if (scheduleInput.startDate === scheduleInput.endDate && timeDiff < 60) {
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
        const stTime = dayjs(scheduleInput.startTime, "HHmm");
        const endTime = dayjs(time, "HHmm");
        const timeDiff = endTime.diff(stTime, "minute");

        // 같은 날짜인데 종료시간이 시작시간보다 빠를 경우 시작시간을 종료시간의 한시간 전으로 바꿈
        if (scheduleInput.startDate === scheduleInput.endDate && timeDiff < 60) {
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

    // <=====    참석자      =====>
    // 체크한 참석자들을 Input에 저장
    const handleChange = attendeeArray => {
        setScheduleInput({
            ...scheduleInput,
            attendee: attendeeArray,
        });
    };

    // 서버로부터 받아올 사용자 데이터( [ { }, {} ] )에서 검색
    const handleSearch = input => {
        // mockUser의 user 중 input를 포함하는것
        const filteredUsers = mockUsers.filter(user => user.name.toLowerCase().includes(input.toLowerCase()));
        setUsers(filteredUsers);
    };

    // <=====    반복 RadioGroup 상태 변경      =====>
    const handleRepeatTypeChange = e => {
        setScheduleInput({
            ...scheduleInput,
            repeatType: e.target.value,
        });
    };

    // <=====    반복 종료일자 변경      =====>
    const handleRepeatEndDateChange = value => {
        setScheduleInput({
            ...scheduleInput,
            repeatEndDate: value.format("YYYY-MM-DD"),
        });
    };

    // <=====    반복 Select변경시 Label과 value(period) 변경(CyclePreset)      =====>
    const handleCycleChange = menu => {
        // menu : value, label (cyclePreset 참고)
        setSelectedLabel(menu.label);
        setScheduleInput({
            ...scheduleInput,
            cyclePeriod: menu.value,
        });
    };

    // "직접입력"일 때 입력한 반복주기 값을 Cycle로 변경
    const handleCycleInputChange = e => {
        setScheduleInput({
            ...scheduleInput,
            cyclePeriod: e.target.value,
        });
    };
    return (
        <>
            <SModal centered title="일정 생성" open={open} onOk={handleOk} onCancel={handleCancel} date={date}>
                <div css={SFlexBox}>
                    <STitleInput name="title" ref={inputRef} onChange={handleInputChange} value={scheduleInput.scheduleTitle} placeholder="제목을 입력해주세요.(필수)" size="large" />
                    <SColorPicker panelRender={panelRender} value={scheduleInput.labelColor} open={colorPickerOpen} onOpenChange={setColorPickerOpen} />
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
                            반복 주기 <SCycleInput name="CycleInput" onChange={handleCycleInputChange} value={scheduleInput.cyclePeriod} defaultValue="0" />일
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
                                            <SDatePicker onChange={handleRepeatEndDateChange} value={dayjs(scheduleInput.repeatEndDate)} showToday={false} />
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

export default AddScheduleModal;
