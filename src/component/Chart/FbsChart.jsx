/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { chartGraphDummyDataObj } from "./chartDummyData";
import { rcUserOnChartArray } from "../../store/atoms/chartAtoms";

function FbsChart() {
    const chartRef = useRef();
    const userList = useRecoilValue(rcUserOnChartArray);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(
            userList.map(e => {
                return chartGraphDummyDataObj(e);
            }),
        );
    }, [userList]);

    useEffect(() => {
        if (userList.length > 0 && data.length > 0) {
            // const formatTime = d3.timeFormat("%m-%d");
            // const w = 350;
            // const h = 120;
            // const startDate = dayjs(data.map(e => e.startDate));
            // const endDate = dayjs(startDate).add(7, "day");
            // const dataArray = userList.map(name => {
            //     return data.map(el => {
            //         return el[name];
            //     });
            // });
            // const maxYValue = Math.max([...dataArray]);
            // const svg = d3.select(chartRef.current).attr("width", w).attr("height", h).style("background", "#fff").style("margin-top", 40).style("overflow", "visible");
            // const xScale = d3.scaleTime().domain([startDate, endDate]).range([0, w]);
            // const yScale = d3.scaleLinear().domain([0, maxYValue]).range([h, 0]);
            // const xAxis = d3.axisBottom(xScale).tickFormat(formatTime);
            // const yAxis = d3.axisLeft(yScale).tickSize(20);
            // svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
            // svg.append("g").call(yAxis);
            // if (dataArray.length > 0) {
            //     const generateLine = d3
            //         .line()
            //         .x((d, i) => xScale(i))
            //         .y(yScale)
            //         .curve(d3.curveCardinal);
            //     dataArray.forEach((e, index) => {
            //         console.log(dataArray);
            //         svg.append("path")
            //             .data([e])
            //             .attr("d", d => {
            //                 return generateLine(d);
            //             })
            //             .attr("fill", "none")
            //             .attr("stroke-width", 2)
            //             // eslint-disable-next-line no-nested-ternary
            //             .attr("stroke", `#${index % 3 === 0 ? "666666" : index % 3 === 1 ? "e6a156" : "952323"}`);
            //     });
            // }
        }
    }, [chartRef, data]);

    return <svg ref={chartRef} />;
}

export default FbsChart;
