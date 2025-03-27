import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";
export default class CombatPerso1{
    async render(){
        this.characters = await CharacterProvider.fetchCharacter(100);
        let affichagePerso = new AffichagePerso();
        let view=`<link rel="stylesheet" href='../../../css/PersoAll.css'>

        <div id="personnage-all-container" class="personnage-all-container">
        <h2 id="personnage-title" class="personnage-title">Quel est le premier personnage que vous voulez faire combattre ?</h2>`;
        this.characters.forEach(character => {
            view += affichagePerso.renderCombat1(character);
        });
        view+=`</div>`
        return view;
    }
}