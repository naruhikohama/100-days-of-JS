const api = {
    key: "d36679860a3bf8242b633850255a9302",
    base: "https://api.openweathermap.org/data/2.5/"
}
const error = document.querySelector(".error");
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");

btn.addEventListener("click", getInput);

function getInput(e) {
    e.preventDefault();
    if (e.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}&lang=pt_br`)
    .then(response => {
        return response.json();
    })
    .then(displayData);
}

function displayData(response) {
    if (response.cod === "404") {
        error.textContent = "Please enter a valid city";
        search.value = "";
    } else {
        console.log(response.json);
        error.textContent = "";
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const realFeel = document.querySelector(".real-feel");
        realFeel.innerText = `Real feel: ${Math.round(response.main.feels_like)}°C`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconUrl = "https://api.openweathermap.org/img/w/";
        weatherIcon.src = iconUrl + response.weather[0].icon + ".png";
    }
}

function dateFunction(d) {
    // let months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    // let days = ["Domingo", 'Segunda-feira', "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}