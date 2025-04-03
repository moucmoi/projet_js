export default class paginationController {
    constructor(characters, charactersPerPage, elements, affichagePerso, idMax) {
        this.characters = characters;
        this.filteredCharacters = characters;
        this.charactersPerPage = charactersPerPage;
        this.currentPage = 1;
        this.elements = elements;
        this.affichagePerso = affichagePerso;
        this.idMax = idMax;
        
        this.initializePaginationControls();
    }
    
    initializePaginationControls() {
        if (this.elements.prevPageBtn) {
            this.elements.prevPageBtn.addEventListener("click", () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updatePagination();
                }
            });
        }
        
        if (this.elements.nextPageBtn) {
            this.elements.nextPageBtn.addEventListener("click", () => {
                const totalPages = Math.ceil(this.filteredCharacters.length / this.charactersPerPage);
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.updatePagination();
                }
            });
        }
    }
    
    updateCharacters(filteredCharacters) {
        this.filteredCharacters = filteredCharacters;
    }
    
    resetToFirstPage() {
        this.currentPage = 1;
    }
    
    updatePagination() {
        const totalPages = Math.max(1, Math.ceil(this.filteredCharacters.length / this.charactersPerPage));
        
        if (this.currentPage > totalPages) this.currentPage = totalPages;
        
        const startIndex = (this.currentPage - 1) * this.charactersPerPage;
        const endIndex = Math.min(startIndex + this.charactersPerPage, this.filteredCharacters.length);
        const pageCharacters = this.filteredCharacters.slice(startIndex, endIndex);
        
        if (this.elements.pageInfo) {
            this.elements.pageInfo.textContent = `Page ${this.currentPage} sur ${totalPages}`;
        }
        
        if (this.elements.paginationContainer) {
            this.elements.paginationContainer.style.display = totalPages <= 1 ? 'none' : 'flex';
        }
        
        if (this.elements.prevPageBtn && this.elements.nextPageBtn) {
            this.elements.prevPageBtn.style.display = this.currentPage <= 1 ? 'none' : 'inline-block';
            this.elements.nextPageBtn.style.display = this.currentPage >= totalPages ? 'none' : 'inline-block';
        }
        
        this.renderCurrentPageCharacters(pageCharacters);
    }
    
    renderCurrentPageCharacters(pageCharacters) {
        let newHtml = this.renderNewCharacterCard();
        
        pageCharacters.forEach(character => {
            newHtml += this.affichagePerso.render(character);
        });
        
        this.elements.cardsContainer.innerHTML = newHtml;
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
}