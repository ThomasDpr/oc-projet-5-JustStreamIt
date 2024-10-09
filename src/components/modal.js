function showMovieDetails(movieId) {
    fetchMovieDetails(movieId)
        .then((movie) => {
            if (movie) {
                const modalContent = document.getElementById("modal-content");
                const modal = document.getElementById("movie-modal");

                modalContent.innerHTML = `
                    <div class="flex flex-col justify-between p-6 md:gap-10 md:h-full">
                        <div class="flex justify-between w-full">
                            <div class="flex flex-col gap-4 w-full">
                                <h2 class="text-4xl font-bold">${movie.title || "Titre non disponible"}</h2>
                                <div class="flex flex-col font-semibold">
                                  <p>${movie.year} - ${movie.genres.join(", ")}</p>
                                  <p>${movie.rated} - ${movie.duration} minutes (${movie.countries.join(" / ")})</p>
                                  <p>IMDB score: ${movie.imdb_score || "Non disponible"}/10</p>
                                  <p>Box Office: ${movie.worldwide_gross_income || "Non disponible"}</p>
                                </div>
                                <div class="flex flex-col">
                                  <p class="font-semibold">Réalisé par :</p>
                                  <p class="font-light">${movie.directors.join(", ") || "Non disponible"}</p>
                                </div>
                            </div>

                            <img src="${movie.image_url}" alt="${movie.title || 'Image non disponible'}" class="hidden sm:block object-cover w-1/2 h-full rounded-md" onerror="this.onerror=null;this.src='/src/assets/images/cover-not-found.png';"/>
                        </div>
                        <div class="flex flex-col gap-4">
                          <p class="hyphens-auto text-justify w-full font-light">${movie.long_description || movie.description || "Résumé non disponible"}</p>
                          <img src="${movie.image_url}" alt="${movie.title || 'Image non disponible'}" class="sm:hidden object-cover w-full h-1/3 rounded-md" onerror="this.onerror=null;this.src='/src/assets/images/cover-not-found.png';"/>
                        </div> 
                        <div>
                          <p class="font-semibold">Avec :</p>
                          <p>${movie.actors.join(", ") || "Non disponible"}</p>
                        </div>
                    </div>
                `;

                modal.classList.remove("hidden");

                setTimeout(() => {
                    document.getElementById('modal-overlay').classList.add('opacity-80');
                    document.getElementById('modal-content-wrapper').classList.add('scale-100', 'opacity-100');
                }, 10);
            }
        })
        .catch((error) =>
            console.error("Erreur lors de la récupération des détails du film :", error)
        );
}

function closeModal() {
    const modal = document.getElementById("movie-modal");

    document.getElementById('modal-overlay').classList.remove('opacity-80');
    document.getElementById('modal-content-wrapper').classList.remove('scale-100', 'opacity-100');

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
}

document.querySelectorAll(".close-modal-btn").forEach(button => {
    button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

document.getElementById("modal-overlay").addEventListener("click", closeModal);
