import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";

export default class CharacterAll {
    async render() {
        let characters = await CharacterProvider.fetchCharacter(78);
        let affichagePerso = new AffichagePerso();

        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Les personnages</h2>
        `;

        characters.forEach(character => {
            view += affichagePerso.render(character);
        });

        // On ferme la div conteneur
        view += `</div>`;
        return view;
    }
}
