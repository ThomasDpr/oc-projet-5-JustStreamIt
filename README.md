# JustStreamIt

Bienvenue dans JustStreamIt ! Ce projet est composé de deux parties : un backend pour fournir les données des films et un frontend pour les afficher.

## Table des Matières

- [Prérequis](#prérequis)
- [Cloner le Dépôt Backend](#cloner-le-dépôt-backend)
- [Installation du Backend](#installation-du-backend)
- [Cloner le Dépôt Frontend](#cloner-le-dépôt-frontend)
- [Lancement du Frontend](#lancement-du-frontend)
- [Fonctionnalités](#fonctionnalités)
- [Remarques](#remarques)

## Prérequis

- Python 3.x

## Cloner le Dépôt Backend

1. **Ouvrez votre terminal et clonez le dépôt backend :**

   ```sh
   git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
   ```

2. **Accédez au répertoire du backend :**

   ```sh
   cd OCMovies-API-EN-FR
   ```

## Installation du Backend

1. **Créez un environnement virtuel :**

   - Windows :

     ```sh
     python -m venv env
     env\Scripts\activate
     ```

   - MacOS/Linux :

     ```sh
     python3 -m venv env
     source env/bin/activate
     ```

2. **Installez les dépendances :**

   ```sh
   pip install -r requirements.txt
   ```

3. **Créez et alimentez la base de données :**

   ```sh
   python manage.py create_db
   ```

4. **Démarrez le serveur :**

   ```sh
   python manage.py runserver
   ```

## Cloner le Dépôt Frontend

1. **Ouvrez un nouveau terminal et clonez le dépôt frontend :**

   ```sh
   git clone https://github.com/ThomasDpr/oc-projet-5-JustStreamIt.git
   ```

2. **Accédez au répertoire du frontend :**

   ```sh
   cd oc-projet-5-JustStreamIt
   ```

## Lancement du Frontend

1. **Pour démarrer le serveur**

   Exécutez la commande suivante dans le répertoire où se trouve le fichier `index.html`.

   ```sh
   python -m http.server 3000
   ```

2. **Accédez à l'application**

   Accédez à l'adresse suivante dans votre navigateur web : `http://localhost:3000`

## Fonctionnalités

- Affichage des films : Consultez les films les mieux notés et le meilleur film
- Détails des films : Cliquez sur un film pour afficher ses détails
- Interface Réactive : Profitez d'une interface utilisateur réactive et moderne.

### Remarques

- Assurez-vous que le backend est en cours d'exécution pour que le frontend puisse récupérer les données nécessaires.
- Vérifiez que tous les fichiers nécessaires sont dans les bons répertoires.
