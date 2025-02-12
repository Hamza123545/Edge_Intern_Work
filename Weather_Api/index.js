let city = document.getElementById("city");
let type = document.getElementById("type");
let temp = document.getElementById("temp");
let image = document.getElementById("img");
let input = document.getElementById("inp");

let api_key = "d081dd9511e36a650a00788a02ce2e28";

const data = async function (search) {
    try {
        let getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}&units=metric`);
        let jsondata = await getData.json();

        if (jsondata.cod == 400) {
            alert("Please enter a location");
            image.src = "images/400error.jpeg";
            return;
        }

        if (jsondata.cod == 404) {
            alert("City not found. Check your spelling.");
            image.src = "images/404.png";
            return;
        }

        input.value = "";
        city.innerHTML = jsondata.name;
        temp.innerHTML = Math.floor(jsondata.main.temp) + "°C";
        type.innerHTML = jsondata.weather[0].main;

       
        switch (type.innerHTML) {
            case "Clouds":
                image.src = "images/cloud.jpg";
                break;
            case "Clear":
                image.src = "images/clear.jpg";
                break;
            case "Rain":
                image.src = "images/rain.jpg";
                break;
            case "Snow":
                image.src = "images/snow.jpg";
                break;
            case "Smoke":
                image.src = "images/smoke.jpg";
                break;
            case "Haze":
                image.src = "images/haze.jpg";
                break;
            case "Storm":
                image.src = "images/storm.jpg";
                break;
            default:
                image.src = "images/default.png";
                break;
        }
    } catch (error) {
        alert("Error fetching data.");
        console.error(error);
    }
};

function myFun() {
    const search = input.value;
    if (search) {
        data(search);
    } else {
        alert("Please enter a city name.");
    }
}
