import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";
import {ENDPOINTC} from "../../config.js";

export default class CharacterAll {
    async render() {
        this.characters = await CharacterProvider.fetchCharacter(100);
        let affichagePerso = new AffichagePerso();
        let idMax = await CharacterProvider.getMaxId();
        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Les personnages</h2>
                <input type="text" id="search-box" class="search-box" placeholder="Rechercher..." />
                <select id="importance-filter">
                    <option value="all">Tous</option>
                    <option value="Principal">Principaux</option>
                    <option value="Secondaire">Secondaires</option>
                    <option value="Inconnu">Inconnus</option>
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
        view += `
                </div>
            </div>
        `;
        return view;
    }

    afterRender() {
        const searchBox = document.getElementById("search-box");
        const importanceFilter = document.getElementById("importance-filter");
        const cardsContainer = document.getElementById("cards-container");
    
        if (!searchBox || !importanceFilter || !cardsContainer) return;
    
        const affichagePerso = new AffichagePerso();
    
        const filterCharacters = () => {
            const searchValue = searchBox.value.toLowerCase();
            const importanceValue = importanceFilter.value.toLowerCase();
    
            const filtered = this.characters.filter(character => {
                const matchesSearch = character.name.toLowerCase().includes(searchValue);
                const matchesImportance = importanceValue === "all" || character.importance.toLowerCase() === importanceValue;
                return matchesSearch && matchesImportance;
            });
    
            let newHtml = `<link rel="stylesheet" href='../../../css/PersoAll.css'>`;
            filtered.forEach(character => {
                newHtml += affichagePerso.render(character);
            });
    
            cardsContainer.innerHTML = newHtml;
        };
    
        searchBox.addEventListener("input", filterCharacters);
        importanceFilter.addEventListener("change", filterCharacters);
    }
    
}
