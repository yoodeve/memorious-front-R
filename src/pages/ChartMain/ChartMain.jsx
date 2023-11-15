import React from "react";
import { useNavigate } from "react-router-dom";
import { chartMainContainer } from "../../component/Chart/style";
import ChartGraph from "../../component/Chart/ChartGraph";
import Chart from "../../component/Chart/Chart";
/** @jsxImportSource @emotion/react */

function ChartMain() {
    const navigate = useNavigate();
    const navigateToDetailRoute = () => {
        navigate("/chart/detail");
    };
    return (
        <Chart>
            <div css={chartMainContainer}>
                <h1>우리가족의 건강 데이터</h1>
                <ChartGraph />
                <div className="chart-button-area">
                    <button onClick={navigateToDetailRoute}>내 데이터 입력하러 가기</button>
                </div>
            </div>
        </Chart>
    );
}

export default ChartMain;
