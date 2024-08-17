let container = document.querySelector('.container')
let search = document.querySelector('.box button')
let weatherBox = document.querySelector('.weather-box')
let weatherDetails = document.querySelector('.weather-details')
let searchIp = document.querySelector('#weather-input')
search.addEventListener('click', () => {
    const api = 'e3eb5d7c0395a6d56ba4a34123034ea1';
    const city = searchIp.value;
    if (city == '')
        return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`).then(res => res.json()).then(data => {
        console.log(data);
        let images = document.querySelector('.weather-box img')
        let temperature = document.querySelector('.temperature')
        let description = document.querySelector('.description')
        let humidity = document.querySelector('.weather-box .humidity span')
        let wind = document.querySelector('.weather-box .wind span')
        switch (data.weather[0].main) {
            case 'Clear':
                images.src = 'images/clear-img-transformed.png'
                break;
            case 'Cloud':
                images.src = 'images/clouds-2-transformed.png'

                break;
            case 'Snow':
                images.src = 'images/snow.jpg'
                break;
            case 'Rain':
                images.src = 'images/rain.png'
                break;
            case 'Mist':
                images.src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pikpng.com%2Fpngvi%2FhxTmiTx_mist-clipart-foggy-weather-clip-art-png-download%2F&psig=AOvVaw17bVCmgqlkZaEdU4W4QifO&ust=1708537569070000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJjk2ci8uoQDFQAAAAAdAAAAABAE'
                break;
            case 'Haze':
                images.src = 'https://cdn-icons-png.flaticon.com/512/6591/6591897.png'
                break;
            default:
                images.src = 'images/clouds-transformed.png'
                break;
  
        }
        temperature.innerHTML = `${parseInt(data.main.temp)}<span>C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/hr`;

    })
})