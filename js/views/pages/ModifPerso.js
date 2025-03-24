import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class ModifPerso {
    async render() {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);

        return `
            <h2>Modifier ${character.name}</h2>
            <label>Nom :</label>
            <input type="text" id="name" value="${character.name}" required />

            <label>Description :</label>
            <textarea id="description" required>${character.description}</textarea>

            <label>Force :</label>
            <input type="number" id="force" value="${character.characteristics.force}" required />

            <label>Agilité :</label>
            <input type="number" id="agilite" value="${character.characteristics.agilite}" required />

            <label>Intelligence :</label>
            <input type="number" id="intelligence" value="${character.characteristics.intelligence}" required />

            <label>Endurance :</label>
            <input type="number" id="endurance" value="${character.characteristics.endurance}" required />

            <button id="annuler" onclick="location.href = '/#/characters/${character.id}';">Annuler</button>
            <button id="modifPerso">Modifier</button>
            <p id="message"></p>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let characterId = request.id;

        document.getElementById("modifPerso").addEventListener("click", async () => {
            let name = document.getElementById("name").value.trim();
            let description = document.getElementById("description").value.trim();
            let force = document.getElementById("force").value.trim();
            let agilite = document.getElementById("agilite").value.trim();
            let intelligence = document.getElementById("intelligence").value.trim();
            let endurance = document.getElementById("endurance").value.trim();

            if (!name || !description || !force || !agilite || !intelligence || !endurance) {
                document.getElementById("message").textContent = "Tous les champs doivent être remplis.";
                return;
            }

            if (isNaN(force) || force < 0 || isNaN(agilite) || agilite < 0 || isNaN(intelligence) || intelligence < 0 || isNaN(endurance) || endurance < 0) {
                document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres positifs.";
                return;
            }

            let characterData = {
                name,
                description,
                characteristics: {
                    force,
                    agilite,
                    intelligence,
                    endurance
                }
            };

            let success = await CharacterProvider.updateCharacter(characterId, characterData);

            if (success) {
                window.location.href = `/#/characters/${characterId}`;
            } else {
                document.getElementById("message").textContent = "Erreur de modification.";
            }
        });
    }
}
