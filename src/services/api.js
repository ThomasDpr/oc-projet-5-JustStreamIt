// Fonction asynchrone pour récupérer le meilleur film en se basant sur le score IMDB par ordre décroissant
async function fetchBestMovie() {
    try {
        // On fait la requête HTTP pour récupérer le film avec le meilleur score IMDB
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=1");
        // On convertit la response en JSON pour pouvoir utiliser les datas facilement
        const data = await response.json();
        // On retourne uniquement le prmier index du tableau des results qui est du coup le meilleur film
        return data.results[0];
    } catch (error) {
        // si il y a une erreur de request, -> afficher l'erreur dans la console
        console.error("Erreur lors de la récupération du meilleur film :", error);
        // Pour ne rien casser, on retourne null si l'erreur est là 
        return null;
    }
}

// Fonction asynchrone pour récupérer les films les mieux notés en se basant sur le score IMDB par ordre décroissant
async function fetchTopRatedMovies() {
    try {
        // On fait la requête HTTP pour récupérer les 8 premiers films les mieux notés
        const response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7"); // 7
        // On convertit la response en JSON pour pouvoir utiliser les datas facilement
        const data = await response.json();
        // On retourne uniquement les 8 premiers index du tableau des results puisqu'on a mis 8 dans le paramètre page_size
        return data.results;
    } catch (error) {
        // si il y a une erreur de request, -> afficher l'erreur dans la console
        console.error("Erreur lors de la récupération des films les mieux notés :", error);
        // Et on retourne un tableau vide car on ne veut pas que le contenu de la page ne s'affiche pas
        return [];
    }
}

// Fonction asynchrone pour récupérer les films d'une catégorie spécifique, triés par IMDB décroissant et limités à 6 films
async function fetchCategoryMovies(genre) {
    try {
        // On fait la requête HTTP pour récupérer les 6 premiers films de la catégorie spécifiée
        const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score&page_size=6`);
        // On convertit la response en JSON pour pouvoir utiliser les datas facilement
        const data = await response.json();
        // On retourne uniquement les 6 premiers index du tableau des results puisqu'on a mis 6 dans le paramètre page_size
        return data.results;
    } catch (error) {
        // si il y a une erreur de request, -> afficher l'erreur dans la console
        console.error(`Erreur lors de la récupération des films pour la catégorie ${genre} :`, error);
        // Et on retourne un tableau vide car on ne veut pas que le contenu de la page ne s'affiche pas
        return [];
    }
}

// Fonction asynchrone pour récupérer les détails d'un film en utilisant son ID
async function fetchMovieDetails(movieId) {
    try {
        // On fait la requête HTTP pour récupérer les détails du film
        const response = await fetch(`http://localhost:8000/api/v1/titles/${movieId}`);
        // On convertit la response en JSON pour pouvoir utiliser les datas facilement
        return await response.json();
    } catch (error) {
        // si il y a une erreur de request, -> afficher l'erreur dans la console
        console.error("Erreur lors de la récupération des détails du film :", error);
        // Et on retourne null car on ne veut pas que le contenu de la page ne s'affiche pas
        return null;
    }
}

// Fonction asynchrone pour récupérer les catégories disponibles (les genres)
async function fetchCategories() {
    try {
        // On initialise un tableau vide pour stocker les catégories
        const categories = [];
        // On initialise une variable qui va contenir l'URL de la page suivante
        let url = "http://localhost:8000/api/v1/genres/";

        // Tant que l'URL n'est pas nulle, on fait la requête HTTP pour récupérer les catégories
        while (url) {
            // On fait la requête HTTP pour récupérer une page de catégories
            const response = await fetch(url);
            // On convertit la response en JSON pour pouvoir utiliser les datas facilement
            const data = await response.json();
            // On ajoute les catégories récupérées à la liste des catégories
            categories.push(...data.results);
            // On met à jour l'URL de la page suivante (si elle existe)
            url = data.next;
        }
        // On retourne la liste des catégories (elle est censé être complète)

        return categories;
    } catch (error) {
        // si il y a une erreur de request, -> afficher l'erreur dans la console
        console.error("Erreur lors de la récupération des catégories :", error);
        // Et on retourne un tableau vide car on ne veut pas que le contenu de la page ne s'affiche pas
        return [];
    }
}
