import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { sidebarMenuList } from "./sidebarMenu";
import { bottomSettingMenuBox, groupBox, groupBoxWrapper, imageBox, sideBarLabel, sidebarContainer } from "./style";
/** @jsxImportSource @emotion/react */

function Sidebar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const navigateToPage = route => () => {
        navigate(route);
    };

    const items = [
        {
            key: "1",
            label: <span onClick={() => navigate("/setting/myfamily")}>가족페이지</span>,
        },
        {
            key: "2",
            label: <span onClick={() => navigate("/setting/mypage")}>마이페이지</span>,
        },
        {
            key: "3",
            label: <span>가족초대하기</span>,
        },
    ];

    return (
        <div css={sidebarContainer}>
            <div css={imageBox} />
            <div css={groupBoxWrapper}>
                <div css={groupBox}>
                    {sidebarMenuList.map((e, index) => (
                        <div key={e.title} className="group-box">
                            <div className={pathname === e.route ? "filled" : ""} onClick={navigateToPage(e.route, index)} css={sideBarLabel}>
                                {e.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div css={bottomSettingMenuBox}>
                <span className="my-label">My프로필</span>
                <div className="right-titles">
                    <Dropdown menu={{ items }} placement="topRight" arrow={{ pointAtCenter: true }}>
                        <span>설정</span>
                    </Dropdown>
                    <span>로그아웃</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
