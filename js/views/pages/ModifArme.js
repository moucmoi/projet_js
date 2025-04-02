import ArmeProvider from "../../services/ArmeProvider.js";
import { modifArmeController } from "../../controllers/modifArmeController.js";
import Utils from "../../services/Utils.js";

export default class ModifArme {
    async render() {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id);

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="modification-arme" class="page-container">
                <h2>Modifier ${arme.name}</h2>

                <label for="name">Nom :</label>
                <input type="text" id="name" value="${arme.name}"/>

                <label for="force">Force :</label>
                <input type="number" id="force" value="${arme.effects.force}"/>

                <label for="agilite">Agilité :</label>
                <input type="number" id="agilite" value="${arme.effects.agilite}"/>

                <label for="intelligence">Intelligence :</label>
                <input type="number" id="intelligence" value="${arme.effects.intelligence}"/>

                <label for="endurance">Endurance :</label>
                <input type="number" id="endurance" value="${arme.effects.endurance}"/>

                <label for="image">Image (optionnel) :</label>
                <input type="file" id="image" accept="image/png" />

                <div class="page-buttons">
                    <button id="annuler" onclick="location.href = '/#/armes/${arme.id}';">Annuler</button>
                    <button id="modifArme">Modifier</button>
                </div>

                <p id="message"></p>
            </div>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let armeID = request.id;
        
        modifArmeController(armeID);
    }
}
