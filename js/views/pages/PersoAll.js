import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "../../controllers/AffichagePerso.js";
import paginationController from "../../controllers/paginationController.js";
import filtreController from "../../controllers/filtreController.js";

export default class PersoAll {
    constructor() {
        this.charactersPerPage = 12;
        this.currentPage = 1;
        this.characters = [];
        this.idMax = 0;
        this.affichagePerso = new AffichagePerso();
        this.paginationController = null;
        this.filtreController = null;
    }

    async render() {
        let trie = "id";
        this.characters = await CharacterProvider.fetchCharacter(trie);
        this.idMax = await CharacterProvider.getMaxId();
        
        return `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Les personnages</h2>
                <input type="text" id="search-box" class="search-box" placeholder="Rechercher un personnage" />
                
                <select id="importance-filter">
                    <option value="all">Tous</option>
                    <option value="Principal">Principaux</option>
                    <option value="Secondaire">Secondaires</option>
                    <option value="Inconnu">Inconnus</option>
                </select>

                <select id="filter">
                    <option value="id">Trier Par (ID par défaut)</option>
                    <option value="name_asc">Nom (A-Z)</option>
                    <option value="name_desc">Nom (Z-A)</option>
                    <option value="characteristics.force">Force</option>
                    <option value="characteristics.endurance">Endurance</option>
                    <option value="characteristics.agilite">Agilité</option>
                    <option value="characteristics.intelligence">Intelligence</option>
                    <option value="niveau">Niveau</option>
                </select>

                <div id="cards-container" class="cards-container">
                    ${this.renderNewCharacterCard()}
                    ${this.renderInitialCharacters()}
                </div>
                <div class="pagination-container" id="pagination-container">
                    <button id="prev-page" class="pagination-btn">Précédent</button>
                    <span id="page-info" class="page-info">Page 1 sur ${Math.ceil(this.characters.length / this.charactersPerPage)}</span>
                    <button id="next-page" class="pagination-btn">Suivant</button>
                </div>
            </div>`;
    }

    renderNewCharacterCard() {
        return `
            <a href='/#/nouveau/${this.idMax + 1}' class="personnage-card-link" id="personnage-card-link">
                <section class="personnage-section" id="personnage-section">
                    <img loading="lazy" src="../../../images/autres/plus.png" alt="Creer personnage" class="personnage-img">
                    <h3 id="personnage-name" class="personnage-name">Créer personnage</h3>
                    <h4 id="personnage-importance" class="personnage-importance">nouveau</h4>
                </section>
            </a>
        `;
    }

    renderInitialCharacters() {
        const startIndex = 0;
        const endIndex = Math.min(this.charactersPerPage, this.characters.length);
        let charactersHtml = '';
        
        for (let i = startIndex; i < endIndex; i++) {
            charactersHtml += this.affichagePerso.render(this.characters[i]);
        }
        
        return charactersHtml;
    }

    afterRender() {
        const elements = {
            searchBox: document.getElementById("search-box"),
            importanceFilter: document.getElementById("importance-filter"),
            cardsContainer: document.getElementById("cards-container"),
            filterSelect: document.getElementById("filter"),
            prevPageBtn: document.getElementById("prev-page"),
            nextPageBtn: document.getElementById("next-page"),
            pageInfo: document.getElementById("page-info"),
            paginationContainer: document.getElementById("pagination-container")
        };
        
        if (!elements.searchBox || !elements.importanceFilter || !elements.cardsContainer || !elements.filterSelect) return;
        
        this.paginationController = new paginationController(
            this.characters,
            this.charactersPerPage,
            elements,
            this.affichagePerso,
            this.idMax
        );
        
        this.filtreController = new filtreController(
            this.characters,
            elements,
            this.paginationController
        );
        
        this.filtreController.initializeEventListeners();
    }
}