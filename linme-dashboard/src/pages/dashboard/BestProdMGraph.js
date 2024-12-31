import React, { memo, useMemo } from "react";
import styled from "styled-components";

import mq from "../../components/MediaQuery";

/** 리덕스 관련 */
import { useSelector } from "react-redux";

/** chart.js 관련 */
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, Ticks } from "chart.js";

import { Bar } from "react-chartjs-2";

// Chart.js 기능 확장
Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const BestProdMGraphContainer = styled.div`
  width: 100%;

  .container {
    height: 300px;
  }

  ${mq.maxWidth("md")`
    width: 100%;
`}
`;

const BestProdMGraph = memo(() => {
  const { monthly } = useSelector((state) => state.BestProductsSlice);
  console.log("monthly : ", monthly);

  const { productName, orderCount } = useMemo(() => {
    if (!monthly) {
      return { productName: [], orderCount: [] };
    }

    const productName = monthly.map((v) => {
      const name = v.productName.replace(/_.*$/, "").replace(/\[.*?\]/g, "");
      return name.length > 15 ? name.substring(0, 15) : name;
    });
    const orderCount = monthly.map((v) => v.orderCount);

    return { productName, orderCount };
  }, [monthly]);

  return (
    <BestProdMGraphContainer>
      <div className="container">
        {/* {monthly && <p>{JSON.stringify(monthly)}</p>} */}

        {productName && orderCount && (
          <Bar
            data={{
              labels: productName,
              datasets: [
                {
                  label: "판매수량",
                  data: orderCount,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: "y",
              plugins: {
                legend: {
                  position: "bottom",
                },
                title: {
                  display: true,
                  text: "월간 인기상품 TOP10",
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
    </BestProdMGraphContainer>
  );
});

export default BestProdMGraph;
