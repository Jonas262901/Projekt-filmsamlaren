const TMDB_API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "4541a84d2422f7f36106b1adfb65e810";

const movieDetailsContainer = document.getElementById("movie-details");
const movieID = localStorage.getItem("movieID");

async function fetchMovieDetails(id) {
    try {
        movieDetailsContainer.innerHTML = "<p>Laddar detaljer...</p>";
        const response = await fetch(`${TMDB_API_URL}movie/${id}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Något gick fel med API-förfrågan.");
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error(error.message);
        movieDetailsContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayMovieDetails(movie) {
    const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://thumbs.dreamstime.com/z/no-image-available-icon-177641087.jpg?ct=jpeg';


    const title = movie.title || "Titel saknas";
    const year = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : "År saknas";

    const overview = movie.overview || "Handling saknas";

    const genres = movie.genres && movie.genres.length > 0
        ? movie.genres.map((genre) => genre.name).join(", ")
        : "Genre saknas";

    movieDetailsContainer.innerHTML = `
        <h2>${title} (${year})</h2>
        <img src="${posterUrl}" alt="${title}">
        <p><strong>Genre:</strong> ${genres}</p>
        <p><strong>Handling:</strong> ${overview}</p>
    `;
}

// Hämta detaljer för vald film
fetchMovieDetails(movieID);
