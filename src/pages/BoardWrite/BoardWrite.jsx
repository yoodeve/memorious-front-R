/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import ReactQuill from "react-quill";
/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { instance } from "../../config";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

function BoardWrite() {
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState({
        title: "",
        content: "",
        categoryId: null,
        categoryName: "",
    });

    const [newCategory, setNewCategory] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(options[0]);

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

    // get categoryList -> options
    useEffect(() => {
        instance.get("api/board/categories").then(response => {
            setOptions(
                response.data.map(category => {
                    return {
                        value: category.boardCategoryId,
                        label: category.boardCategoryName,
                    };
                }),
            );
        });
    }, []);

    // 카테고리 추가
    const handleAddCategory = () => {
        const categoryName = window.prompt("새로 추가할 카테고리를 입력하세요."); //모달창으로
        if (!categoryName) {
            return;
        }
        setNewCategory(categoryName);
    };

    useEffect(() => {
        if (newCategory) {
            const newOption = { value: 0, label: newCategory };

            setSelectedOption(newOption);
            setOptions([...options, newOption]);

            // 쌤한테 물어보기: value를 0으로 뒀을 때, 두 개 이상 추가는 안되게
            //아래 로직은 아닌 거 같음
            // console.log("options >> ", options);
            // const result = options.filter(option => option.value === 0);
            // console.log(result.length); //0이 나오면 인덱스 0이 없는 거임

            // if (result.length === 0) {
            //     setOptions([...options, newOption]);
            // }

            if (!options.map(option => option.value).includes(newOption.value)) {
                console.log("여기 옴?");
                if (!options.map(option => option.label).includes(newOption.label)) {
                    setOptions([...options, newOption]);
                }
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
    const handleSelectChange = (value, option) => {
        console.log("선택된 option", option);
        setSelectedOption(option);
        // console.log("selectedOption >> ", selectedOption);

        // setBoardData({
        //     ...boardData,
        //     categoryId: option.value,
        //     categoryName: option.label,
        // });
        // console.log("옵션선택 후 boardData >> ", boardData);
    };

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
            console.log("options >> ", options);
            console.log("selectedOption >> ", selectedOption);
            console.log("boardData >> ", boardData);
            await instance.post("api/board/content", boardData);
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
                    <Select style={{ width: "150px", height: "40px" }} options={options} onChange={handleSelectChange} value={selectedOption} placeholder="카테고리 선택" />
                    {/* <ReactSelect options={selectOptions} onChange={handleSelectChange} value={selectedOption} defaultValue={selectedOption} placeholder="카테고리 선택" isSearchable={false} /> */}
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
