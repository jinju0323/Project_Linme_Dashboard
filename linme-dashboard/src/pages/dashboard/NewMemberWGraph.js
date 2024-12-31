import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import mq from "../../components/MediaQuery";

import styled from "styled-components";

import dayjs from "dayjs";

import { Chart, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement } from "chart.js";

import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement);

const NewMemberWGraphContainer = styled.div`
  width: 100%;

  .NewMember-graph {
    height: 300px;
  }

  ${mq.maxWidth("md")`
      width: 100%;
  `}
`;

const NewMemberWGraph = memo(() => {
  const { weekly } = useSelector((state) => state.NewMemberSlice);
  console.log(weekly);

  const { regDate, memberCount } = useMemo(() => {
    if (!weekly) {
      return { regDate: [], memberCount: [] };
    }

    // weekly 데이터에서 regDate와 memberCount 배열 생성
    const regDate = weekly.map((v) => v.regDate);
    const memberCount = weekly.map((v) => v.memberCount);

    // reverse함수 호출해서 배열을 역순으로 변경 (시간 순서대로 보여주기 위함)
    regDate.reverse();
    memberCount.reverse();

    // 결과를 객체로 반환
    const result = { regDate, memberCount };

    return result;
  }, [weekly]);

  return (
    <NewMemberWGraphContainer>
      <div className="NewMember-graph">
        {/* {regDate && JSON.stringify(regDate)} */}
        {/* {memberCount && JSON.stringify(memberCount)} */}

        {regDate && memberCount && (
          <Line
            data={{
              labels: regDate,
              datasets: [
                {
                  label: "명",
                  data: memberCount,
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
                  text: "주간 일별 총 신규회원 수",
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
    </NewMemberWGraphContainer>
  );
});

export default NewMemberWGraph;
