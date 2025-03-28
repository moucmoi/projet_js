import AffichagePerso from "./AffichagePerso.js";
import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
export default class Combat{
    async render() {
        const affichagePerso = new AffichagePerso();
        const url = Utils.parseRequestURL();
    
        const perso1 = await CharacterProvider.getCharacter(url.id);
        const perso2 = await CharacterProvider.getCharacter(url.id2);
    
        return `<link rel="stylesheet" href='../../../css/combat.css'>
            <div class="combat-container">
                <div class="combat-card-wrapper left">
                    ${affichagePerso.renderCombat(perso1)}
                </div>

                <img id="imageCombat" src="./../../images/autres/versus.png" alt="imageVS">

                <div class="combat-card-wrapper right">
                    ${affichagePerso.renderCombat(perso2)}
                </div>
            </div>
            <a href='#/combat/${url.id}/contre/${url.id2}/deroule'><button>Démarrer le combat</button></a>
            `;
    }
    
}