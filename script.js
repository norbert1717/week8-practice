const characterComponent = (name, height, mass) => `
    <div class="character">
            <p class="name"> ${name}</p>
            <p class="height"> ${height} cm</p>
            <p class="mass"> ${mass} kg</p>
        </div>
    `;

async function fetchData() {
const fetchResult = await fetch("https://swapi.dev/api/people/")
const data = await fetchResult.json();
const characters = data.results;

const rootElement = document.querySelector("#root");

rootElement.insertAdjacentHTML("beforeend", characters.map(character => characterComponent(character.name, character.height, character.mass))
.join(" "));
}

fetchData(); 


