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

const BestProdWGraphContainer = styled.div`
  width: 100%;

  .container {
    height: 300px;
  }

  ${mq.maxWidth("md")`
    width: 100%;
`}
`;

const BestProdWGraph = memo(() => {
  const { weekly } = useSelector((state) => state.BestProductsSlice);
  console.log("weekly : ", weekly);

  const { productName, orderCount } = useMemo(() => {
    if (!weekly) {
      return { productName: [], orderCount: [] };
    }

    const productName = weekly.map((v) => {
      const name = v.productName.replace(/_.*$/, "").replace(/\[.*?\]/g, "");
      return name.length > 15 ? name.substring(0, 15) : name;
    });
    const orderCount = weekly.map((v) => v.orderCount);

    return { productName, orderCount };
  }, [weekly]);

  return (
    <BestProdWGraphContainer>
      <div className="container">
        {/* {weekly && <p>{JSON.stringify(weekly)}</p>} */}

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
              indexAxis: "y",
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
                title: {
                  display: true,
                  text: "주간 인기상품 TOP5",
                  font: {
                    size: 18,
                    color: "#000",
                  },
                },
              },
            }}
          />
        )}
      </div>
    </BestProdWGraphContainer>
  );
});

export default BestProdWGraph;
