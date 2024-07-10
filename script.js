let charactersData = [];

// komponensek készítik el a html kódot
// a bemenő paramétereket körbe öleli valamilyen html kóddal
// a paramatéreket beleilleszti egy stringbe
const characterComponent = (name, height, mass, index, hairColor, eyeColor) => `
    <div class="character">
    <h2> character ${index + 1}: </h2>
            <p class="name"> ${name}</p>
            <p class="height"> ${height} cm</p>
            <p class="mass"> ${mass} kg</p>

            <button class="more">show more</button>
            <div class="more-data">
            <p class="hair-color"> hair color: ${hairColor} </p>
            <p class="eye-color"> eye color: ${eyeColor} </p>
            </div>
        </div>
    `;

    // a .map új objektumokat hoz létre és átalakítja html kóddá, objektumok kulcsait adjuk tovább 1-1 komponensnek
    // 
const charactersComponent = (charactersData) => `
    <div class="characters">
    ${charactersData.map((characterData, index) => characterComponent(
        characterData.name,
        characterData.height,
        characterData.mass,
        index,
        characterData.hair_color,
        characterData.eye_color))
        .join(" ")}
    </div>
`;

const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


// a lényeg
// a meglévő karakter adat tömbbe bele pusholjuk az új adatokat(... nélkül egy elemként csomagolja bele az arraybe, ...-al külön elemenként teszi bele)
// a rootelement( a belépési pontba) illeszti bele a html kódot
// buttonhtml = gomb html kódja
// 
const makeDomFromData = (data, rootElement) => {
    charactersData.push(...data.results);
    let charactersHtml = charactersComponent(charactersData);
    const buttonHtml = `<button class="fetch"> load more...</button>`;

    rootElement.insertAdjacentHTML("beforeend", charactersHtml);
    const moreButtonElements = document.querySelectorAll("button.more");
    moreButtonElements.forEach(moreButtonElement => moreButtonElement.
    addEventListener("click", () => {
        moreButtonElement.classList.toggle("clicked");

        moreButtonElement.innerText === "show more" ? moreButtonElement.innerText = "show less" :
        moreButtonElement.innerText = "show more";
    }));

    if (data.next) {rootElement.insertAdjacentHTML("beforeend", buttonHtml);

        const buttonElement = document.querySelector("button.fetch");
        buttonElement.addEventListener("click", async () => {
            buttonElement.innerText ="loading next page...";
            buttonElement.disabled = true;
            const newData = await fetchData(data.next);
            rootElement.innerHTML = "";
            makeDomFromData(newData, rootElement);
        });
    }
}

// innen jon az adat
// meghatározzuk a belépési pontját
// az apiból érkező adatot és a belépési pontot átadja a datának és a rootelementnek
const init = async () => {
    const data = await fetchData("https://swapi.dev/api/people/")
    const rootElement = document.querySelector("#root");
    makeDomFromData(data, rootElement);
}

init();

/* async function fetchData() {
const fetchResult = await fetch("https://swapi.dev/api/people/")
const data = await fetchResult.json();
const characters = data.results;

const rootElement = document.querySelector("#root");
rootElement.insertAdjacentHTML("beforeend", charactersComponent(characters))
rootElement.insertAdjacentHTML("beforeend", "<button class='fetch'>load more...</button>");

const fetchButtonElement = document.querySelector("button.fetch");
fetchButtonElement.addEventListener("click", async () => {
    console.log("fetch next page");
    console.log(data.next);

    const newFetchResult = await fetch(data.next); 
    console.log(newFetchResult);
    const newData = await newFetchResult.json();
    console.log(newData);
    const newCharacters = newData.results;
    console.log(newCharacters);


    rootElement.insertAdjacentHTML("beforeend", charactersComponent(newCharacters));

    fetchButtonElement.remove();
    rootElement.insertAdjacentHTML("beforeend", "<button class='fetch'>load more...</button>");
    const newFetchButtonElement = document.querySelector("button.fetch");
    newFetchButtonElement.addEventListener("click", () => {
        console.log("fetch third page");
        console.log(newData.next)
    })
})
}
 */

//fetchData(); 


