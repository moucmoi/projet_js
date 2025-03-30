import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
import AffichagePerso from "./AffichagePerso.js";
export default class CombatPerso2{
    async render(){
        let Allcharacters = await CharacterProvider.fetchCharacter("id", "asc");
        let id = Utils.parseRequestURL().id; 
        let characters = Allcharacters.filter(charac => {
            return !id.includes(parseInt(charac.id));
        });
        let affichagePerso = new AffichagePerso();
        let view = `<link rel="stylesheet" href='../../../css/PersoAll.css'>
        <div id="personnage-all-container" class="personnage-all-container">
        <h2 id="personnage-title" class="personnage-title">Quel est le deuxième personnage que vous voulez faire combattre ?</h2>`;
        
        characters.forEach(character => {
            view += affichagePerso.renderCombat2(character);
        });
        
        view += `</div>`;
        return view;
    }
    
}