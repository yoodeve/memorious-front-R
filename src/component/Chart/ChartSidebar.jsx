/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import { chartSidebarContainer } from "./style";
import ChartSidebarPeriodTab from "./ChartSidebarPeriodTab";
import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";
import ChartProfileArea from "./ChartProfileArea";
import { instance } from "../../config";
/** @jsxImportSource @emotion/react */

function ChartSidebar() {
    const [userList, setUserList] = useRecoilState(rcUserOnChartArray);
    const queryClient = useQueryClient();
    const principal = queryClient.getQueryState(["getPrincipal"]);
    const getFamilyList = async () => {
        const response = await instance.get("/api/chart/family", { params: { familyId: principal?.data.data.familyId } });
        setUserList(response.data);
    };

    useEffect(() => {
        getFamilyList();
    }, []);

    return (
        userList.length > 0 && (
            <div css={chartSidebarContainer}>
                <ChartSidebarPeriodTab />
                {userList?.map((ele, i) => {
                    return <ChartProfileArea key={ele.userId} userList={userList} index={i} user={ele} />;
                })}
            </div>
        )
    );
}

export default ChartSidebar;
