document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://planets-api.vercel.app/api/v1/planets/";
    const changeImage = document.getElementById("planetImages");
    const planetContent = document.getElementById("planetContent");
    const planetNameElement = document.getElementById("planetName");
    const overviewBtn = document.getElementById('overviewBtn');
    const structureBtn = document.getElementById('structureBtn');
    const geologyBtn = document.getElementById('geologyBtn');
    const planetsLink = document.querySelectorAll('.planetLink');

    let planetImages;

    const getPlanetData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            const planetName = window.location.pathname.split("/").pop().split(".")[0];
            const planet = data.find(planet => planet.name.toLowerCase() === planetName.toLowerCase());

            if (planet) {
                planetImages = {
                    'overview': planet.images.planet,
                    'structure': planet.images.internal,
                    'geology': planet.images.geology
                };
                render(planet);
            } else {
                throw new Error("Planet data not found");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const render = (planet) => {
        const displayContent = (content) => {
            planetNameElement.textContent = planet.name;
            planetContent.textContent = planet[content].content;
            const wikiLink = document.querySelector('.planetLink a');
            wikiLink.href = planet[content].source;
        };

        overviewBtn.addEventListener("click", () => {
            displayImage('overview');
            displayContent('overview');
        });

        structureBtn.addEventListener("click", () => {
            displayImage('structure');
            displayContent('structure');
        });

        geologyBtn.addEventListener("click", () => {
            displayImage('geology');
            displayContent('geology');
        });
        
        displayImage('overview');
        displayContent('overview');
    };

    const displayImage = (content) => {
        changeImage.innerHTML = '';

        const img = document.createElement('img');
        img.classList.add('planet-img');
        img.src = planetImages[content];
        img.alt = "image of the planet";
        changeImage.appendChild(img);
    };

    getPlanetData();

    planetsLink.forEach(link => {
        link.addEventListener("click", (event) => {
            const planetName = event.target.textContent.toLowerCase();
            getPlanetData(planetName);
        });
    });
});
