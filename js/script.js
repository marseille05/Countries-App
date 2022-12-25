

const baseURL = `https://restcountries.com/v3.1`
const navContainer = document.querySelector(".nav_container")
const cardContainer = document.querySelector(".row")
const regionText = document.querySelector(".region")


const regionData = [
    {
        id:1,
        caption: "All",
        route: "all"
    },
    {
        id:2,
        caption: "Africa",
        route: "africa"
    },
    {
        id:3,
        caption: "Europe",
        route: "europe"
    },
    {
        id:4,
        caption: "Americas",
        route: "americas"
    },
    {
        id:5,
        caption: "Asia",
        route: "asia"
    },
    {
        id:6,
        caption: "Oceania",
        route: "oceania"
    }
]

const category = {
    getAll: "all",
    region: "region",
    name: "name"
}


function RegionItems (base) {
    const template = base.map(item => `
    <li onclick="getRoute('${item.route}', '${item.caption}')">
        ${item.caption}
    </li>
    `).join(" ")

    navContainer.innerHTML = template;
}


window.addEventListener("load", () => {
    if(!localStorage.getItem("access_token") || localStorage.getItem("access_token") === "false") {
        window.open("../auth.html", "_self")
      }
      
    RegionItems(regionData)

    getData(category.getAll, (response) => cardTemplate(response))

    regionText.innerHTML = "All"
})


function getData(route, cb) {
    fetch(`${baseURL}/${route}`)
    .then(response => response.json())
    .then(response => cb(response))
} 


function cardTemplate(base) {
    const template = base.map(item => `
        <div class="card">
            <h2>${item.name.common}</h2>
            
            <img src="${item.flags.svg}">
            
            <button onclick="getMore('${item.name.common}')">More</button>
        </div>
    `).join(" ")

    cardContainer.innerHTML = template;
}


function getRoute(route, caption) {
    regionText.innerHTML = caption;
    route === "all"
    ? getData(category.getAll , response => cardTemplate(response))
    : getData(`${category.region}/${route}`, response => cardTemplate(response))
}


function getMore(name) {
    getData(`${category.name}/${name}`, response => cardMore(response))
}


function cardMore(base) {
    console.log(base)
    const template = base.map(item => `
        <div class="cardCountry">
            <h2>${item.name.common}</h2>
                
            <img src="${item.flags.svg}">

            <h3>Coat Of Arms</h3>
            <img src="${item.coatOfArms.svg}">

            <h3>Capital</h3>
            <p>${item.capital}</p>

            <h3>Borders</h3>
            <p>${item.borders}</p>

            <h3>Continents</h3>
            <p>${item.continents}</p>
            <p>${item.subregion}</p>

            <h3>Population</h3>
            <p>${item.population}</p>

            <h3>Side</h3>
            <p>${item.car.side}</p>

            <h3>Timezones</h3>
            <p>${item.timezones}</p>
        </div>
    `).join(" ")

    cardContainer.innerHTML = template;
}