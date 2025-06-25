document.addEventListener('DOMContentLoaded',()=>{
    const cityInp = document.getElementById("city-inp")
    const WeatherBtn = document.getElementById("Weather-btn")
    const Weatherinfo = document.getElementById("weather-info")
    const cityNameDis = document.getElementById("city-name")
    const tempDis = document.getElementById("temperature")
    const descDis = document.getElementById("description")
    const errMsg = document.getElementById("error-message")

    const API_KEY = "d469467389a282a79c680539fdb0ffb5"

    WeatherBtn.addEventListener('click',async ()=>{
        const city = cityInp.value.trim()
        if(!city) return;

        // it may throw some error
        // Server/database is always in another continent

        
        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }
    })

    async function fetchWeatherData(city){
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(response)

        if(!response.ok){
            throw new Error("City Not found")
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data){
        console.log(data)
        const {name,main,weather} = data
        cityNameDis.textContent = name 
        tempDis.textContent = `Temperatur : ${main.temp}`
        descDis.textContent = `Weather : ${weather[0].description}`

        //unlock the display
        Weatherinfo.classList.remove("hidden")
        errMsg.classList.add("hidden")
        
    }

    function showError(){
        Weatherinfo.classList.add('hidden');
        errMsg.classList.remove('hidden')
    }
    
})