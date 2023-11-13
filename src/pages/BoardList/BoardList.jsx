import React from "react";
import { Reset } from "styled-reset";
import ReactSelect from "react-select";
/** @jsxImportSource @emotion/react */
import { HiSearch } from "react-icons/hi";
import * as S from "./style";

function BoardList() {
    const options = [
        { value: "전체", label: "전체" },
        { value: "제목", label: "제목" },
        { value: "작성자", label: "작성자" },
    ];

    return (
        <>
            <Reset />
            <div css={S.layout}>
                <div css={S.searchContainer}>
                    <div css={S.selectBox}>
                        <ReactSelect className="select-box" options={options} defaultValue={options[0]} />
                    </div>
                    <input css={S.searchInput} type="text" />
                    <div className="icon-box">
                        <HiSearch size={20} />
                    </div>
                </div>
                <div css={S.categoryBox}>
                    <div css={S.category}>공지</div>
                    <div css={S.category}>회의록</div>
                    <div css={S.category}>식단</div>
                </div>
                <table css={S.table}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2</td>
                            <td>건의 있어요</td>
                            <td>아들1</td>
                            <td>11/13</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>11/13 가족회의록</td>
                            <td>엄마</td>
                            <td>11/13</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>11/13 가족회의록</td>
                            <td>엄마</td>
                            <td>11/13</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>11/13 가족회의록</td>
                            <td>엄마</td>
                            <td>11/13</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>
                <div css={S.pageNumbers}>{/* {pagination()} */}</div>
            </div>
        </>
    );
}

export default BoardList;
