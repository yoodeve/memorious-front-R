/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import ReactQuill from "react-quill";
/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { instance } from "../../config";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";

function BoardWrite() {
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState({
        title: "",
        content: "",
        categoryId: 0,
        categoryName: "",
    });

    const [newCategory, setNewCategory] = useState("");
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(selectOptions[0]);

    const queryClient = useQueryClient();

    // 로그인 안돼있을 시
    useEffect(() => {
        const principal = queryClient.getQueryState("getPrincipal");

        if (!principal.data) {
            alert("로그인 후 이용 바랍니다.");
            window.location.replace("/auth/oauth2/signin");
            return;
        }
    }, []);

    // api 요청으로 받아온 카테고리 리스트를 selectOptions 배열에 저장
    useEffect(() => {
        instance.get("api/board/categories").then(response => {
            setSelectOptions(
                response.data.map(category => {
                    return {
                        value: category.boardCategoryId,
                        label: category.boardCategoryName,
                    };
                }),
            );
        });
    }, []);

    const handleAddCategory = () => {
        const categoryName = window.prompt("새로 추가할 카테고리를 입력하세요."); //모달창으로
        if (!categoryName) {
            return;
        }
        setNewCategory(categoryName);
    };

    // 새 카테고리가 추가될 때마다 selectedOption set
    useEffect(() => {
        if (!!newCategory) {
            const newOption = { value: 0, label: newCategory };

            setSelectedOption(newOption);
            if (!selectOptions.map(option => option.value).includes(newOption.value)) {
                setSelectOptions([...selectOptions, newOption]);
            }
        }
    }, [newCategory]);

    //quill

    const modules = {
        toolbar: {
            container: [[{ header: [1, 2, 3, false] }], ["bold", "underline"], ["image"]],
        },
    };
    // 셀렉트 옵션을 클릭하면 selectedOption을 set 해줌
    const handleSelectChange = option => {
        setSelectedOption(option);
    };

    //선택된 카테고리(selectedOption)에 따라 boardData의 카테고리 정보가 변경
    useEffect(() => {
        setBoardData({
            ...boardData,
            categoryId: selectedOption?.value,
            categoryName: selectedOption?.label,
        });
    }, [selectedOption]);

    const handleTitleInput = e => {
        setBoardData({
            ...boardData,
            title: e.target.value,
        });
    };

    const handleContentInput = value => {
        setBoardData({
            ...boardData,
            content: value,
        });
    };

    // 게시글 작성 submit
    const handleWriteSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };

            await instance.post("api/board/content", boardData, option);
            alert("게시글 작성이 완료되었습니다.");
            navigate("/board");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div css={S.layout}>
            <div css={S.categoryContainer}>
                <div css={S.selectBox}>
                    <ReactSelect options={selectOptions} onChange={handleSelectChange} value={selectedOption} defaultValue={selectedOption} placeholder="카테고리 선택" isSearchable={false} />
                </div>
                <button css={S.addCategory} onClick={handleAddCategory}>
                    카테고리 추가
                </button>
            </div>
            <div>
                <input css={S.titleInput} type="text" name="title" placeholder="제목" onChange={handleTitleInput} />
            </div>
            {/* 게시글쓰기 라이브러리 */}
            <ReactQuill className="quill-container" modules={modules} onChange={handleContentInput} />
            <div css={S.buttonContainer}>
                <button css={S.writeBoardButton} onClick={handleWriteSubmit}>
                    글 작성
                </button>
            </div>
        </div>
    );
}

export default BoardWrite;
