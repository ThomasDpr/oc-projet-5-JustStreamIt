// Fonction qui génère l'HTML de manière dynamique pour afficher le MEILLEUR film
function generateBestMovieHTML(movie) {
    return `
    <img src="${movie.image_url}" alt="${movie.title}" class=" show-details size-full md:size-1/4 object-cover rounded-md group-hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer" data-id="${movie.id}" onerror="this.onerror=null;this.src='/src/assets/images/cover-not-found.png';"/>
    <div class="flex flex-col justify-between w-full gap-4">
        <div class="flex flex-col gap-2 md:gap-10">
            <h3 class="text-3xl md:text-5xl font-semibold">${movie.title}</h3>
            <p class="max-w-xl text-base md:text-3xl font-light">${movie.description}</p>
        </div>
        <button class="text-xs md:text-sm self-center md:self-end py-1.5 px-8 bg-zinc-800 border-white text-white border rounded-full show-details opacity-100 cursor-pointer" data-id="${movie.id}">Détails</button>
    </div>
    `;
}


// Fonction qui génère l'HTML de manière dynamique pour afficher une CARD DE FILM + SES DÉTAILS
function generateMovieCardHTML(movie, movieDetails) {
    return `
    <div class="relative h-full group overflow-hidden rounded-md shadow-lg  ">
        <img src="${movie.image_url}" alt="${movie.title}" data-id="${movie.id}"
            class="w-full h-full object-cover movie-detail transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer" onerror="this.onerror=null;this.src='/src/assets/images/cover-not-found.png';"/>
        <div class="flex flex-col absolute min-h-[30%] justify-between bottom-0 inset-x-0 bg-black bg-opacity-50 text-white p-4 duration-300 ease-in-out backdrop-blur">
            <h3 class="text-xl font-bold group-hover:border-b-[0.5px] group-hover:border-white">${movie.title}</h3>
            <div class="flex group-hover:py-4 opacity-0 group-hover:opacity-100 justify-between overflow-hidden transition-all duration-300 ease-in-out">
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
                    ${movieDetails.genres.map(genre => `<span class="border border-white px-2 py-1 rounded-full text-xs">${genre}</span>`).join("")}
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
                    <img src="/src/assets/svgs/star.svg" alt="star" class="size-3">
                    <p class="text-xs">${movie.imdb_score}/10</p>
                </div>
            </div>
            <p class="text-sm leading-tight opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-500 ease-in-out line-clamp-4">${movieDetails.description || "Résumé non disponible."}</p>
            <button class="mt-4 text-sm self-end py-1.5 px-8 bg-zinc-800 border-white border rounded-full show-details opacity-100 cursor-pointer" data-id="${movie.id}">Détails</button>
        </div>
    </div>
  `;
}

// Fonction qui génère l'HTML des SKELETONS (load) de manière dynamique pour un nombre de CARD DE FILM nécessaire
function showMovieCardSkeletons(container, count) {
    // On vide d'abord le conteneur (qui sera défini par l'appel de la fonciton pour ne pas avoir à la fois les skeletons et les cards de films)
    container.innerHTML = '';

    // on boucle pour ajouter 'count' (nombre de CARD DE FILM) de skeletons au conainer
    // 'i' commence à 0 et va s'incrémenter de 1 à chaque itération de la boucle jusqu'à ce que 'i' soit égal à 'count'
    // de cette manière, si 'count' est par exemple égal à 6, on aura 6 skeletons et 'i' prendre les valeurs 0, 1, 2, 3, 4, 5
    for (let i = 0; i < count; i++) {
        container.innerHTML += `
        <div class="relative group overflow-hidden rounded-md shadow-lg animate-pulse">
            <div class=" h-[549px] w-[373.px] bg-gray-400"></div>
            <div class="flex flex-col absolute bottom-0 left-0 right-0 bg-gray-500 bg-opacity-50 p-4 space-y-2">
                <div class="h-6 bg-gray-400 rounded-md w-3/4"></div>
                <div class=" bg-gray-400 h-[34px] w-[110.258px] py-1.5 px-8 rounded-full self-end"></div>
            </div>
        </div>
      `;
    }
}

// Fonction qui génère l'HTML des SKELETONS (load) de manière dynamique pour le meilleur film (sa section)
function showSkeleton(container) {
    container.innerHTML = `
     <div id="best-movie-skeleton" class="flex w-full animate-pulse">
        <div class="bg-gray-400 w-1/4 h-[334px] rounded-md"></div>
        <div class="flex flex-col justify-between w-full pl-4">
            <div class="flex flex-col gap-10">
                <div class="bg-gray-400 h-10 max-w-2xl rounded-md"></div>
                <div class="bg-gray-400 h-20 max-w-xl rounded-md"></div>
            </div>
            <div class="bg-gray-400 h-[34px] w-[110.258px] py-1.5 px-8 rounded-full self-end"></div>
        </div>
    </div>
  `;
}

// Fonction qui met à jour le titre d'une section avec le nom de la catégorie (genre) sélectionnée
function updateCategoryTitle(sectionId, title) {
    const titleElement = document.getElementById(sectionId);
    titleElement.textContent = title;
}

// Fonction qui toggle le bouton "Voir plus" pour afficher ou masquer les CARD DE FILM dans une section
function toggleShowMore(button, container) {
    // On récupère le texte du bouton "Voir plus" pour savoir si on affiche ou masque les CARD DE FILM
    const isShowingMore = button.textContent === "Voir moins";
    // on récupère toutes les CARD DE FILM qui contiennent .movie-card et puisque on itere, c'est plus simple
    const items = container.querySelectorAll(".movie-card");

    // on parcourt toutes les CARD DE FILM pour ajouter ou enlever les classes en fonction de l'état actuel et de 'isShowingMore'
    items.forEach((item, index) => {
        if (index >= 2) { // Si l'index est supérieur ou égal à 2, on ajoute les classes
            if (isShowingMore) { // et si actuellement c'est le bouton "Voir moins"
                item.classList.add("hidden"); // on ajoute la classe 'hidden'
                if (index < 4) {
                    item.classList.add("md:block"); // on ajoute la classe 'md:block' si l'index est inférieur à 4
                }
                if (index < 6) {
                    item.classList.add("lg:block"); // on ajoute la classe 'lg:block' si l'index est inférieur à 6
                }
            } else {
                item.classList.remove("hidden", "md:block", "lg:block"); // sinon on enlève les classes
            }
        }
    });

    // On met à jour le texte du bouton "Voir plus" pour refléter l'état actuel
    button.textContent = isShowingMore ? "Voir plus" : "Voir moins";
}
