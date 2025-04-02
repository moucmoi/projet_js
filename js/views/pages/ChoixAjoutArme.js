import AffichageArme from "./AffichageArme.js";
import ArmeProvider from "../../services/ArmeProvider.js";
import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class ChoixAjoutArme {
    async render() {

        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);
        const touteslesarmes = await ArmeProvider.fetchArme();
        let armesSansDoublons = touteslesarmes.filter(arme => {
            return !character.armes_ids.includes(parseInt(arme.id));
        });

        let armes = await ArmeProvider.getNom(
            armesSansDoublons.map(arme => arme.id)
        );

        let affichageArme = new AffichageArme();
        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Quel arme voulez vous ajouter ?</h2>
        `;
        armes.forEach(arme => {
            view += affichageArme.renderAdd(arme);
        });
        return view;
    }
}