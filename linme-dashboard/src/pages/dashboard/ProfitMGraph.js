import React, { memo, useMemo } from "react";
import styled from "styled-components";

import mq from "../../components/MediaQuery";

/** 리덕스 관련 */
import { useSelector } from "react-redux";

/** chart.js 관련 */
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from "chart.js";

import { Bar } from "react-chartjs-2";

// Chart.js 기능 확장
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const ProfitMGraphContainer = styled.div`
  width: 100%;

  .profit-mgraph {
    height: 300px;
  }

  ${mq.maxWidth("md")`
      width: 100%;
  `}
`;

const ProfitMGraph = memo(() => {
  const { monthly } = useSelector((state) => state.ProfitSlice);
  console.log("monthly: ", monthly);

  const { labels, datasets } = useMemo(() => {
    if (!monthly) {
      return { labels: [], datasets: [] };
    }

    // 고정된 색상 정의
    const categoryColors = {
      1: { backgroundColor: "rgba(255, 99, 132, 0.5)", borderColor: "rgba(255, 99, 132, 1)" },
      2: { backgroundColor: "rgba(54, 162, 235, 0.5)", borderColor: "rgba(54, 162, 235, 1)" },
      3: { backgroundColor: "rgba(255, 206, 86, 0.5)", borderColor: "rgba(255, 206, 86, 1)" },
      4: { backgroundColor: "rgba(75, 192, 192, 0.5)", borderColor: "rgba(75, 192, 192, 1)" },
    };

    // 카테고리 ID 추출
    const categories = [...new Set(monthly.map((item) => item.categoryId))];
    // 날짜 데이터 추출
    const labels = [...new Set(monthly.map((item) => item.regDate))].sort((a, b) => new Date(a) - new Date(b));

    // 카테고리별 데이터를 날짜별로 매핑
    const datasets = categories.map((categoryId) => {
      const data = labels.map((date) => {
        const record = monthly.find((item) => item.regDate === date && item.categoryId === categoryId);
        return record ? record.totalCount : 0; // 데이터가 없으면 0
      });

      const colors = categoryColors[categoryId] || { backgroundColor: "rgba(0, 0, 0, 0.5)", borderColor: "rgba(0, 0, 0, 1)" };

      // 카테고리 ID에 따라 label 변경
      const categoryLabels = {
        1: "영양제",
        2: "비타민",
        3: "유산균",
        4: "오메가3",
      };
      return {
        label: categoryLabels[categoryId] || `카테고리 ${categoryId}`,
        data,
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 1,
      };
    });

    return { labels, datasets };
  }, [monthly]);

  return (
    <ProfitMGraphContainer>
      <div className="profit-mgraph">
        {/* 데이터 디버깅용 */}
        {/* {monthly && <p>{JSON.stringify(monthly)}</p>} */}

        {labels.length > 0 && datasets.length > 0 && (
          <Bar
            data={{
              labels, // X축: 날짜
              datasets, // Y축: 카테고리별 데이터
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: "x", // Y축을 카테고리로 설정
              plugins: {
                legend: {
                  position: "bottom",
                },
                title: {
                  display: true,
                  text: "월간 카테고리별 판매량",
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
                  beginAtZero: true,
                },
                y: {
                  title: {
                    display: true,
                    text: "개",
                  },
                },
              },
            }}
          />
        )}
      </div>
    </ProfitMGraphContainer>
  );
});

export default ProfitMGraph;
