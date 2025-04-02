import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
import AffichagePerso from "../../controllers/AffichagePerso.js";

export default class CombatPerso2{
    async render(){
        let Allcharacters = await CharacterProvider.fetchCharacter("id");
        let id = Utils.parseRequestURL().id; 
        let characters = Allcharacters.filter(charac => {
            return !id.includes(parseInt(charac.id));
        });
        let affichagePerso = new AffichagePerso();
        let view = `<link rel="stylesheet" href='../../../css/PersoAll.css'>
        <div class="top-left-button">
            <a href="/#/combat"><button>Retour</button></a>
        </div>


        <div id="personnage-all-container" class="personnage-all-container">
        <h2 id="personnage-title" class="personnage-title">Deuxième personnage</h2>`;
        
        characters.forEach(character => {
            view += affichagePerso.renderCombat2(character);
        });
        
        view += `</div>`;
        return view;
    }
}