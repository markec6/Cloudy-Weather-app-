// prvo kreiramo varijable za Key i URL od Weather API

const { default: axios } = require("axios");

// koristicemo OpenWeather
const ApiKey = "e420f3ad6140e7454d3321760d25590f";
const URL = "https://api.openweathermap.org/data/2.5";

// Zatim kreiramo instancu sa axiosom(da bi kasnije skratili kod)
const weatherInstance = axios.create({
  // ovako kazemo da axios uvek vuce podatke bas sa ovog URL
  baseURL: URL,
});

// zatim kreiramo celu fetch async (promise) funkciju za request podataka

const fetchWeatherData = async (city) => {
  // kada je async imamo try(u njemu uvek await za podatke) i catch
  try {
    // posto smo gore kreirali instancu, ovde kao prvi argument imamo endpoint ond naseg URL
    // a kao drugi arg je params (nesto sto mi predefinisemo)
    const response = await weatherInstance.get("/weather", {
      // nasi filteri koje nam dozvoljava sam API koji koristimo
      params: {
        appid: ApiKey,
        q: city, // na primer bas je q za grad
        days: 7,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    //ovde samo u konzoli da vidimo error
    console.error("Greska jebiga", error.message);
    throw error; // kao sto try ima return
    // error catch mora da ima throw error(ili sta god je gore u argumentu)
  }
};

export default fetchWeatherData;
