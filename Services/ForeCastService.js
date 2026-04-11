// Ovo ce biti Service za ForeCast (prognozu po danima)
// key i url su isti samo je endPoint drugaciji

const { default: axios } = require("axios");

const ApiKey = "e420f3ad6140e7454d3321760d25590f";
const URL = "https://api.openweathermap.org/data/2.5";

// Prvo kreiramo isto instancu sa axiosom
const ForeCastInstance = axios.create({
  baseURL: URL,
});

// Zatim ista fetch (promise funkcija) za request ka ovom APIju
// prihvatamo city jer dobijamo prognozu za grad
const fetchForeCastData = async (city) => {
  try {
    // ovde je samo drugi endPoint (/forecast)
    const response = await ForeCastInstance.get("/forecast", {
      params: {
        // parametri za key su ostali isti, samo smo smanjili days zbog free plana
        appid: ApiKey,
        q: city, // na primer bas je q za grad
        days: 3,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Neka je greska za ForeCast podatke: ", error.message);
    throw error;
  }
};

export default fetchForeCastData;
