import React from "react";
import { Reset } from "styled-reset";
/** @jsxImportSource @emotion/react */
import { HiSearch } from "react-icons/hi";
import * as S from "./style";

function BoardList() {
    return (
        <>
            <Reset />
            <div css={S.layout}>
                <div css={S.searchContainer}>
                    <span css={S.selectBox}>카테고리</span>
                    <input css={S.searchInput} type="text" />
                    <span>
                        <HiSearch style={{ margin: "7px 0 0 6px", cursor: "pointer" }} />
                    </span>
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
            </div>
        </>
    );
}

export default BoardList;
