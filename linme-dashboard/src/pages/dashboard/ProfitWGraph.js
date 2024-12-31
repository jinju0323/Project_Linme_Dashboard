import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import mq from "../../components/MediaQuery";

import styled from "styled-components";

import { Chart, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement } from "chart.js";

import { Line } from "react-chartjs-2";

// Chart.js 설정
Chart.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement);

// 스타일 설정
const ProfitWGraphContainer = styled.div`
  width: 100%;

  .profit-wgraph {
    height: 300px;
  }

  ${mq.maxWidth("md")`
      width: 100%;
  `}
`;

// ProfitWGraph 컴포넌트
const ProfitWGraph = memo(() => {
  // 리덕스 스토어에서 weekly 데이터를 가져옴
  const { weekly } = useSelector((state) => state.ProfitSlice);
  console.log("weekly: ", weekly);

  // 데이터 가공
  const { labels, datasets } = useMemo(() => {
    if (!weekly) {
      return { labels: [], datasets: [] };
    }

    // 날짜 리스트 추출 및 정렬
    const labels = [...new Set(weekly.map((item) => item.regDate))].sort((a, b) => new Date(a) - new Date(b));

    // 카테고리별 데이터 매핑
    const categories = [...new Set(weekly.map((item) => item.categoryId))];

    const categoryColors = [
      { bgColor: "rgba(255, 99, 132, 0.5)", borderColor: "rgba(255, 99, 132, 1)" }, // 카테고리 1
      { bgColor: "rgba(54, 162, 235, 0.5)", borderColor: "rgba(54, 162, 235, 1)" }, // 카테고리 2
      { bgColor: "rgba(255, 206, 86, 0.5)", borderColor: "rgba(255, 206, 86, 1)" }, // 카테고리 3
      { bgColor: "rgba(75, 192, 192, 0.5)", borderColor: "rgba(75, 192, 192, 1)" }, // 카테고리 4
    ];

    const categoryLabels = {
      1: "영양제",
      2: "비타민",
      3: "유산균",
      4: "오메가3",
    };
    const datasets = categories.map((categoryId, index) => {
      const data = labels.map((date) => {
        const record = weekly.find((item) => item.regDate === date && item.categoryId === categoryId);
        return record ? record.totalCount : 0; // 데이터가 없으면 0
      });

      return {
        label: categoryLabels[categoryId] || `카테고리 ${categoryId}`,
        data,
        backgroundColor: categoryColors[index % categoryColors.length].bgColor,
        borderColor: categoryColors[index % categoryColors.length].borderColor,
        borderWidth: 2,
      };
    });

    return { labels, datasets };
  }, [weekly]);

  return (
    <ProfitWGraphContainer>
      <div className="profit-wgraph">
        {/* 데이터 디버깅용 */}
        {/* {weekly && <p>{JSON.stringify(weekly)}</p>} */}
        {labels.length > 0 && datasets.length > 0 && (
          <Line
            data={{
              labels, // x축: 정렬된 날짜
              datasets, // y축: 카테고리별 판매량
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "주간 카테고리별 판매량",
                  font: {
                    size: 16,
                    color: "#000",
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "개",
                  },
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </ProfitWGraphContainer>
  );
});

export default ProfitWGraph;
