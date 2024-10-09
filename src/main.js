// Quand le DOM sera définitivement chargé, tout commence
document.addEventListener("DOMContentLoaded", function () {
  // Sélection des éléments HTML où seront affichés les contenus pour les films
  const bestMovieContainer = document.getElementById("best-movie-content");
  const topRatedMoviesContainer = document.getElementById("top-rated-movies-content");
  const category1Container = document.getElementById("category-1-content");
  const category2Container = document.getElementById("category-2-content");
  const freeCategoryContainer = document.getElementById("free-category-content");

  updateCategoryTitle("free-category-title", "Catégorie Libre");


  // On initialise le meilleur film avec null
  let bestMovieId = null;

  // Configuratin des buttons "voir plus" pour chaque section de films 
  document.getElementById("category-1-show-more").addEventListener("click", function () {
    toggleShowMore(this, category1Container); // gère l'affichage des films supplémentaires dans la 1ère catégorie
  });

  document.getElementById("category-2-show-more").addEventListener("click", function () {
    toggleShowMore(this, category2Container); // gère l'affichage des films supplémentaires dans la 2ème catégorie
  });

  document.getElementById("free-category-show-more").addEventListener("click", function () {
    toggleShowMore(this, freeCategoryContainer); // gère l'affichage des films supplémentaires dans la catégorie libre
  });

  document.getElementById("top-rated-show-more").addEventListener("click", function () {
    toggleShowMore(this, topRatedMoviesContainer); // gère l'affichage des films supplémentaires dans la section des films les mieux notés
  });


  // Appel de la fonction 'fetchBestMovie' pour récupérer le meilleur film et l'afficher
  fetchBestMovie().then((bestMovie) => {
    // Si le meilleur film est trouvé
    if (bestMovie) {
      bestMovieId = bestMovie.id; // on enregistre l'ID du meilleur film pour éviter de le réafficher dans d'autres sections
      showSkeleton(bestMovieContainer); // on affiche le skeleton pour indiquer que le contenu est en cours de chargement avant d'afficher les datas

      // on fait une requête supplémentaire pour avoir les détails complets du film (sa description, et tout le reste)
      fetchMovieDetails(bestMovieId).then((movieDetails) => {
        bestMovieContainer.innerHTML = ''; // on efface le skeleton pour afficher les datas réelles
        bestMovieContainer.innerHTML = generateBestMovieHTML(movieDetails); // on appelle la fonction 'generateBestMovieHTML' pour générer l'HTML du meilleur film et l'afficher

        // on ajoute l'événement click au bouton 'détails'  et sur l'image du film pour afficher la modale
        bestMovieContainer.querySelectorAll(".show-details").forEach(element => {
          element.addEventListener("click", function () {
            showMovieDetails(bestMovieId); // on appelle la fonction 'showMovieDetails' pour afficher la modale
          });
        });
      });
    }
  });

  // Appel de la fonction 'fetchTopRatedMovies' pour récupérer les films les mieux notés et les afficher
  fetchTopRatedMovies().then((movies) => {
    showMovieCardSkeletons(topRatedMoviesContainer, 6); // on affiche les skeletons pour indiquer que le contenu est en cours de chargement avant d'afficher les datas
    // on passe en paramètre le nombre de CARD DE FILM "skelétés" à afficher (6 ici)

    // ici on mappe les données récupérées pour chaque film
    const movieDetailsPromises = movies.map(movie => fetchMovieDetails(movie.id)); // et on appelle la fonction 'fetchMovieDetails' pour récupérer les détails complets de chaque film

    // on attend que toutes les promesses soient plus en 'pending' mais en 'fulfilled'
    Promise.all(movieDetailsPromises).then(moviesDetails => {
      topRatedMoviesContainer.innerHTML = ''; // on efface les skeletons avant d'ajouter les films réels

      let movieCount = 0; // on initialise le compteur de CARD DE FILM affichés

      // on parcourt les données récupérées pour chaque film
      moviesDetails.forEach((movieDetails, index) => {
        // Si le compteur est inférieur à 6 et que les 'movieDetails' est bien présents et que l'ID du film n'est pas le même que le meilleur film
        if (movieCount < 6 && movieDetails && movies[index].id !== bestMovieId) {
          // alors on génère l'HTML CARD DE FILM et on l'ajoute à la section
          const movieCardHTML = generateMovieCardHTML(movies[index], movieDetails);
          topRatedMoviesContainer.innerHTML += `
            <div class="movie-card ${movieCount >= 2 ? 'hidden' : ''} ${movieCount >= 2 && movieCount < 4 ? 'md:block' : ''} ${movieCount >= 4 ? 'lg:block' : ''}">
              ${movieCardHTML}
            </div>`;
          movieCount++; // on incrémente le compteur de CARD DE FILM affichés
        }
      });

      // on ajoute les événements de clic aux boutons 'détails' et aux images en itérant
      const cards = document.querySelectorAll(".movie-detail");
      cards.forEach((card) => {
        card.addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");
          showMovieDetails(movieId); // on appelle la fonction 'showMovieDetails' pour afficher la modale
        });
      });

      // pareil ici, on ajoute les événements de clic aux boutons 'détails en itérant
      const detailButtons = topRatedMoviesContainer.querySelectorAll(".show-details");
      detailButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");
          showMovieDetails(movieId); // on appelle la fonction 'showMovieDetails' pour afficher la modale
        });
      });
    });
  });


  // Appel de la fonction 'fetchCategoryMovies' pour récupérer les films d'une catégorie spécifique et les afficher (genre choisi: Action)
  fetchCategoryMovies("Action").then((movies) => {
    showMovieCardSkeletons(category1Container, 6); // on affiche les skeletons pour indiquer que le contenu est en cours de chargement avant d'afficher les datas
    // on passe en paramètre le nombre de CARD DE FILM "skelétés" à afficher (6 ici)

    const movieDetailsPromises = movies.map(movie => fetchMovieDetails(movie.id));

    Promise.all(movieDetailsPromises).then(moviesDetails => {
      category1Container.innerHTML = '';

      moviesDetails.forEach((movieDetails, index) => {
        if (movieDetails) {
          const movieCardHTML = generateMovieCardHTML(movies[index], movieDetails);
          category1Container.innerHTML += `
            <div class="movie-card ${index >= 2 ? 'hidden' : ''} ${index >= 2 && index < 4 ? 'md:block' : ''} ${index >= 4 ? 'lg:block' : ''}">
              ${movieCardHTML}
            </div>`;
        }
      });

      // on met à jour le titre de la section avec le nom de la catégorie qu'on a décidé 
      updateCategoryTitle("category-1-title", "Action");

      const cards = category1Container.querySelectorAll(".movie-detail");
      cards.forEach((card) => {
        card.addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");
          showMovieDetails(movieId);
        });
      });

      const detailButtons = category1Container.querySelectorAll(".show-details");
      detailButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");
          showMovieDetails(movieId);
        });
      });
    });
  });

  // Appel de la fonction 'fetchCategoryMovies' pour récupérer les films d'une catégorie spécifique et les afficher (genre choisi: Biography)
  fetchCategoryMovies("Biography").then((movies) => {
    showMovieCardSkeletons(category2Container, 6);

    const movieDetailsPromises = movies.map(movie => fetchMovieDetails(movie.id));

    Promise.all(movieDetailsPromises).then(moviesDetails => {
      category2Container.innerHTML = '';

      moviesDetails.forEach((movieDetails, index) => {
        if (movieDetails) {
          const movieCardHTML = generateMovieCardHTML(movies[index], movieDetails);
          category2Container.innerHTML += `
            <div class="movie-card ${index >= 2 ? 'hidden' : ''} ${index >= 2 && index < 4 ? 'md:block' : ''} ${index >= 4 ? 'lg:block' : ''}">
              ${movieCardHTML}
            </div>`;
        }
      });

      // on met à jour le titre de la section avec le nom de la catégorie qu'on a décidé
      updateCategoryTitle("category-2-title", "Biographie");

      const cards = category2Container.querySelectorAll(".movie-detail");
      cards.forEach((card) => {
        card.addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");
          showMovieDetails(movieId);
        });
      });

      const detailButtons = category2Container.querySelectorAll(".show-details");
      detailButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const movieId = this.getAttribute("data-id");
          showMovieDetails(movieId);
        });
      });
    });
  });


  // Appel de la fonction 'fetchCategories' pour récupérer tous les catégories (genres) disponibles et les afficher
  fetchCategories().then((categories) => {
    const categorySelect = document.getElementById("category-select");
    // Pour chaque catégorie disponible, on itère
    categories.forEach((category) => {
      // on crée un nouvel élément <option> pour le <select>
      const option = document.createElement("option");
      // on lui attribue la valeur et le texte (son nom)
      option.value = category.name;
      // on lui attribue le texte (son nom)
      option.textContent = category.name;
      // on ajoute l'élément <option> au <select>
      categorySelect.appendChild(option);
    });
  });

  document.getElementById("category-select").addEventListener("change", function () {
    const selectedCategory = this.value;
    // Si une catégorie est sélectionnée
    if (selectedCategory) {
      fetchCategoryMovies(selectedCategory).then((movies) => {
        showMovieCardSkeletons(freeCategoryContainer, 6);

        const movieDetailsPromises = movies.map(movie => fetchMovieDetails(movie.id));

        Promise.all(movieDetailsPromises).then(moviesDetails => {
          freeCategoryContainer.innerHTML = '';

          moviesDetails.forEach((movieDetails, index) => {
            if (movieDetails) {
              freeCategoryContainer.innerHTML += `
                <div class="movie-card ${index >= 2 ? 'hidden' : ''} ${index >= 2 && index < 4 ? 'md:block' : ''} ${index >= 4 ? 'lg:block' : ''}">
                  ${generateMovieCardHTML(movies[index], movieDetails)}
                </div>`;
            }
          });

          // on met à jour le titre de la section avec le nom de la catégorie cette fois-ci sélectionnée (choisi dans le select )
          updateCategoryTitle("free-category-title", selectedCategory);


          const cards = freeCategoryContainer.querySelectorAll(".movie-detail");
          cards.forEach((card) => {
            card.addEventListener("click", function () {
              const movieId = this.getAttribute("data-id");
              showMovieDetails(movieId);
            });
          });

          const detailButtons = freeCategoryContainer.querySelectorAll(".show-details");
          detailButtons.forEach((button) => {
            button.addEventListener("click", function () {
              const movieId = this.getAttribute("data-id");
              showMovieDetails(movieId);
            });
          });
        });
      });
    } else { // Sinon, on dit de selectionner une catégorie si il reclique sur l'item 'sélectionner une catégorie'
      freeCategoryContainer.innerHTML = "<p>Sélectionnez une catégorie pour voir les films.</p>";
      // et on remet le titre de la section à son état d'origine donc 'Catégorie Libre'
      updateCategoryTitle("free-category-title", "Catégorie Libre");
    }
  });
});
