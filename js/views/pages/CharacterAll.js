import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";
import {ENDPOINTC} from "../../config.js";

export default class CharacterAll {
    async render() {
        let characters = await CharacterProvider.fetchCharacter(78);
        let affichagePerso = new AffichagePerso();
        let response = await fetch(`${ENDPOINTC}`, { method: "GET" });

        let data = await response.json();
        let idMax = data.reduce((max, item) => Math.max(max, parseInt(item.id)), 0);

        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Les personnages</h2>
                <a href='/#/characters/${idMax+1}' class="personnage-card-link" id="personnage-card-link">
                    <section class="personnage-section" id="personnage-section">
                        <img src="../../../images/autres/plus.png" alt="Creer personnage" class="personnage-img" id="personnage-img">
                        <h3 class="personnage-name" id="personnage-name">Créer personnage</h3>
                        <h4 class="personnage-importance" id="personnage-importance">nouveau</h4>
                    </section>
                </a>
        `;

        characters.forEach(character => {
            view += affichagePerso.render(character);
        });

        // On ferme la div conteneur
        view += `</div>`;
        return view;
    }
}
