import fetchWeatherData from "@/Services/WeatherService";
import { createSlice } from "@reduxjs/toolkit";

// u saved ako window nije undefined onda sacuvaj to u local, ako jeste onda je null
// Proveravamo da li smo u browseru I da li postoji localStorage
const isBrowser = typeof window !== "undefined" && window.localStorage;
const saved = isBrowser ? window.localStorage.getItem("weatherHistory") : null;

const initialState = {
  // state je null jer ocekujemo jedan ogroman objekat
  // da dobijamo array pun objekata onda bi state bio []
  weatherData: null,

  // ovo ja state za promenu na slide uz index
  currentCity: "Belgrade",
  // ovo isRehydrated nam govori da li smo procitali localStorage
  // Vracanje podataka iz memorije opet u app, inicijalno je false jer na prvom korisnjenju idalje nemamo nista u memoriji
  isRehydrated: false,

  // state je prvo bio [], ali sada je uslov da ako u saved ima nesto onda pretvori to u []
  // a ako nema nista onda neka inicijalno bude Belgrade
  historyLocation: saved ? JSON.parse(saved) : [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
    // ovo je potvrda da je nas Storage procitan
    setRehydrated: (state, action) => {
      state.isRehydrated = action.payload;
    },
    setCurrentCity(state, action) {
      state.currentCity = action.payload;
    },

    addHistoryLocation(state, action) {
      // ovde prvo kazemo da je ovaj city ustvari grad koji dodajemo
      const newCity = action.payload;
      // Provera da li grad već postoji u nizu (poredimo imena)
      const exists = state.historyLocation.find((c) => c.name === newCity.name);

      // ao ne postoji, dodajemo ga
      if (!exists) {
        state.historyLocation.push(newCity);
      }
    },
  },
});

export const {
  setWeatherData,
  addHistoryLocation,
  setCurrentCity,
  setRehydrated,
} = weatherSlice.actions;

// Ovde radimo Thunk funkciju
// Thunk funkcija je dinamicka funkcija koja prihvata i dispatch i jos neki arg koji nam treba

export const getWeatherByLocation = (cityName) => async (dispatch) => {
  try {
    // ovo je Service funkcija koja samo poziva podatke u odnosu na neki grad
    const res = await fetchWeatherData(cityName);

    // radimo dispatch koji imamo u useEffect za ceo API objekat
    dispatch(setWeatherData(res));
    console.log(res);

    // I sada na kraju punimo ovaj state za ime grada koji cemo da pretrazujemo
    dispatch(addHistoryLocation(res));
    // sada da bi sacuvali taj state u localStorage

    // vo znaci da ako type window objekta nije undefined i ako se u local nesto nalazi onda:
    if (typeof window !== "undefined" && window.localStorage) {
      // Prvo pročitamo stare gradove (ili prazan niz ako nema ništa)
      const saved = window.localStorage.getItem("weatherHistory");

      //opet provera, ako je korisni prvi put tu on dobija [] da u njega puni lokacije
      // ako je korisnik vec uneo nesto ranije (saved) onda to mora da se parsuje nazad u array
      // jer je saved to sacuvao u local kao string
      const currentHistory = saved ? JSON.parse(saved) : [];

      // currentHistory je vec postojeca lista gradova, a res.name je onaj koji se tek dodaje u listu
      // koristimo find da prodjemo kroz listu da vidimo da li se poklapa sa nadolazecim gradom
      if (!currentHistory.find((c) => c.name === res.name)) {
        // ovde samo cuvamo to u localStorage
        const newHistory = [res, ...currentHistory].slice(0, 5);
        window.localStorage.setItem(
          "weatherHistory",
          JSON.stringify(newHistory),
        );
      }
    }
  } catch (err) {
    // u catch uvek prihvatamo err i prikazemo ga u konzoli da bi znali gde je greska
    console.log("Neka je greska u ovom Thunk", err);
  }
};

// ovaj export za reducer pisemo na kraju file
export default weatherSlice.reducer;
