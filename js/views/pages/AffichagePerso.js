export default class AffichagePerso {
    render(character) {
        return `
            <link rel="stylesheet" href='../../../css/PersonnageMenu.css'>

            <a href='/#/characters/${character.id}' class="personnage-card-link" id="personnage-card-link">
                <section class="personnage-section" id="personnage-section">
                    <img src="${character.image}" alt="${character.name}" class="personnage-img" id="personnage-img">
                    <h3 class="personnage-name" id="personnage-name">${character.name}</h3>
                    <h4 class="personnage-importance" id="personnage-importance">${character.importance}</h4>
                </section>
            </a>
        `;
    }
}
