import CharacterProvider from "../services/CharacterProvider.js";

export default class filtreController {
    constructor(characters, elements, paginationManager) {
        this.characters = characters;
        this.elements = elements;
        this.paginationManager = paginationManager;
        this.trie = "id";
    }

    initializeEventListeners() {
        this.elements.searchBox.addEventListener("input", () => this.filterCharacters());
        this.elements.importanceFilter.addEventListener("change", () => this.filterCharacters());
        this.elements.filterSelect.addEventListener("change", () => this.updateSortOptions());
        
        this.fetchAndUpdateCharacters();
    }

    async fetchAndUpdateCharacters() {
        this.characters = await CharacterProvider.fetchCharacter(this.trie);
        this.sortCharacters();
        this.filterCharacters();
    }

    sortCharacters() {
        if (this.trie === "name_desc") {
            this.characters.sort((a, b) => b.name.localeCompare(a.name));
        } else if (this.trie === "name_asc") {
            this.characters.sort((a, b) => a.name.localeCompare(b.name));
        } else if (this.trie.startsWith("characteristics.")) {
            const key = this.trie.split(".")[1];
            this.characters.sort((a, b) => (b.characteristics[key] || 0) - (a.characteristics[key] || 0));
        } else if (this.trie === "id") {
            this.characters.sort((a, b) => (a.id || 0) - (b.id || 0));
        } else if (this.trie === "niveau") {
            this.characters.sort((a, b) => (b.niveau || 0) - (a.niveau || 0));
        }
    }

    updateSortOptions() {
        this.trie = this.elements.filterSelect.value;
        this.fetchAndUpdateCharacters();
    }

    filterCharacters() {
        const searchValue = this.elements.searchBox.value.toLowerCase();
        const importanceValue = this.elements.importanceFilter.value.toLowerCase();
    
        const filteredCharacters = this.characters.filter(character => {
            const matchesSearch = character.name.toLowerCase().includes(searchValue);
            const matchesImportance = importanceValue === "all" || character.importance.toLowerCase() === importanceValue;
            return matchesSearch && matchesImportance;
        });
        
        this.paginationManager.updateCharacters(filteredCharacters);
        this.paginationManager.resetToFirstPage();
        this.paginationManager.updatePagination();
    }
}