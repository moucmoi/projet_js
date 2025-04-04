import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "../../controllers/AffichagePerso.js";

export default class CombatPerso1{
    async render(){
        let characters = await CharacterProvider.fetchCharacter("id");
        let affichagePerso = new AffichagePerso();
        let view=`<link rel="stylesheet" href='../../../css/PersoAll.css'>

        <div id="personnage-all-container" class="personnage-all-container">
        <h2 id="personnage-title" class="personnage-title">Premier personnage</h2>`;
        characters.forEach(character => {
            view += affichagePerso.renderCombat1(character);
        });
        view+=`</div>`
        return view;
    }
}