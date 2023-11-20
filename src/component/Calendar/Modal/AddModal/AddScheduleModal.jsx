// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundForward, IoMdArrowForward } from "react-icons/io";
import { instance } from "../../../../config";
import { LabelColorPreset } from "../../../../constants/Calendar/LabelColorPreset";
import { RepeatCyclePreset } from "../../../../constants/Calendar/RepeatCyclePreset";
import LabelColorBadge from "./LabelColorBadge/LabelColorBadge";
import { SAttendeeSelect, SCheckbox, SColorPicker, SCycleInput, SCycleSelect, SDatePicker, SDescriptionInput, SLocationInput, SModal, SRadio, SRadioGroup, SRangePicker, SRepeatInput, SSelectOption, STimePicker, STitleInput } from "./StyledComponents/style";
import { SCycleBox, SFlexBox, SPanelBox, SRepeatBox, SRepeatEnd, SRepeatTypeBox, STime } from "./style";
/** @jsxImportSource @emotion/react */

function AddScheduleModal({ open, setOpen, date }) {
    // 시간 선택시 UX를 위해 기본 시간을 중앙에 있는 값으로 변경
    const defaultStTime = date.set("hour", 12).set("m", 0).format("HH:mm");
    const defaultEndTime = date.set("hour", 13).set("m", 0).format("HH:mm");

    // dayjs to String
    const formattedDate = date.format("YYYY-MM-DD");

    const defaultSchedule = {
        title: "",
        labelColor: "#8BBB11",
        startDate: formattedDate,
        endDate: formattedDate,
        isAllDay: 1,
        startTime: "",
        endTime: "",
        attendee: [], // id만 넘겨줌
        location: "",
        repeatType: "none",
        repeatCycle: RepeatCyclePreset[0].value,
        repeatEndDate: "0000:00:00",
        repeatCount: "",
        description: "",
    };

    const [selectedRepeatLabel, setSelectedRepeatLabel] = useState(RepeatCyclePreset[0].label);
    const [scheduleInput, setScheduleInput] = useState(defaultSchedule);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [repeatEndDate, setRepeatEndDate] = useState(formattedDate);
    const [attendeeValue, setAttendeeValue] = useState([]);

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
    const handleOk = async () => {
        // setOpen(false);
        // todo : 수정 필요
        // repeatEndDate: prevScheduleInput.repeatType === "date" ? prevScheduleInput.repeatEndDate : "0000-00-00",

        console.log(scheduleInput);
        try {
            const response = await instance.post("/api/calendar/schedule", scheduleInput);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
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
                {LabelColorPreset.colors.map(color => (
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
            isAllDay: e.target.checked ? 1 : 0,
            startTime: defaultStTime,
            endTime: defaultEndTime,
        });
    };

    // <=====    시간 변경      =====>
    const handleStartTimeChange = time => {
        // 선택된 시작시간과 종료시간을 비교하기 위한
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
    const handleChange = attendees => {
        // attendees : key(userId) / name(username)
        console.log(attendees);
        const keys = attendees.map(attendee => attendee.key);
        const options = attendees.map(attendee => ({
            value: attendee.key,
            label: attendee.label,
        }));

        setAttendeeValue(options);
        setScheduleInput({
            ...scheduleInput,
            attendee: keys,
        });

        console.log(attendeeValue);
        console.log(scheduleInput.attendee);
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
        setRepeatEndDate(value.format("YYYY-MM-DD"));

        setScheduleInput({
            ...scheduleInput,
            repeatEndDate: value.format("YYYY-MM-DD"),
        });
    };

    // <=====    반복 Select변경시 Label과 value(period) 변경(RepeatCyclePreset)      =====>
    const handleCycleChange = menu => {
        // menu : value, label (cyclePreset 참고)
        setSelectedRepeatLabel(menu.label);
        setScheduleInput({
            ...scheduleInput,
            repeatCycle: menu.label,
        });
    };

    // "직접입력"일 때 입력한 반복주기 값을 Cycle로 변경
    const handleCycleInputChange = e => {
        setScheduleInput({
            ...scheduleInput,
            repeatCycle: e.target.value,
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
                    <SRangePicker onChange={handleDateChange} value={[dayjs(scheduleInput.startDate, "YYYY-MM-DD"), dayjs(scheduleInput.endDate, "YYYY-MM-DD")]} defaultValue={[date, date]} size="large" separator={<IoMdArrowForward />} />
                    <SCheckbox checked={scheduleInput.isAllDay} onChange={handleCheckboxChange}>
                        종일
                    </SCheckbox>
                </div>
                {!scheduleInput.isAllDay && (
                    <div css={SFlexBox}>
                        <STimePicker css={STime} onSelect={handleStartTimeChange} value={dayjs(scheduleInput.startTime, "HH:mm")} suffixIcon={<IoIosArrowRoundForward />} minuteStep="10" format="HH:mm" size="large" />
                        <STimePicker css={STime} onSelect={handleEndTimeChange} value={dayjs(scheduleInput.endTime, "HH:mm")} minuteStep="10" format="HH:mm" size="large" />
                    </div>
                )}
                <SAttendeeSelect labelInValue showSearch key={attendeeValue.key} value={attendeeValue.value} label={attendeeValue.label} mode="multiple" placeholder="참석자" filterOption={false} onSearch={handleSearch} onChange={handleChange} size="large">
                    {users.map(user => (
                        <SSelectOption key={user.id} value={user.name}>
                            {user.name}
                        </SSelectOption>
                    ))}
                </SAttendeeSelect>
                <SLocationInput name="location" onChange={handleInputChange} value={scheduleInput.location} placeholder="위치" size="large" />
                <SCycleSelect labelInValue onChange={handleCycleChange} defaultValue={{ label: RepeatCyclePreset[0].label, value: RepeatCyclePreset[0].value }} options={RepeatCyclePreset} size="large" />

                <div css={SRepeatBox}>
                    {selectedRepeatLabel === RepeatCyclePreset[5].label ? ( // 선택된 라벨이 "직접 입력" 일 때
                        <div css={SCycleBox}>
                            <span>반복 주기</span>
                            <SCycleInput name="CycleInput" onChange={handleCycleInputChange} value={scheduleInput.repeatCycle} defaultValue="0" size="small" />
                            <span>일</span>
                        </div>
                    ) : null}
                    {selectedRepeatLabel === RepeatCyclePreset[0].label ? null : ( // '반복안함'이 아닐 경우
                        <div>
                            <div css={SRepeatEnd}>종료</div>
                            <SRadioGroup onChange={handleRepeatTypeChange} value={scheduleInput.repeatType}>
                                <div css={SRepeatTypeBox}>
                                    <SRadio value="none">없음</SRadio>
                                </div>
                                <div css={SRepeatTypeBox}>
                                    <SRadio value="date">일자</SRadio>
                                    <SDatePicker onChange={handleRepeatEndDateChange} value={dayjs(repeatEndDate)} disabled={scheduleInput.repeatType !== "date"} showToday={false} size="small" />
                                </div>
                                <div css={SRepeatTypeBox}>
                                    <SRadio value="count">횟수</SRadio>
                                    <SRepeatInput name="repeatCount" onChange={handleInputChange} value={scheduleInput.repeatCount} disabled={scheduleInput.repeatType !== "count"} size="small" />
                                    <span>회ㅋㅋㅋㅋㅋ</span>
                                </div>
                            </SRadioGroup>
                        </div>
                    )}
                </div>

                <SDescriptionInput name="description" onChange={handleInputChange} value={scheduleInput.description} placeholder="설명" size="large" />
            </SModal>
        </>
    );
}

export default AddScheduleModal;
