
document.addEventListener("DOMContentLoaded", async() => {
    try {
        const response = await fetch("https://planets-api.vercel.app/api/v1/planets");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const planetName = window.location.pathname.split("/").pop().split(".")[0];
        const planet = data.find(planet => planet.name.toLowerCase() === planetName.toLowerCase());

        if (planet) {
            const rotationDiv = document.querySelector('.rotationTime');
            rotationDiv.innerHTML = `<strong>Rotation</strong> ${planet.rotation}`;

            const revolutionDiv = document.querySelector('.revolutionTime');
            revolutionDiv.innerHTML = `<strong>Revolution</strong> ${planet.revolution}`;

            const radiusDiv = document.querySelector('.radius');
            radiusDiv.innerHTML = `<strong>Radius</strong> ${planet.radius}`;

            const averageTempDiv = document.querySelector('.averageTemperature');
            averageTempDiv.innerHTML = `<strong>Average Temp.</strong> ${planet.temperature}`;
        } else {
            throw new Error("Planet data not found");
        }

    } catch (error) {
        console.error('Error:', error);
    }
});

