import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/Api";

export const fetchData = createAsyncThunk("progresso/fetchData", async () => {
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
      sectors: sectorRes.data.data.data,
      areas: areaRes.data.data,
      progresso: progressoRes.data.data.technicians,
      analytics: analyticsRes.data.data,
    };
  } catch (error) {
    throw error;
  }
});

const progressoSlice = createSlice({
  name: "progresso",
  initialState: {
    sectors: [],
    areas: [],
    progresso: [],
    analytics: [],
    loading: false,
    error: null,
  },
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
