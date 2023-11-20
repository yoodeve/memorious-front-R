/* eslint-disable */
import React, { useEffect, useState } from "react";
// import { useQueryClient } from "react-query";
// import ReactQuill from "react-quill";
/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { instance } from "../../config";
import { Select } from "antd";
import { useQuery } from "react-query";

function BoardWrite() {
    const [boardData, setBoardData] = useState({
        title: "",
        content: "",
        categoryId: 0,
        categoryName: "",
    });

    const [categoryList, setCategoryList] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(selectOptions[0]);
    
    console.log("selectedOption >> ", selectedOption);
    
    // const getCategories = useQuery
    
    useEffect(() => {
        instance.get("api/board/categories").then(response => {
            setCategoryList(response.data);
            setSelectOptions(
                response.data.map(category => {
                    return { value: category.boardCategoryId, label: category.boardCategoryName };
                }),
            );
        });
    }, []);
    
    console.log("selectOptions >> ", selectOptions);
    

    const handleAddCategory = () => {
        const categoryName = window.prompt("새로 추가할 카테고리를 입력하세요."); //모달창으로
        if (!categoryName) {
            return;
        }
        setNewCategory(categoryName);
    };

    useEffect(() => {
        if (!!newCategory) {
            const newOption = { value: 0, label: newCategory };

            setSelectedOption(newOption);
            if (!selectOptions.map(option => option.value).includes(newOption.value)) {
                setSelectOptions([...selectOptions, newOption]);
            }
        }
    }, [newCategory]);

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

    const handleSelectChange = option => {
        setSelectedOption(option);
    };

    // const handleWriteSubmit = async () => {
    //     try {
    //         const option = {
    //             headers: {
    //                 Authorization: localStorage.getItem("accessToken"),
    //             },
    //         };
    //         console.log(boardContent);
    //         await instance.post("/board/content", boardContent, option);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <>
            <div css={S.layout}>
                <h1>게시글 쓰기</h1>
                <div css={S.categoryContainer}>
                    <div css={S.selectBox}>
                        <Select
                            style={{
                                width: 200,
                            }}
                            options={selectOptions}
                            onChange={handleSelectChange}
                            value={selectedOption}
                            defaultValue={selectedOption}
                        />
                    </div>
                    <button onClick={handleAddCategory}>카테고리 추가</button>
                </div>
                <div>
                    <input css={S.titleInput} type="text" name="title" placeholder="제목" onChange={handleTitleInput} />
                </div>
                {/* 게시글쓰기 라이브러리 */}
                {/* <ReactQuill style={{ width: "928px", height: "500px" }} onChange={handleContentInput} /> */}
                <div css={S.buttonContainer}>{/* <button onClick={handleWriteSubmit}>작성하기</button> */}</div>
            </div>
        </>
    );
}

export default BoardWrite;
