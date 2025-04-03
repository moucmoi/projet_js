import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

export default class SuppressionArme {
    async render() {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id);

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="suppression-arme" class="page-container">
                <h2>Êtes-vous sûr de vouloir supprimer <span class="highlight">${arme.name}</span> ?</h2>
                <div class="confirm-buttons">
                <button id="annuler-suppression-arme" onclick="location.href = '/#/armes/${arme.id}';">Annuler</button>
                <button id="confirmer-suppression-arme">Oui</button>
                </div>
                <p id="message"></p>
            </div>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let armeId = request.id;

        document.getElementById("confirmer-suppression-arme").addEventListener("click", async () => {
            let success = await ArmeProvider.deleteArme(armeId);

            if (success) {
                window.location.href = `/#/armes`;
            } else {
                document.getElementById("message").textContent = "Erreur lors de la suppression.";
            }
        });
    }
}
