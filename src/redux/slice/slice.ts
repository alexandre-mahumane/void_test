import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/Api";
import {
  Area,
  Input,
  Progresso,
  ProgressoState,
  Sector,
} from "../../interfaces/interface";

export const fetchData = createAsyncThunk("progresso/fetchData", async () => {
  console.log("ana");
  try {
    const [sectorRes, areaRes, progressoRes, analyticsRes] = await Promise.all([
      api.get("/sectors/all/de190ded-d23c-410c-89ac-89faf4dfb36a"),
      api.get("/areas"),
      api.get("/last-week/de190ded-d23c-410c-89ac-89faf4dfb36a?=&_limit=10"),
      api.get(
        "/analytics/farm-inputs/23e9336a-b20a-4478-a58f-875cc065e871?offset=1&limit=10&filter=&phase=nurseries"
      ),
    ]);

    return {
      sectors: sectorRes.data.data.data as Sector[],
      areas: areaRes.data.data as Area[],
      progresso: progressoRes.data.data.technicians as Progresso[],
      analytics: analyticsRes.data.data as Input[],
    };
  } catch (error) {
    throw error;
  }
});
const initialState: ProgressoState = {
  sectors: [],
  areas: [],
  progresso: [],
  analytics: [],
  loading: false,
  error: null,
};

const progressoSlice = createSlice({
  name: "progresso",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.sectors = action.payload.sectors;
        state.areas = action.payload.areas;
        state.progresso = action.payload.progresso;
        state.analytics = action.payload.analytics;
      });
  },
});

export default progressoSlice.reducer;
