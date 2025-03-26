import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class SuppressionPerso {
    async render() {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="suppression-perso" class="page-container">
                <h2>Êtes-vous sûr de vouloir supprimer <span class="highlight">${character.name}</span> ?</h2>
                <div class="confirm-buttons">
                    <button id="annuler-suppression-perso" onclick="location.href = '/#/characters/${character.id}';">Annuler</button>
                    <button id="confirmer-suppression-perso">Oui</button>
                </div>
                <p id="message"></p>
            </div>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let characterId = request.id;

        document.getElementById("confirmer-suppression-perso").addEventListener("click", async () => {
            let success = await CharacterProvider.deleteCharacter(characterId);

            if (success) {
                window.location.href = `/#/characters`;
            } else {
                document.getElementById("message").textContent = "Erreur lors de la suppression.";
            }
        });
    }
}
