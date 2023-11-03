import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarMenuList } from "./sidebarMenu";
import { bottomSettingMenuBox, groupBox, groupBoxWrapper, imageBox, sideBarLabel, sidebarContainer } from "./style";
/** @jsxImportSource @emotion/react */

function Sidebar() {
    const [selected, setSelected] = useState(0);

    const navigate = useNavigate();

    const navigateToPage = (route, index) => () => {
        setSelected(index);
        navigate(route);
    };

    return (
        <div css={sidebarContainer}>
            <div css={imageBox} />
            <div css={groupBoxWrapper}>
                <div css={groupBox}>
                    {sidebarMenuList.map((e, index) => (
                        <div key={e.title} className="group-box">
                            <div className={index === selected ? "filled" : ""} onClick={navigateToPage(e.route, index)} css={sideBarLabel}>
                                {e.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div css={bottomSettingMenuBox}>
                <span className="my-label">마이프로필</span>
                <div className="right-titles" onClick={navigate("/setting/mypage")}>
                    <span>설정</span>
                    <span>로그아웃</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
