const { createSlice } = require("@reduxjs/toolkit");
import fetchForeCastData from "../Services/ForeCastService";

const initialState = {
  // state za forecast
  // dobijamo ga isto kao veliki objekat za to je null
  forecastData: null,
};

const ForeCastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setForeCastData(state, action) {
      state.forecastData = action.payload;
    },
  },
});

export const { setForeCastData } = ForeCastSlice.actions;

// Ovde cemo imati isto thunk funkciju za dobijanje podataka
export const getForeCastByCity = (cityName) => async (dispatch) => {
  try {
    const response = await fetchForeCastData(cityName);

    //ovde odmah stavimo dobijene podatke u state
    dispatch(setForeCastData(response));
    console.log(response);
  } catch (error) {
    console.log("Neka je greska u drugom Thunk", error);
  }
};

// opet export samog recudera na kraju file
export default ForeCastSlice.reducer;
