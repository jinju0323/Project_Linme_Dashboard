import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosHelper from "../helpers/AxiosHelper";

import reduxHelper from "../helpers/ReduxHelper";

// 연동할 백엔드 주소 설정
const API_URL = "/api/best_prod";

export const getList = createAsyncThunk("BestProductsSlice/getList", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axiosHelper.get(API_URL);
  } catch (err) {
    result = rejectWithValue(err);
  }

  return result;
});

const BestProductsSlice = reduxHelper.getDefaultSlice("BestProductsSlice", [getList], {
  // 헬퍼서item으로 받기때문에 데이터를 받을수없어서 추가로 필요한 리덕스 생성
  // [getList.pending]: (state) => {
  //   state.loading = true;
  // },
  [getList.fulfilled]: (state, { payload }) => {
    state.loading = false;
    if (payload) {
      state.monthly = payload.monthly;
      state.weekly = payload.weekly;
    } else {
      state.monthly = [];
      state.weekly = [];
    }
  },
  // [getList.rejected]: (state) => {
  //   state.loading = false;
  // },
});

export default BestProductsSlice.reducer;
