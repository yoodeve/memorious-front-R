import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import InviteConfirmModal from "../../component/Invite/InviteConfirmModal";
import { instance } from "../../config";

function CreateFamily() {
    const navigate = useNavigate();
    const [familyData, setFamilyData] = useState({
        familyName: "",
    });

    // <<<<<<       author: 성광         >>>>>>
    const [isInvited, setIsInvited] = useState(false);

    const getPrincipal = useQuery(
        ["getPrincipal"],
        async () => {
            try {
                const option = {
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                };
                return await instance.get("/api/account/principal", option);
            } catch (err) {
                throw new Error(err);
            }
        },
        {
            retry: 0,
            refetchInterval: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
        },
    );

    const principal = getPrincipal?.data?.data;
    const email = principal?.email;

    // 초대이력에 본인과 같은 이메일이 있으면
    useEffect(() => {
        const isInvitation = async () => {
            try {
                if (principal && principal.email) {
                    const response = await instance.get("api/invitation/history");
                    setIsInvited(response?.data);
                    console.log(response?.data);
                } else {
                    console.log("principal이 null");
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (principal && email) {
            isInvitation();
        }
    }, [principal]);
    // <<<<<<           성광            >>>>>>

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
            window.alert("가족 페이지 생성이 완료되었습니다.");
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
            <InviteConfirmModal open={isInvited} setOpen={setIsInvited} />
        </>
    );
}

export default CreateFamily;
