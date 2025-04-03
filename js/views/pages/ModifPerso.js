import { modifPersoController } from "../../controllers/modifPersoController.js";
import Utils from "../../services/Utils.js";
import CharacterProvider from "../../services/CharacterProvider.js";

export default class ModifPerso {
    async render() {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="modification-personnage" class="page-container">
                <h2>Modifier ${character.name}</h2>

                <label for="name">Nom :</label>
                <input type="text" id="name" value="${character.name}"/>

                <label for="description">Description :</label>
                <textarea id="description" required>${character.description}</textarea>

                <label for="force">Force :</label>
                <input type="number" id="force" value="${character.characteristics.force}" required/>

                <label for="agilite">Agilité :</label>
                <input type="number" id="agilite" value="${character.characteristics.agilite}" required/>

                <label for="intelligence">Intelligence :</label>
                <input type="number" id="intelligence" value="${character.characteristics.intelligence}" required/>

                <label for="endurance">Endurance :</label>
                <input type="number" id="endurance" value="${character.characteristics.endurance}" required/>

                <label for="image">Image (optionnel) :</label>
                <input type="file" id="image" accept="image/png" />

                <div class="page-buttons">
                    <button id="annuler" onclick="location.href = '/#/characters/${character.id}';">Annuler</button>
                    <button id="modifPerso">Modifier</button>
                </div>

                <p id="message"></p>
            </div>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let characterId = request.id;
        
        modifPersoController(characterId);
    }
}
