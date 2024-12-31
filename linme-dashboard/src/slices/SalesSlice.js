import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHelper from "../helpers/AxiosHelper";
import reduxHelper from "../helpers/ReduxHelper";

const API_URL = "/api/sales";

export const getList = createAsyncThunk("SalesSlice/getList", async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axiosHelper.get(API_URL);
  } catch (err) {
    result = rejectWithValue(err);
  }

  return result;
});

const SalesSlice = reduxHelper.getDefaultSlice("SalesSlice", [getList], {
  // 추가로 필요한 리듀서
  [getList.fulfilled]: (state, { payload }) => {
    state.weekly = payload.weekly;
    state.monthly = payload.monthly;
  },
});

export default SalesSlice.reducer;
