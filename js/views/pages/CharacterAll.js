import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
import AffichagePerso from "./AffichagePerso.js";

export default class CharacterAll {
    constructor() {
        this.characters = [];
        this.idMax = 0;
        this.nbPersoPage = 24;
    }
    
    async render() {
        let request = Utils.parseRequestURL();
        let trie = "id";
        
        // Récupérer tous les personnages
        this.characters = await CharacterProvider.fetchCharacter(trie);

        if (!this.characters || this.characters.length === 0) {
            return "<p>Aucun personnage trouvé</p>";
        }

        // Pagination
        let page = parseInt(request.id) || 1;
        let startIndex = this.nbPersoPage * (page - 1);
        let endIndex = startIndex + this.nbPersoPage;
        
        // Personnages de la page actuelle
        let charactersToDisplay = this.characters.slice(startIndex, endIndex);

        // Créer l'affichage des personnages
        let affichagePerso = new AffichagePerso();
        this.idMax = await CharacterProvider.getMaxId();
        
        // Construction de la vue
        let view = `
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
                    <a href='/#/nouveau/${this.idMax + 1}' class="personnage-card-link" id="personnage-card-link">
                        <section class="personnage-section" id="personnage-section">
                            <img loading="lazy" src="../../../images/autres/plus.png" alt="Creer personnage" class="personnage-img">
                            <h3 id="personnage-name">Créer personnage</h3>
                            <h4 id="personnage-importance">nouveau</h4>
                        </section>
                    </a>
        `;
        
        // Afficher les personnages de cette page
        charactersToDisplay.forEach(character => {
            view += affichagePerso.render(character);
        });

        // Calculer le nombre total de pages
        let totalPages = Math.ceil(this.characters.length / this.nbPersoPage);
        
        // Pagination simplifiée
        view += `
            <div class="pagination">
                <ul class="pagination-list">
        `;
        
        // Bouton précédent
        if (page > 1) {
            view += `<li class="page-item"><a class="page-link" href="#/characterspagination/${page - 1}">«</a></li>`;
        }
        
        // Pages
        for (let i = 1; i <= totalPages; i++) {
            view += `
                <li class="page-item ${i === page ? 'active' : ''}">
                    <a class="page-link" href="#/characterspagination/${i}">${i}</a>
                </li>
            `;
        }
        
        // Bouton suivant
        if (page < totalPages) {
            view += `<li class="page-item"><a class="page-link" href="#/characterspagination/${page + 1}">»</a></li>`;
        }

        view += `</ul></div></div>`;
        return view;
    }

    afterRender() {
        const searchBox = document.getElementById("search-box");
        const importanceFilter = document.getElementById("importance-filter");
        const filterSelect = document.getElementById("filter");
        const cardsContainer = document.getElementById("cards-container");

        if (!searchBox || !importanceFilter || !filterSelect || !cardsContainer) return;

        const affichagePerso = new AffichagePerso();

        // Filtrage par recherche et importance
        const filterCharacters = () => {
            const searchValue = searchBox.value.toLowerCase();
            const importanceValue = importanceFilter.value.toLowerCase();
            
            const filtered = this.characters.filter(character => {
                const matchesSearch = character.name.toLowerCase().includes(searchValue);
                const matchesImportance = importanceValue === "all" || character.importance.toLowerCase() === importanceValue;
                return matchesSearch && matchesImportance;
            });

            let newHtml = `
                <a href='/#/nouveau/${this.idMax + 1}' class="personnage-card-link" id="personnage-card-link">
                    <section class="personnage-section" id="personnage-section">
                        <img loading="lazy" src="../../../images/autres/plus.png" alt="Creer personnage" class="personnage-img">
                        <h3 id="personnage-name">Créer personnage</h3>
                        <h4 id="personnage-importance">nouveau</h4>
                    </section>
                </a>
            `;
            
            filtered.forEach(character => {
                newHtml += affichagePerso.render(character);
            });
            
            cardsContainer.innerHTML = newHtml;
        };

        // Changement du tri et rechargement de la page
        const updateSortOptions = async () => {
            const selectedOption = filterSelect.value;
            window.location.hash = "#/characterspagination/1";
        };

        // Event listeners
        searchBox.addEventListener("input", filterCharacters);
        importanceFilter.addEventListener("change", filterCharacters);
        filterSelect.addEventListener("change", updateSortOptions);
    }
}