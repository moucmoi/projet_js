# Projet GTA JS 

**GTA** est une application web interactive développée en JavaScript, permettant de visualiser et manipuler des données issues de l’univers de GTA V. Le projet repose sur des fichiers JSON simulant une API via `json-server`, sans base de données externe.

Ce projet a été réalisé dans un cadre pédagogique, afin de mettre en pratique la manipulation de données JSON, la structuration modulaire d’un projet JS et la création d’une interface utilisateur interactive.

---

## 🎮 Fonctionnalités principales

- Affichage dynamique des **personnages** avec leurs caractéristiques, bonus, niveaux, évolutions, ratings...
- Consultation d’un **catalogue d’armes** interactif.
- Utilisation de **json-server** pour simuler un backend REST à partir de fichiers JSON.
- Architecture propre et modulaire avec séparation des vues, données et scripts.
- Interface légère et responsive.

---

## 🚀 Lancement du projet

### 1. Installation des dépendances

```bash
npm install
```

### 2. Lancer les serveurs JSON

```bash
npx json-server --watch armes.json --port 3001 &
npx json-server --watch personnage.json --port 3002
```

Cela simulera deux API REST sur les ports 3001 et 3002.

### 3. Ouvrir l'application
Ecrire la commande

```bash
php -S localhost:8000
```
Et aller sur la page
```
http://localhost:8000
```

---

## 🗂️ Arborescence du projet

```
projet_js/
├── css/
│   └── style.css                # Style principal de l'application
│
├── images/
│   └── ...                      # Éléments graphiques (non indispensables)
│
├── js/
│   ├── main.js                  # Point d’entrée de l’application
│   └── ...                      # Autres scripts (gestion, affichage, logique)
│
├── node_modules/                # Dépendances npm
│
├── armes.json                   # Données des armes (nom, stats, type…)
├── personnage.json              # Données complètes des personnages GTA
├── changementJson.py            # Script pour modifier les fichiers JSON
├── index.html                   # Fichier HTML principal de l’interface
├── package.json                 # Déclaration des dépendances et scripts npm
├── package-lock.json            # Verrouillage des versions de dépendances
└── README.md                    # Ce fichier de documentation
```

---

## 🎯 Objectifs pédagogiques

- Maîtriser les bases de la structuration d’un projet JavaScript.
- Manipuler du JSON côté client comme côté serveur simulé.
- Découvrir les bases d’un mock server (`json-server`).
- Créer une interface dynamique avec interactions utilisateurs.

---

## ✍️ Auteur

Projet réalisé par **Noa Fonteny** et **Marin Chesneau** dans un cadre d’apprentissage.


