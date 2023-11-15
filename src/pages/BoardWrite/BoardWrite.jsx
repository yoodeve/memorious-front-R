/* eslint-disable */
import React, { useState } from "react";
// import { useQueryClient } from "react-query";
// import ReactQuill from "react-quill";
import Select from "react-select";
/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { instance } from "../../config";

function BoardWrite() {
    const [boardContent, setBoardContent] = useState({
        title: "",
        content: "",
        categoryId: 0,
        categoryName: "",
    });

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState(""); // 셀렉트옵션에 추가할 새 카테고리
    const [selectOptions, setSelectOptions] = useState([]); // 셀렉트옵션(카테고리)
    const [selectedOption, setSelectedOption] = useState(selectOptions[0]); // 선택된 옵션(카테고리)

    /*
    const queryClient = useQueryClient();
    
    useEffect(() => {
        console.log("queryClient: " + queryClient);
        const principal = queryClient.getQueryState("getPrincipal");
        console.log("principal : " + principal);
        
        if(!principal.data) { //로그인 자체가 안된 상태일 경우
            alert("로그인 후 게시글을 작성하세요.");
            window.location.replace("/");
            return;
        }
        if(!principal?.data?.data.enabled) { //이메일 인증이 안된 유저이면
            alert("이메일 인증 후 게시글을 작성하세요.");
            window.location.replace("/account/mypage");
        }
    },[]);
    
    useEffect(() => {
        instance.get("/board/categories")
        .then((response) => {
            setCategories(response.data);
            setSelectOptions(
                response.data.map(
                    category => {
                        return { value: category.boardCategoryId, label: category.boardCategoryName }
                    }
                )
            )
        })
    }, [])
    
    useEffect(() => {
        if (!!newCategory) { //새 카테고리가 공백이 아닐 경우에만 카테고리 추가
            const newOption = { value: 0, label: newCategory }

            setSelectedOption(newOption);
            if (!selectOptions.map(option => option.value).includes(newOption.value)) {

                setSelectOptions([
                    ...selectOptions,
                    newOption
                ]);
            }
        }
    }, [newCategory]);

    useEffect(() => {
        setBoardContent({
            ...boardContent,
            categoryId: selectedOption?.value,
            categoryName: selectedOption?.label
        });
    }, [selectedOption]);
*/
    const modules = {
        toolbar: {
            container: [[{ header: [1, 2, 3, false] }], ["bold", "underline"], ["image"]],
        },
    };

    const handleTitleInput = e => {
        setBoardContent({
            ...boardContent,
            title: e.target.value,
        });
    };

    const handleContentInput = value => {
        setBoardContent({
            ...boardContent,
            content: value,
        });
    };

    const handleSelectChange = option => {
        setSelectedOption(option);
    };

    const handleCategoryAdd = () => {
        const categoryName = window.prompt("새로 추가할 카테고리를 입력하세요.");
        if (!categoryName) {
            return;
        }
        setNewCategory(categoryName);
    };

    const handleWriteSubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };
            console.log(boardContent);
            await instance.post("/board/content", boardContent, option);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <h1>글쓰기</h1>
                <div css={S.categoryContainer}>
                    <div css={S.selectBox}>
                        <Select options={selectOptions} onChange={handleSelectChange} value={selectedOption} defaultValue={selectedOption} />
                    </div>
                    <button onClick={handleCategoryAdd}>카테고리 추가</button>
                </div>
                <div>
                    <input css={S.titleInput} type="text" name="title" placeholder="제목" onChange={handleTitleInput} />
                </div>
                {/* 게시글쓰기 라이브러리 */}
                {/* <ReactQuill style={{ width: "928px", height: "500px" }} onChange={handleContentInput} /> */}
                <div css={S.buttonContainer}>
                    <button onClick={handleWriteSubmit}>작성하기</button>
                </div>
            </div>
        </>
    );
}

export default BoardWrite;
