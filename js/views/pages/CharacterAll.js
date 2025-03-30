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
        
        if (request.resource === 'filter' && request.id) {
            trie = request.id;
        }
        
        this.characters = await CharacterProvider.fetchCharacter(trie);

        if (!this.characters || this.characters.length === 0) {
            return "<p>Aucun personnage trouvé</p>";
        }

        let page = parseInt(request.id) || 1;
        if (request.resource === 'filter') {
            page = 1;
        }
        
        let startIndex = this.nbPersoPage * (page - 1);
        let endIndex = startIndex + this.nbPersoPage;
        
        let charactersToDisplay = this.characters.slice(startIndex, endIndex);

        let affichagePerso = new AffichagePerso();
        this.idMax = await CharacterProvider.getMaxId();
        
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
                    <option value="id" ${trie === "id" ? "selected" : ""}>Trier Par (ID par défaut)</option>
                    <option value="name_asc" ${trie === "name_asc" ? "selected" : ""}>Nom (A-Z)</option>
                    <option value="name_desc" ${trie === "name_desc" ? "selected" : ""}>Nom (Z-A)</option>
                    <option value="characteristics.force" ${trie === "characteristics.force" ? "selected" : ""}>Force</option>
                    <option value="characteristics.endurance" ${trie === "characteristics.endurance" ? "selected" : ""}>Endurance</option>
                    <option value="characteristics.agilite" ${trie === "characteristics.agilite" ? "selected" : ""}>Agilité</option>
                    <option value="characteristics.intelligence" ${trie === "characteristics.intelligence" ? "selected" : ""}>Intelligence</option>
                    <option value="niveau" ${trie === "niveau" ? "selected" : ""}>Niveau</option>
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
        
        charactersToDisplay.forEach(character => {
            view += affichagePerso.render(character);
        });

        let totalPages = Math.ceil(this.characters.length / this.nbPersoPage);
        
        view += `
            <div class="pagination">
                <ul class="pagination-list">
        `;
        
        let paginationBase = request.resource === 'filter' ? 
            `#/characterspagination` : 
            `#/characterspagination`;
        
        if (page > 1) {
            view += `<li class="page-item"><a class="page-link" href="${paginationBase}/${page - 1}">«</a></li>`;
        }
        
        for (let i = 1; i <= totalPages; i++) {
            view += `
                <li class="page-item ${i === page ? 'active' : ''}">
                    <a class="page-link" href="${paginationBase}/${i}">${i}</a>
                </li>
            `;
        }
        
        if (page < totalPages) {
            view += `<li class="page-item"><a class="page-link" href="${paginationBase}/${page + 1}">»</a></li>`;
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

        const updateSortOptions = () => {
            const selectedOption = filterSelect.value;
            window.location.hash = `#/characterspagination/1?filter=${selectedOption}`;
            this.characters = CharacterProvider.fetchCharacter(selectedOption)
                .then(data => {
                    this.characters = data;
                    window.location.reload();
                });
        };

        searchBox.addEventListener("input", filterCharacters);
        importanceFilter.addEventListener("change", filterCharacters);
        filterSelect.addEventListener("change", updateSortOptions);
    }
}