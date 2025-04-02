import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";

export default class PersoAll {
    constructor() {
        this.charactersPerPage = 12;
        this.currentPage = 1;
    }

    async render() {
        let trie = "id";
        this.characters = await CharacterProvider.fetchCharacter(trie);
        let affichagePerso = new AffichagePerso();
        let idMax = await CharacterProvider.getMaxId();
        this.idMax = idMax;
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
                    <a href='/#/nouveau/${idMax + 1}' class="personnage-card-link" id="personnage-card-link">
                        <section class="personnage-section" id="personnage-section">
                            <img loading="lazy" src="../../../images/autres/plus.png" alt="Creer personnage" class="personnage-img">
                            <h3 id="personnage-name"class="personnage-name">Créer personnage</h3>
                            <h4 id="personnage-importance" class="personnage-importance">nouveau</h4>
                        </section>
                    </a>
        `;

        const startIndex = 0;
        const endIndex = Math.min(this.charactersPerPage, this.characters.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            view += affichagePerso.render(this.characters[i]);
        }
        
        view += `</div>
                <div class="pagination-container" id="pagination-container">
                    <button id="prev-page" class="pagination-btn">Précédent</button>
                    <span id="page-info" class="page-info">Page 1 sur ${Math.ceil(this.characters.length / this.charactersPerPage)}</span>
                    <button id="next-page" class="pagination-btn">Suivant</button>
                </div>
                </div>`;
        return view;
    }

    afterRender() {
        const searchBox = document.getElementById("search-box");
        const importanceFilter = document.getElementById("importance-filter");
        const cardsContainer = document.getElementById("cards-container");
        const filterSelect = document.getElementById("filter");
        const prevPageBtn = document.getElementById("prev-page");
        const nextPageBtn = document.getElementById("next-page");
        const pageInfo = document.getElementById("page-info");
        const paginationContainer = document.getElementById("pagination-container");
        let idMax = this.idMax;

        if (!searchBox || !importanceFilter || !cardsContainer || !filterSelect) return;

        const affichagePerso = new AffichagePerso();
        let trie = "id";
        let filteredCharacters = [];

        const updateSortOptions = () => {
            const selectedOption = filterSelect.value;
            trie = selectedOption;
            fetchAndUpdateCharacters();
        };

        const fetchAndUpdateCharacters = async () => {
            this.characters = await CharacterProvider.fetchCharacter(trie);
            if (trie === "name_desc") {
                this.characters.sort((a, b) => b.name.localeCompare(a.name));
            } else if (trie === "name_asc") {
                this.characters.sort((a, b) => a.name.localeCompare(b.name));
            } else if (trie.startsWith("characteristics.")) {
                const key = trie.split(".")[1];
                this.characters.sort((a, b) => (b.characteristics[key] || 0) - (a.characteristics[key] || 0));
            } else if (trie === "id") {
                this.characters.sort((a, b) => (a.id || 0) - (b.id || 0));
            } else if (trie === "niveau") {
                this.characters.sort((a, b) => (b.niveau || 0) - (a.niveau || 0));
            }
            this.currentPage = 1;
            filterCharacters();
        };

        const filterCharacters = () => {
            const searchValue = searchBox.value.toLowerCase();
            const importanceValue = importanceFilter.value.toLowerCase();
        
            filteredCharacters = this.characters.filter(character => {
                const matchesSearch = character.name.toLowerCase().includes(searchValue);
                const matchesImportance = importanceValue === "all" || character.importance.toLowerCase() === importanceValue;
                return matchesSearch && matchesImportance;
            });
            
            this.updatePagination();
        };
        
        this.updatePagination = () => {
            const totalPages = Math.max(1, Math.ceil(filteredCharacters.length / this.charactersPerPage));
            
            // Make sure current page is within valid range
            if (this.currentPage > totalPages) this.currentPage = totalPages;
            
            const startIndex = (this.currentPage - 1) * this.charactersPerPage;
            const endIndex = Math.min(startIndex + this.charactersPerPage, filteredCharacters.length);
            const pageCharacters = filteredCharacters.slice(startIndex, endIndex);
            
            // Update page info
            if (pageInfo) {
                pageInfo.textContent = `Page ${this.currentPage} sur ${totalPages}`;
            }
            
            // Hide pagination if only one page
            if (paginationContainer) {
                if (totalPages <= 1) {
                    paginationContainer.style.display = 'none';
                } else {
                    paginationContainer.style.display = 'flex';
                }
            }
            
            // Handle pagination buttons
            if (prevPageBtn && nextPageBtn) {
                // Hide Previous button on first page
                if (this.currentPage <= 1) {
                    prevPageBtn.style.display = 'none';
                } else {
                    prevPageBtn.style.display = 'inline-block';
                }
                
                // Hide Next button on last page
                if (this.currentPage >= totalPages) {
                    nextPageBtn.style.display = 'none';
                } else {
                    nextPageBtn.style.display = 'inline-block';
                }
            }
            
            // Render characters for current page
            let newHtml = `
                <a href='/#/nouveau/${idMax + 1}' class="personnage-card-link" id="personnage-card-link">
                    <section class="personnage-section" id="personnage-section">
                        <img loading="lazy" src="../../../images/autres/plus.png" alt="Creer personnage" class="personnage-img">
                        <h3 id="personnage-name"class="personnage-name">Créer personnage</h3>
                        <h4 id="personnage-importance" class="personnage-importance">nouveau</h4>
                    </section>
                </a>
            `;
            
            pageCharacters.forEach(character => {
                newHtml += affichagePerso.render(character);
            });
            
            cardsContainer.innerHTML = newHtml;
        };
        
        if (prevPageBtn) {
            prevPageBtn.addEventListener("click", () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updatePagination();
                }
            });
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener("click", () => {
                const totalPages = Math.ceil(filteredCharacters.length / this.charactersPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.updatePagination();
                }
            });
        }

        searchBox.addEventListener("input", filterCharacters);
        importanceFilter.addEventListener("change", filterCharacters);
        filterSelect.addEventListener("change", updateSortOptions);

        fetchAndUpdateCharacters();
    }
}