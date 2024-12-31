import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import mq from "../../components/MediaQuery";

import styled from "styled-components";

import dayjs from "dayjs";

import { Chart, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement } from "chart.js";

import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement);

const SalesMonthGraphContainer = styled.div`
  width: 100%;

  .sales-graph {
    height: 300px;
  }

  ${mq.maxWidth("md")`
      width: 100%;
  `}
`;

const SalesMonthGraph = memo(() => {
  const { monthly } = useSelector((state) => state.SalesSlice);
  console.log(monthly);

  const { salesDate, salesTotal } = useMemo(() => {
    if (!monthly) {
      return { salesDate: [], salesTotal: [] };
    }

    // monthly 데이터에서 salesDate와 salesTotal 배열 생성
    const salesDate = monthly.map((v) => v.salesDate);
    const salesTotal = monthly.map((v) => v.salesTotal);

    // reverse함수 호출해서 배열을 역순으로 변경 (시간 순서대로 보여주기 위함)
    salesDate.reverse();
    salesTotal.reverse();

    // 결과를 객체로 반환
    const result = { salesDate, salesTotal };

    return result;
  }, [monthly]);

  return (
    <SalesMonthGraphContainer>
      <div className="sales-graph">
        {/* {salesDate && JSON.stringify(salesDate)} */}
        {/* {salesTotal && JSON.stringify(salesTotal)} */}

        {salesDate && salesTotal && (
          <Line
            data={{
              labels: salesDate,
              datasets: [
                {
                  label: "원",
                  data: salesTotal,
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "left",
                },
                title: {
                  display: true,
                  text: "월간 주별 총 매출액",
                  font: {
                    size: 16,
                    color: "#000",
                  },
                },
              },
            }}
          />
        )}
      </div>
    </SalesMonthGraphContainer>
  );
});

export default SalesMonthGraph;
