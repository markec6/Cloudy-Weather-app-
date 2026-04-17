// Ovde ce biti opis najbitnijih filova za prikaz u Case Study

export const CaseStudyData = [
  {
    id: 1,
    title: "WeatherSlice",
    code: `const isBrowser = typeof window !== "undefined" && window.localStorage;
const saved = isBrowser ? window.localStorage.getItem("weatherHistory") : null;
const initialState = {
weatherData: null,
currentCity: "Belgrade",
isRehydrated: false,
historyLocation: saved ? JSON.parse(saved) : []
const weatherSlice = createSlice({
name: "weather",
initialState,
reducers: {
    setWeatherData(state, action) {
    state.weatherData = action.payload;
    },
    setCurrentCity(state, action) {
    state.currentCity = action.payload;
    },
    setRehydrated: (state, action) => {
    state.isRehydrated = action.payload;
    },

    addHistoryLocation(state, action) {
    const newCity = action.payload;
    const exists = state.historyLocation.find((c) => c.name === newCity.name);
    if (!exists) {
        state.historyLocation.push(newCity);
    }
    },
},
});
export const getWeatherByLocation = (cityName) => async (dispatch) => {
    try {
        const res = await fetchWeatherData(cityName);
        dispatch(setWeatherData(res));
        console.log(res);

        dispatch(addHistoryLocation(res));

        if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem("weatherHistory");

        const currentHistory = saved ? JSON.parse(saved) : [];

        if (!currentHistory.find((c) => c.name === res.name)) {

            const newHistory = [res, ...currentHistory].slice(0, 5);
            window.localStorage.setItem(
            "weatherHistory",
            JSON.stringify(newHistory),
            );
        }
        }
    } catch (err) {
        console.log("Neka je greska u ovom Thunk", err);
    }
    };
               `,
    des: `Mozda i najbitniji file: Za pocetak posto je ovo mobile app, a takodje ove podatke moramo i da sacuvamo u localStorage jer nemamo backend (da bi pretrazujuci podaci ostali i nakon refresa same app). 

        #isBrowser - ovde samo proveravamo da li smo na browseru i da li localStorage uopste psotoji (ako nije undefined), ali ako radimo na pravoj mobile app, onda se sve to menja na AsyncStorage. 

        #saved - ovde kazemo da ako postoji (to nesto sto budemo hteli), sacuvaj mi u localStorage(.setItem('pod odredjenim imenom'))... 

        ---

        Imamo 3 state: 
        #1 - U weatherData cuvamo sam API objeakt koji dobijemo (zato je inicijalno null). 
        #2 - currentCity je inicijalno 'Belgrade' because ce nam on kasnije trebati za rad sa indexima, odnosno menjacemo same podatke cele app na promenu indexa(u ovom slucaju grada jer dovijamo podatke za grad). 
        #3 - (saved - hocemo da sacuvamo u local), jer je ovo samo prikaz istorije gradova koje smo poslednje pretrazivali, to ce biti neka lista, zato i jeste [] = u samom njegovom reduceru moramo da osiguramo da ne dodajemo iste gradove u listu (newCity (bice onaj koji tek dodajemo), sa metodom find (kazemo nadji mi ovaj sto je dodat i ovaj sto je vec u listi ako su isti) - uslov(ako ne psostoji isti onda ga dodaj u listu))... 

---

        Thunk funkcija(Njena poenta je da pored city argumenta moze da primi i dispatch kao argument) - (koristimo async promise funkciju jer treba da nam vrati nesto (try & catch)) 
        - #Try - await(ono sto nam vraca smo stavili u res, a to je(sama service funkcija gde saljemo request ka API podacima i prosledjujemo joj dinamicki cityName jer podatke dobijamo za jedan grad.)), sam nas State weatherData punimo sa tim podacima, takodje i historyLocation punimo sa istim podacima (da bi kasnije mogli samo da prikazemo ime grada ciji su podaci).

        Takodje: opet kazemo ako smo nesto ubacili u localStorage, to mora da bude string svakako, ali da bi ga mi uzeli iz localStorage moramo da ga parsujemo nazad na pocetnu vrednost iz stringa(currnetHistory - ako smo nesto sacuvali u local, ti mi to parsuj i vrati nazad u ovu varijablu), na kraju kao zavrsinu listu koju cuvamo u sam local da bi korisniku uvek ostau u app (newHistory - ceo objekat + cela lista iz local) i to sve pod uslovom da grad koji se dodaje ne postoji u listi vec kao sto smo gore rekli. 

        ---

        Ono sto je bio izazov ovde jeste to da sam morao da simuliram svoj backend sa localStorage, da podaci ne bi nestajali svaki put kada se opet upali app (naravno localStorage ako pricamo u browser preview).... 

        Zatim jako bitna stvar za Async (memoriju na telefonu), dodali smo i state (isRehydrate: false) - False je inicjalno jer na prvom koriscenju app mi imamo inicijalno Belgrade iz currnetCity, sto znaci da nista novo mi nismo dodali, bukvalno nam govori da li smo procitali localStorage iz browsera(da li tamo ima necega), ako nema nicega kasnije u useEffect on ce nam vratiti null - Za samu logiku i okidanje pogledati index.tsx file obavezno(tamo je objasnjenje).... 

        Uglavnom ovaj Rehydrate se stavlja kako bih sprecio glitch na app - tako sto podaci za default grad(Beograd) automatski ucitavaju nakon otvaranja same app.... 

        Poenta je da kada pravimo mobile app koristimo samo AsyncStorage jer je to memorija za telefone, a localStorage je za browser, ja sam u ovoj app koristio oba jer sam imao preview i na browseru tako mi je bilo lakse...`,
  },

  {
    id: 2,
    title: "ForeCastSlice",
    code: `const initialState = {
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

    //THUNK:
    export const getForeCastByCity = (cityName) => async (dispatch) => {
    try {
        const response = await fetchForeCastData(cityName);

        dispatch(setForeCastData(response));
        console.log(response);
    } catch (error) {
        console.log("Neka je greska u drugom Thunk", error);
    }
    };

    export default ForeCastSlice.reducer;  
        `,

    des: `Jako slican file kao i WeatherSlice, ali ipak malo jednostaviniji. 

            Za pocetak imamo jedan state koji je isto null (u njega cemo ubaciti isto API podatke iz servic requesta, ocekujemo isto veliki objekat zato je state inicijalno null). 

            Za reducer samo kazemo (state.forecastData = action.payload;) sto je bukvalno prosledjivanje podatka u taj state, isto tako da su podaci u vidu neke liste, odnosno da ima vise nekih objekata onda bi bilo (state.forecastData.push(action.payload)).     

            ---

            Da ne zaboravim, mi u slice filovima uvek imamo 2 vrste exporta iz tog file:
            - (sam reducer za neki state) - uvek ga exportujemo pre Thunk funckcije ako je imamo(export const { setForeCastData } = ForeCastSlice.actions;)
            - a sam export za konfiguraciju(export default ForeCastSlice.reducer;).  

            ---

            Thunk: ovde je thunk znacajno jednostavniji jer nemamo nikakve uslove, a i ove podatke ne cuvamo u local ili asyncStorage jer ce se ovi foreCast podaci svakako menjati na promenu grada, a sa promenom grada menjamo i weather API podatke bas odredjene za taj grad trenutni.  

            Sama Poenta Thunk funckije je da mi sa dispatch pravimo most od samih API podataka ka nasem state, da ne bi posle morali da natrapavamo nas useEffect kada podaci stignu, a mi svakako kasnije sa dispatch mozemo podatke da azuriramo kako god nam treba`,
  },

  {
    id: 3,
    title: "WeatherServiceAPI",
    code: `const { default: axios } = require("axios");

    const ApiKey = "e420f3ad6140e7454d3321760d25590f";
    const URL = "https://api.openweathermap.org/data/2.5";

    const weatherInstance = axios.create({
    baseURL: URL,
    });

    const fetchWeatherData = async (city) => {
    try {

        const response = await weatherInstance.get("/weather", {
        params: {
            appid: ApiKey,
            q: city, // na primer bas je q za grad
            days: 7,
            units: "metric",
        },
        });
        return response.data;
    } catch (error) {
        console.error("Greska jebiga", error.message);
        throw error; // kao sto try ima return
    }
    };

            export default fetchWeatherData;`,

    des: `Ovo je file gde radimo request ga API podacima. Volim da koristim axios jer dosta skracuje kod. 

            Prvo sto radimo moramo da importujemo sam axios iz paketa sa require(const { default: axios } = require('axios');).   

            Zatim ono sto ce nam trebati za veliku vecinu APIja jeste sam nas API key i URL odakle uzimamo podatke, i to uvek definisemo u konstante.    

            Zatim jako bitna stvar je da kreiramo samo instancu sa axiosom(axios.create({baseURL: URL})) - ovime smo rekli da ce axios da salje request samo ka ovom URL, a kasnije mozemo da menjamo samo endPoint tog APIja, tako nas kod bude pregledniji.  

            ---

            Zatim kreiramo async funkciju jer nam treba promise da ce nam vratiti same podatke(fetchWeatherData) - u samoj funkciji prihvatamo city kao argument, jer dobijamo podatke za jedan grad:
            - u samom await koristimo nasu axios instancu (weatherInstance.get)
            - kao prvi argument uvek za bilo koji API mora da bude endPoint, u ovom slucaju je to ('/weather')
            - a za drugi argument uvek uzimamo params(nase parametre, koji su nam potrebni, i dodajemo nas kljuc kao validan)

            Za parametre koje mozemo da definisemo mozemo da vidimo na dokumentaciji samog APIja - uvek imamo return jer je promise (return response.data) - ovde kazemo .data jer je njihov objekat podataka tako konstruisan, i naravno imamo catch (ja volim da radim console.log(error, za samu gresku)) da bih mogao gresku da vidim odmah u konzoli i da tacno znam gde je ta greska.`,
  },

  {
    id: 4,
    title: "ForeCastServiceAPI",
    code: `const { default: axios } = require("axios");

    const ApiKey = "e420f3ad6140e7454d3321760d25590f";
    const URL = "https://api.openweathermap.org/data/2.5";

    const ForeCastInstance = axios.create({
    baseURL: URL,
    });

    const fetchForeCastData = async (city) => {
    try {
        
        const response = await ForeCastInstance.get("/forecast", {
        params: {
            appid: ApiKey,
            q: city, 
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

    export default fetchForeCastData;`,

    des: `Ovo je service file za dobijanje forecast API podataka. Uglavnom logika je ista kao i sa weatherService. 

        Imamo nas key koji je isti kao i za weather i url koji je takodje isti kao i za weather. Jer API je isti samo je endPoint drugaciji. 

        Znaci prvo kreiramo sa axiosom instancu (axios.create({baseURL: URL})) - sto znaci da kazemo axiosu da salje request samo na taj nas url. 

        ---

        Zatim imamo istu promise funkciju sa parametrima koji nama trebaju (to gledamo na njihovoj dokumentaciji), ali je kao prvi argument endPoint koji se u ovom slucaju menja (/forecast) zato i dobijamo podatke bas za to. 

        Takodje imamo return i catch za error`,
  },

  {
    id: 5,
    title: "index.tsx(glavni file cele app)",
    code: `const dispatch = useDispatch<any>();
    const currentCity = useSelector((state: any) => state.weather.currentCity);
    const isRehydrated = useSelector((state: any) => state.weather.isRehydrated);

    useEffect(() => {
        if (!isRehydrated) return;

        dispatch(getWeatherByLocation(currentCity));
        dispatch(getForeCastByCity(currentCity));
    }, [currentCity, isRehydrated]);

    useEffect(() => {
        const loadCity = async () => {
        const savedCity = await AsyncStorage.getItem("selectedCity");
        if (savedCity) {
            dispatch(setCurrentCity(savedCity));
        }
        dispatch(setRehydrated(true));
        };
        loadCity();
    }, []);`,

    des: `Pozvali smo sam state Rehydrate iz samog reduxa putem useSelectora.   

            Ovaj LoadCity je klasicna promise funkcija koja mora da nam vrati nesto.   
            savedCity - await AsyncStorage.getItem('selectedCity') - sto bukvalno znaci da on odmah pogleda u memoriji telefona da li se vec nesto pretrazivalo za selectedCity - ako se pre neki dan pretrazivao na primer (London) on ce to videti u memoriji i automatski ce znati da je to London, odnosno nece biti null(ako nema nista u memoriji, ali ce on svakko nastaviti dalje).

            Zatim kaze (ako si nesto nasao tamo(bilo koji grad) ti mi azuriraj ovaj currentCity state bas sa tim pretrazenim gradom).

            ---

            dispatch(setRehydrated(true)); - ovime smo rekli da se menja state u true samog Rehydrate sto znaci da ako ovo prodje do sada on je ovde zavrsio posao, mimoramo da kazemo da je on true iako on nije nasao nista u memoriji kako bi svakako kod nastavio da bi svakako dobili podatke inicijalno za Beograd...   

            I na kraju samo pzoovemo celu tu funkciju - loadCity()...   
            [] - samim tim sto je ovo na kraju prazno, mi njemu kazemo da ovo uradi samo jednom kada se app upali i gotov je...   

            ---

            Zatim u gornjem useEffect (if (!isRehydrated) return;) - ako taj Rehydrate idalje nije promenio state, odnosno nije nasao nista u memoriji sto se pretrazivalo - ne sme da nastavi dalje sa kodom nego stoji tu...   

            Zatim - mi punimo ova dva glavna state za ona 2 endPointa od tog APIja koja dobijamo, ali: [posto ovde imamo isRehydrate - to znaci da na svaku njegovu promenu odnosno (svaki put kada on u memoriji vidi neki pretrazeni grad, ovi stateovi se pune podacima) i currnetCity (sto znaci da svaki put kada se HeroSlide promeni na neki grad ti napuni te stateove podacima bas za taj grad koji je currentCity)] - to su nasa 2 okidaca.`,
  },

  {
    id: 6,
    title: "Map(web/mobile)",
    code: `
     const lat = weatherData.coord.lat;
    const lon = weatherData.coord.lon;

    const osmUrl = https://www.openstreetmap.org/export/embed.html?bbox='$'{lon - 0.05},'$'{lat - 0.05},'$'{lon + 0.05},'$'{lat + 0.05}&layer=mapnik&marker='$'{lat},'$'{lon};
    
    if (Platform.OS === "web") {
    return (
      <View>
        <iframe src={osmUrl}/>
      </View>
    );
  }
  return (
    <View>
      <WebView source={{ uri: osmUrl }} />
    </View>
  );`,

    des: ` Implementacija Mape (OpenStreetMap)
            Opis rešenja:
            Koristio sam openstreet mapu. Za nju mi ne treba neki key ili API podatak, ona se korsiti iskljucivo sa njenim url. 

            Prvo sam morao da definisem lat i lon jer su to koordinate za svaku mapu, ali sam dinamicki koordinrate uzeo iz naseg weather objekta (weatherData.coord.lat/weatherData.coord.lon)...  

            Zatim smo u constantu za url stavili link od mape, ali isto tako dinamicki ukljucili JS sa $ i takodje moramo sam koristiti \` \`(backticks) na ceo url da bi stavili nase lat i lon, 0.05 oznacava opseg vidljivog polja oko same mape, sto znaci da mozemo kontrolisati nivo zumiranja same mape. 

            Zatim psoto je ovo pretezno mobile app, ali sam ja radio preview i na browseru, da na browseru ne bi bila neka greska, morali smo da korisitmo Platform. rekli smo uslovom da ako je Platform.OS jednak webu mi mapu moramo prikazati putem iframe taga, ali isto tako na mobile mapu prikazujemo putem WebView. 

            Posto sam react-native nema tag za prikazivanje externih web stranica, morao sam koristiti paket (react-native-webview) time dobijamo WebView tag, shvatio sam to kao da sm WebView tag sluzi kao most izmedju nase native app i samog web sadrzaja (koji god da je)
`,
  },

  {
    id: 7,
    title: "Date/Time Parse",
    code: `
    // funkcija za dobijanje tacnog datuma
    const formatDate = (timeParse: any) => {
    const date = new Date(timeParse * 1000); 
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  // logika za dobijanje svih dana u nedelji
  const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const date = new Date(day.dt * 1000);
          const dayName = days[date.getDay()];
  
  `,

    des: `
        1. Ovo je funkcija za dobijanje tacnog datuma danasnjeg dana. Prvo kreiramo funkciju koja ima jedan parametar, a to je (timeParse) koji je zapravo timeStamp sa naseg API objekta. Zatim pravimo nas date objekat za datum i korisitmo new Date, zatim taj nas paramter uvek mnozimo sa 1000 (jer nama API salje datum u sekundama, a JS iskljucivo radi sa milisekundama). 

        Zatim u konstantu options stavljamo(Intl.DateTimeFormatOptions) koji je typescript tip koji nam omogucava da defiisemo tacno vreme kako mi zelimo(math: long - omogucava da se mesec vidi punim imenom), (day: numeric - kaze da dan zapravo i treba da bude prikazan kao obican broj), (year: numeric - isto da godina treba da bude prikazana kao pun broj), sve to trebamo da vratimo sa return. 

        (toLocaleDateString) - ovo znaci da ce nam svaki ans paramtar vratiti kao citljiv string, (en-US - odredjuje jezik i regiju), (options - moramo i ukljuciti one nase definisane paramtre)   

        2. Ovo je funkcija za dobijanje dana u nedelji, prvo sam svaki dan definisao imenom u jednoj listi, Sunday je prvi dan, jer je po pravilu u JS nedelja uvek na 0 indexnoj poziciji pa se nastavlja na ponedeljak. 

        Zatim opet kreiramo nas date objekat (day.dt dobijamo iz APi objekta) i opet ga mnozimo sa 1000  da bi dobili milisekunde.  

        date.getDays() je predefinisana JS metoda koja vraca broj od 0 do 6  (tacno za svih 7 dana u nedelji), a days listu koristimo kao kljuc da bi mogli da pristupimo svakom danu i izvucemo info iz njega
        `,
  },
];
