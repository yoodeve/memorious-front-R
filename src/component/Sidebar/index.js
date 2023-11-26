import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { Dropdown } from "antd";
import { Line } from "rc-progress";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../config";
import { storage } from "../../config/firebase/firebase";
import InviteModal from "../Invite/InviteModal";
import { sidebarMenuList } from "./sidebarMenu";
import { bottomSettingMenuBox, file, groupBox, groupBoxWrapper, imageBox, sideBarLabel, sidebarContainer } from "./style";
/** @jsxImportSource @emotion/react */

function SidebarContainer({ principal }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [profileImgSrc, setProfileImgSrc] = useState(principal.profileUrl);
    const [progressPercent, setProgressPercent] = useState(0);
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

        if (!files.length) {
            setUploadFiles([]);
            e.target.value = "";
            return;
        }
        setUploadFiles(prevUploadFiles => [...prevUploadFiles, ...files]);

        const reader = new FileReader();
        reader.onload = () => {
            const newImage = new Image();
            newImage.src = reader.result;

            newImage.onload = () => {
                setProfileImgSrc(newImage.src);
            };
        };

        reader.readAsDataURL(files[0]);

        const storageRef = ref(storage, `files/profile/${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);

        uploadTask.on(
            "state_changed",
            snapshot => {
                setProgressPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
            },
            error => {
                console.error(error);
            },

            () => {
                // 화면 이미지 변경 + 서버에 이미지 저장.
                getDownloadURL(storageRef).then(downloadUrl => {
                    setProfileImgSrc(downloadUrl);
                    instance.put("api/account/profile/img", { profileUrl: downloadUrl }).then(() => {});
                });
            },
        );
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
                        <img src={profileImgSrc} alt="" />
                    </span>
                    <input css={file} type="file" onChange={handleProfileFileChange} ref={profileFileRef} />
                    {!!uploadFiles.length && (
                        <div>
                            <Line percent={progressPercent} strokeWidth={6} strokeColor="#e6a157" />
                        </div>
                    )}
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
