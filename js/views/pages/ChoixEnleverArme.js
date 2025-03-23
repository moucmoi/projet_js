import AffichageArme from "./AffichageArme.js";
import ArmeProvider from "../../services/ArmeProvider.js";
import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
export default class ChoixEnleverArme{
    async render(){
        let request = Utils.parseRequestURL();
        let character=await CharacterProvider.getCharacter(request.id);
        let armes=await ArmeProvider.getNom(character.armes_ids);
        let affichageArme=new AffichageArme();
        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Quel arme voulez vous supprimer ?</h2>
        `;
        armes.forEach(arme => {
            view += affichageArme.renderSupp(arme);
        });
        return view;
    }
}