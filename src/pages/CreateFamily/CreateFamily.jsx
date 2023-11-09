import React from "react";

function CreateFamily() {
    return (
        <>
            <h3>가족 생성 페이지</h3>
            <div>
                <span>가족 이름: </span> <input type="text" />
            </div>
            <div>
                <span>가족 도메인: </span> <input type="text" />
            </div>
            <p>가족으로부터 초대받으셨나요? 초대받은 이메일을 확인해주세요</p>
        </>
    );
}

export default CreateFamily;
