import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHelper from "../helpers/AxiosHelper";
import reduxHelper from "../helpers/ReduxHelper";

const API_URL = "/api/profit";

export const getList = createAsyncThunk("ProfitSlice/getList", async (payload, { rejectWithValue }) => {
  let result = null;
  let args = { _sort: "categoryId", _order: "asc" };

  try {
    result = await axiosHelper.get(API_URL, args);
  } catch (err) {
    result = rejectWithValue(err);
  }

  return result;
});

const ProfitSlice = reduxHelper.getDefaultSlice("ProfitSlice", [getList], {
  // 추가로 필요한 리듀서
  [getList.fulfilled]: (state, { payload }) => {
    state.weekly = payload.weekly;
    state.monthly = payload.monthly;
  },
});
export default ProfitSlice.reducer;