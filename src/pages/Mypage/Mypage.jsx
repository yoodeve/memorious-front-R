import React, { useRef } from "react";
import { MainContainer, file, infoContainer, socialTextBox, textBox, userImgBox } from "./Style";
/** @jsxImportSource @emotion/react */
import kakaoIcon from "../../assets/kakaotalk_sharing_btn_small.png";
import naverIcon from "../../assets/naver_retangle_icon.png";
import defaultProfileImg from "../../assets/NicePng_watsapp-icon-png_9332131.png";

function Mypage() {
    const profileFileRef = useRef();

    const handleProfileUploadClick = () => {
        if (window.confirm("프로필 사진을 변경하시겠습니까?")) {
            profileFileRef.current.click();
        }
    };

    const handleProfileFileChange = e => {
        const { files } = e.target;
        console.log(files);
    };
    return (
        <div css={MainContainer}>
            <h1>마이페이지</h1>
            <div css={infoContainer}>
                <div css={userImgBox} onClick={handleProfileUploadClick}>
                    <img src={defaultProfileImg} alt="defaultUser" />
                </div>
                <input css={file} type="file" onChange={handleProfileFileChange} ref={profileFileRef} />
                <div css={textBox}>
                    <h2>이름</h2>
                    <span>주성광</span>
                </div>
                <div css={textBox}>
                    <h2>이메일</h2>
                    <span>example@gmail.com</span>
                </div>
                <div css={textBox}>
                    <h2>생일</h2>
                    <span>2000.01.01</span>
                </div>
                <div>
                    <h2>연동된 소셜 계정</h2>
                    <div>
                        <div css={socialTextBox}>
                            <img src={kakaoIcon} alt="kakaoIcon" />
                            <span>example@kakao.com</span>
                        </div>
                        <div css={socialTextBox}>
                            <img src={naverIcon} alt="naverIcon" />
                            <span>example@naver.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mypage;
