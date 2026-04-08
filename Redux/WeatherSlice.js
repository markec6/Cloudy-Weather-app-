import fetchWeatherData from "@/Services/WeatherService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // state je null jer ocekujemo jedan ogroman objekat
  // da dobijamo array pun objekata onda bi state bio []
  weatherData: null,
  // a ovaj state je [] jer ga koristimo za listu gradova koje smo pretrazivali
  historyLocation: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
    addHistoryLocation(state, action) {
      // ovde prvo kazemo da je ovaj city ustvari grad koji dodajemo
      const city = action.payload;

      // a ovo je logika da ne mozemo da dodamo duplikat
      // ovo znaci ako ceo taj state ne sadrzi bas taj city koji dodajemo
      if (!state.historyLocation.includes(city)) {
        // ako je uslov tacan ti mi dodaj taj city u state
        state.historyLocation.push(city);
      }
    },
  },
});

export const { setWeatherData, addHistoryLocation } = weatherSlice.actions;

// Ovde radimo Thunk funkciju
// Thunk funkcija je dinamicka funkcija koja prihvata i dispatch i jos neki arg koji nam treba

export const getWeatherByLocation = (cityName) => async (dispatch) => {
  try {
    // ovo je Service funkcija koja samo poziva podatke u odnosu na neki grad
    const res = await fetchWeatherData(cityName);

    // radimo dispatch koji imamo u useEffect za ceo API objekat
    dispatch(setWeatherData(res));

    // I sada na kraju punimo ovaj state za ime grada koji cemo da pretrazujemo
    dispatch(addHistoryLocation(res.name));
  } catch (err) {
    // u catch uvek prihvatamo err i prikazemo ga u konzoli da bi znali gde je greska
    console.log("Neka je greska u ovom Thunk", err);
  }
};

// ovaj export za reducer pisemo na kraju file
export default weatherSlice.reducer;
