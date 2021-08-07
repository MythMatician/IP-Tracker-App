const ipContainer = document.querySelector('.ip-info');
const input = document.querySelector('#ip');
const button = document.querySelector('#button');
const ipAdress = document.querySelector('.ip-address');
const timezone = document.querySelector('.timezone');
const _location = document.querySelector('.location');
const isp = document.querySelector('.isp');
const mapContainer = document.querySelector('.map-container');
const apiURL = 'https://geo.ipify.org/api/v1?apiKey=at_j7YYmiJlsj0lJYxj3SUWAHfsGBXuj&ipAddress='
const ip = '8.8.8.8';

const myMap = L.map(mapContainer);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXl0aG1hdGljaWFuIiwiYSI6ImNrcnZ3OXdxNjBhc2IycHJ2a3p6aDJ4cXoifQ.WLhouF0tc_l6F_Gb1r6ltw'
}).addTo(myMap);
const blackMarker = L.icon(
    {
        iconUrl : './images/icon-location.svg',
        iconSize : [38, 42],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -74]
    }
)

const appendIp = (data) => {
    const h4 = document.createElement('h4');
    const h3 = document.createElement('h3');
    h4.innerText = 'IP ADRESS';
    h3.innerText = `${data.ip}`;
    h4.style.padding = '10px';
    h3.style.padding = '10px';
    ipAdress.appendChild(h4);
    ipAdress.appendChild(h3);
}

const appendLocation = (data) => {
    const h4 = document.createElement('h4');
    const h3 = document.createElement('h3');
    h4.innerText = 'LOCATION';
    h3.innerText = `${data.location.country}`;
    h4.style.padding = '10px';
    h3.style.padding = '10px';
    _location.appendChild(h4);
    _location.appendChild(h3);
}

const appendTimezone = (data) => {
    const h4 = document.createElement('h4');
    const h3 = document.createElement('h3');
    h4.innerText = 'TIMEZONE';
    h3.innerText = `UTC ${data.location.timezone}`;
    h4.style.padding = '10px';
    h3.style.padding = '10px';
    timezone.appendChild(h4);
    timezone.appendChild(h3);
}

const appendISP = (data) => {
    const h4 = document.createElement('h4');
    const h3 = document.createElement('h3');
    h4.innerText = 'ISP';
    h3.innerText = `${data.isp}`;
    h4.style.padding = '10px';
    h3.style.padding = '10px';
    isp.appendChild(h4);
    isp.appendChild(h3);
}

const fetchData = async (url, ip) => {
    try {
        const res = await fetch(`${url} ${ip}`);
        const data = await res.json();
        const {location} = data;
        appendIp(data);
        appendLocation(data);
        appendTimezone(data);
        appendISP(data);
        myMap.setView([location.lat, location.lng],17);
        const marker = L.marker([location.lat, location.lng], {icon : blackMarker}).addTo(myMap);
        marker.bindPopup(`${data.isp}`).openPopup();            
    } catch (e) {
        console.error(e);
    }
}

window.addEventListener('load', (e) => {
    fetchData(apiURL, ip);
})

button.addEventListener('click', (e) => {
    e.preventDefault();
    ipAdress.innerText = '';
    _location.innerText = '';
    timezone.innerText = '';
    isp.innerText = '';
    fetchData(apiURL, input.value);  
});
