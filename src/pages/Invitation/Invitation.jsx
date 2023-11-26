import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Invitation() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("");

    useEffect(() => {
        if (token) {
            const BearerToken = `Bearer ${token}`;
            localStorage.setItem("InvitationToken", BearerToken);
        }
        const timeoutId = setTimeout(() => {
            navigate("/", { replace: true });
        }, 500);

        // useEffect에서 반환하는 함수는 cleanup 함수입니다.
        return () => clearTimeout(timeoutId);
    }, [token]);

    return (
        <>
            <h1>인증절차 진행 중, 잠시 후 회원가입/로그인 페이지로 이동합니다.</h1>
        </>
    );
}

export default Invitation;
