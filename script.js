const results = document.querySelector('#response');

// Fetch data from SWAPI, dynamically checking what data we want using page parameter.
async function asyncFetch(page) {
    // Awaiting results, omits the need for .then()
    const result = await fetch(`https://swapi.dev/api/${page}`);
    const data = await result.json();
    // Seperate display logic into separate function
    outputResponse(data, page);
}

// Display depending on which page (or value) is selected.
function outputResponse(data, page) {
    let output = '';

    if (page === 'films') {
        data.results.forEach(item => {
            // Append resutls into empty output string
            output += `
                <div class="card m-1 p-4" style="opacity:.8">
                    <h3 class="card-title text-center" style="width: 18rem;">${item.title}</h3>
                    <div class="card-content">
                        <p class="card-text text-center">Producer: ${item.producer}</p>
                        <p class="card-text text-center">Director: ${item.director}</p>
                        <p class="card-text text-center">Release date: ${item.release_date}</p>
                        <p class="card-text text-center">
                            <span class="quote">"</span>
                            ${item.opening_crawl}
                            <span class="quote">"</span>
                        </p>
                    </div>
                </div>
            `;
        })
    }
    if (page === 'people') {
        data.results.forEach(item => {
            output += `
                <div class="card m-1 p-2" style="opacity:.8">
                    <h3 class="card-title text-center">${item.name}</h3>
                    <div class="card-content">
                        <p class="card-text">Gender: ${item.gender}</p>
                        <p class="card-text">Height: ${item.height}</p>
                        <p class="card-text">Weight: ${item.mass}</p>
                        <p class="card-text">Skin Colour: ${item.skin_color}</p>
                    </div>
                </div>
            `
        })
    }

    if (page === 'planets') {
        data.results.forEach(item => {
            output += `
                <div class="card m-1 p-2" style="opacity:.8">
                    <h3 class="card-title text-center">${item.name}</h3>
                    <div class="card-content">
                        <p class="card-text">Diameter: ${item.diameter}</p>
                        <p class="card-text">Year Length: ${item.orbital_period} days</p>
                        <p class="card-text">Day Length: ${item.rotation_period} hours</p>
                        <p class="card-text">Terrain: ${item.terrain}</p>
                    </div>
                </div>
            `
        })
    }

    if (page === 'starships') {
        data.results.forEach(item => {
            output += `
                <div class="card m-1 p-2" style="opacity:.8">
                    <h3 class="card-title text-center">${item.name}</h3>
                    <div class="card-content">
                        <p class="card-text">Crew: ${item.crew}</p>
                        <p class="card-text">Hyper Drive Class: ${item.hyperdrive_rating}</p>
                        <p class="card-text">Model: ${item.model} hours</p>
                        <p class="card-text">Passengers: ${item.passengers}</p>
                    </div>
                </div>
            `
        })
    }
    // Add data to page
    results.innerHTML = output;
}

// Event listener for changing pages / endpoints
document.querySelector('#buttons').addEventListener('click', event => {
    // Get the value of the radio buttons, to pass into the data fetch URL.
    asyncFetch(event.target.textContent.trim().toLowerCase());
})