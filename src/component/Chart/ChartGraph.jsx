/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { chartGraphDummyDataObj } from "./chartDummyData";

function ChartGraph() {
    const chartRef = useRef();
    useEffect(() => {
        const bloodSugarData = chartGraphDummyDataObj.bloodSugar.map(e => e.data);
        const w = 400;
        const h = 300;
        const svg = d3.select(chartRef.current).attr("width", w).attr("height", h).style("background", "#fff").style("margin", 50).style("overflow", "visible");
        const xScale = d3
            .scaleLinear()
            .domain([0, bloodSugarData.length - 1])
            .range([0, w]);
        const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

        const generateLine = d3
            .line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal);

        const xAxis = d3
            .axisBottom(xScale)
            .ticks(bloodSugarData.length)
            .tickFormat(i => i + 1);

        const yAxis = d3.axisLeft(yScale).ticks(1);

        svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
        svg.append("g").call(yAxis);

        svg.selectAll(".line")
            .data([bloodSugarData])
            .join("path")
            .attr("d", d => generateLine(d))
            .attr("fill", "none")
            .attr("stroke", "black");
    }, []);

    return <svg ref={chartRef} />;
}

export default ChartGraph;
