import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";

export default class CharacterAll {
    async render() {
        let trie = "id";
        this.characters = await CharacterProvider.fetchCharacter(trie);
        let affichagePerso = new AffichagePerso();
        let idMax = await CharacterProvider.getMaxId();
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
                            <h3 class="personnage-name">Créer personnage</h3>
                            <h4 class="personnage-importance">nouveau</h4>
                        </section>
                    </a>
        `;
        this.characters.forEach(character => {
            view += affichagePerso.render(character);
        });
        view += `</div></div>`;
        return view;
    }

    afterRender() {
        const searchBox = document.getElementById("search-box");
        const importanceFilter = document.getElementById("importance-filter");
        const cardsContainer = document.getElementById("cards-container");
        const filterSelect = document.getElementById("filter");
        let idMax = CharacterProvider.getMaxId();

        if (!searchBox || !importanceFilter || !cardsContainer || !filterSelect) return;

        const affichagePerso = new AffichagePerso();
        let trie = "id";

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
            filterCharacters();
        };

        const filterCharacters = () => {
            const searchValue = searchBox.value.toLowerCase();
            const importanceValue = importanceFilter.value.toLowerCase();
        
            const filtered = this.characters.filter(character => {
                const matchesSearch = character.name.toLowerCase().includes(searchValue);
                const matchesImportance = importanceValue === "all" || character.importance.toLowerCase() === importanceValue;
                return matchesSearch && matchesImportance;
            });
        
            let newHtml = `<link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="cards-container" class="cards-container ${filtered.length === 0 ? 'centered' : ''}">
                <a href='/#/nouveau/${idMax + 1}' class="personnage-card-link" id="personnage-card-link">
                    <section class="personnage-section" id="personnage-section">
                        <img loading="lazy" src="../../../images/autres/plus.png" alt="Creer personnage" class="personnage-img">
                        <h3 class="personnage-name">Créer personnage</h3>
                        <h4 class="personnage-importance">nouveau</h4>
                    </section>
                </a>
            `;
        
            filtered.forEach(character => {
                newHtml += affichagePerso.render(character);
            });
        
            newHtml += `</div>`;
            cardsContainer.innerHTML = newHtml;
        };
        

        searchBox.addEventListener("input", filterCharacters);
        importanceFilter.addEventListener("change", filterCharacters);
        filterSelect.addEventListener("change", updateSortOptions);

        fetchAndUpdateCharacters();
    }
}
