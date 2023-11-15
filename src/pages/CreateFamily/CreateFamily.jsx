import React, { useState } from "react";
import { useNavigate } from "react-router";
import { instance } from "../../config";

function CreateFamily() {
    const navigate = useNavigate();
    const [familyData, setFamilyData] = useState({
        familyName: "",
    });
    const handleInputChange = e => {
        setFamilyData({
            ...familyData,
            [e.target.name]: e.target.value,
        });
        console.log(familyData);
    };

    const createFamilySubmit = async () => {
        try {
            const option = {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            };

            await instance.post("api/create/family", familyData, option);
            alert("가족 페이지 생성이 완료되었습니다.");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h3>우리 가족을 위한 기억 공간을 생성하세요</h3>
            <div>
                <span>가족 이름: </span> <input onChange={handleInputChange} name="familyName" type="text" />
            </div>
            <p>가족으로부터 초대받으셨나요? 초대받은 이메일을 확인해주세요</p>
            <button onClick={createFamilySubmit}>가입하기</button>
        </>
    );
}

export default CreateFamily;
