/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { chartGraphDummyDataObj, chartGraphDummyDataObj2 } from "./chartDummyData";

function StepChart() {
    const chartRef = useRef();
    useEffect(() => {
        const DATA = [chartGraphDummyDataObj.step.map(e => e.data), chartGraphDummyDataObj2.step.map(e => e.data)];
        const w = 350;
        const h = 120;

        const svg = d3.select(chartRef.current).attr("width", w).attr("height", h).style("background", "#fff").style("margin-top", 40).style("overflow", "visible");

        const xScale = d3
            .scaleLinear()
            .domain([0, DATA[0].length - 1])
            .range([0, w]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(DATA.flat())])
            .range([h, 0]);

        const generateLine = d3
            .line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal);

        const xAxis = d3
            .axisBottom(xScale)
            .ticks(DATA[0].length)
            .tickFormat(i => i + 1);
        const yAxis = d3.axisLeft(yScale).ticks(5);

        svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
        svg.append("g").call(yAxis);

        DATA.forEach((e, index) => {
            svg.append("path")
                .data([e])
                .attr("d", d => generateLine(d))
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", `#${index % 3 === 0 ? "666666" : index % 3 === 1 ? "e6a156" : "952323"}`);
        });
    }, [chartGraphDummyDataObj, chartGraphDummyDataObj2, chartRef]);

    return <svg ref={chartRef} />;
}

export default StepChart;
