import React, { memo, useEffect, useState } from "react";
import mq from "../../components/MediaQuery";

import styled from "styled-components";

/** 리덕스 관련 */
import { useSelector, useDispatch } from "react-redux";

/** 개별 그래프 가져오기 */
import { getList } from "../../slices/SalesSlice";
import SalesWeekGraph from "./SalesWeekGraph";
import SalesMonthGraph from "./SalesMonthGraph";

const SalesDashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 50%;

  .sales-container {
    padding: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    width: 100%;

    .sales-info {
      width: 100%;
      text-align: center;

      .title {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
      }

      .graph-select {
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: end;
        margin-right: 30px;
        color: #333;
        font-weight: 700;
      }
    }

    ${mq.maxWidth("md")`
        width: 100%;
    `}
  }
`;

const SalesDashboard = memo(() => {
  /** 기본 데이터 처리 */
  const { weekly, monthly } = useSelector((state) => state.SalesSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, []);

  /** 그래프 선택 */
  const [selectedGraph, setSelectedGraph] = useState("week");

  const handleGraphChange = (e) => {
    setSelectedGraph(e.target.value);
  };

  return (
    <SalesDashboardContainer>
      <div className="sales-container">
        {/* JSON데이터 확인 (임시) */}
        {/* {weekly && <p>{JSON.stringify(weekly)}</p>} */}

        {/* 총 매출 그래프 */}
        <div className="sales-info">
          <span className="title">📌 총 매출 그래프</span>
          {/* 라디오 버튼을 사용하여 그래프 선택 */}
          <div className="graph-select">
            기간 설정 :&nbsp;
            <select value={selectedGraph} onChange={handleGraphChange}>
              <option value="week">1주일간 일별</option>
              <option value="month">1개월간 주별</option>
            </select>
          </div>

          {/* 선택된 그래프를 조건부로 렌더링 */}
          {selectedGraph === "week" && <SalesWeekGraph />}
          {selectedGraph === "month" && <SalesMonthGraph />}

          {/* 주간 그래프 */}
          {/* <SalesWeekGraph /> */}
          {/* 월간 그래프 */}
          {/* <SalesMonthGraph /> */}
        </div>
      </div>
    </SalesDashboardContainer>
  );
});

export default SalesDashboard;
