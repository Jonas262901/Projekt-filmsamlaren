const TMDB_API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "4541a84d2422f7f36106b1adfb65e810";

const searchInput = document.getElementById("search");
const moviesContainer = document.getElementById("movies");

// Hämta filmer från TMDb baserat på sökfrågan
async function fetchMovies(query = "star wars") {
    try {
        moviesContainer.innerHTML = "<p>Laddar...</p>";
        const response = await fetch(`${TMDB_API_URL}search/movie?query=${query}&api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Något gick fel med API-förfrågan.");
        const data = await response.json();
        if (!data.results || data.results.length === 0) throw new Error("Inga filmer hittades.");
        displayMovies(data.results);
    } catch (error) {
        console.error(error.message);
        moviesContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

// Visa filmer i sökresultatet
function displayMovies(movies) {
    moviesContainer.innerHTML = movies
        .map((movie) => {
            const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://thumbs.dreamstime.com/z/no-image-available-icon-177641087.jpg?ct=jpeg';
        

            const title = movie.title || "Titel saknas";
            const year = movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "År saknas";

            return `
                <div class="movie-card" onclick="saveDetails('${movie.id}')">
                    <img src="${posterUrl}" alt="${title}">
                    <h2>${title} (${year})</h2>
                </div>
            `;
        })
        .join("");
}

// Spara movieID till localStorage och navigera till detaljsidan
function saveDetails(movieID) {
    localStorage.setItem("movieID", movieID);
    window.location.href = "details.html";
}

// Lägg till eventlyssnare på sökfältet
searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    fetchMovies(query || "star wars");
});

// Hämta standardfilmer vid laddning av sidan
fetchMovies();
