import { Dropdown } from "antd";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InviteModal from "../Invite/InviteModal";
import { sidebarMenuList } from "./sidebarMenu";
import { bottomSettingMenuBox, file, groupBox, groupBoxWrapper, imageBox, sideBarLabel, sidebarContainer } from "./style";
/** @jsxImportSource @emotion/react */

function SidebarContainer({ principal }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const navigateToPage = route => () => {
        navigate(route);
    };

    const handleInviteClick = () => {
        setModalOpen(true);
    };

    const profileFileRef = useRef();

    const handleProfileUploadClick = () => {
        profileFileRef.current.click();
    };

    const handleProfileFileChange = e => {
        const { files } = e.target;
        console.log(files);
    };
    const handleLogoutClick = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("InvitationToken");
        window.location.reload();
    };

    const items = [
        {
            key: "1",
            label: <span onClick={() => navigate("/setting/myfamily")}>가족페이지</span>,
        },
        {
            key: "2",
            label: <span onClick={handleInviteClick}>가족초대하기</span>,
        },
    ];

    return (
        <div css={sidebarContainer}>
            <div className="img-wrapper">
                <div css={imageBox} />
            </div>
            <div css={groupBoxWrapper}>
                <div css={groupBox}>
                    {sidebarMenuList.map(e => (
                        <div key={e.title} className="group-box">
                            <div className={pathname.includes(e.route) ? "filled" : ""} onClick={e.route && navigateToPage(e.route)} css={sideBarLabel(e.route)}>
                                {e.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div css={bottomSettingMenuBox}>
                <div className="profile-area">
                    <span onClick={handleProfileUploadClick} className="profile-img">
                        <img src={principal.profileUrl} alt="" />
                    </span>
                    <input css={file} type="file" onChange={handleProfileFileChange} ref={profileFileRef} />
                    <span className="my-label">{principal.nickname}</span>
                </div>
                <div className="right-titles">
                    <Dropdown menu={{ items }} placement="topRight" arrow={{ pointAtCenter: true }}>
                        <span>설정</span>
                    </Dropdown>
                    <InviteModal open={modalOpen} setOpen={setModalOpen} />
                    <span onClick={handleLogoutClick}>로그아웃</span>
                </div>
            </div>
        </div>
    );
}

export default SidebarContainer;
