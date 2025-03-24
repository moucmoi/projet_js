import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

export default class SuppressionArme {
    async render() {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id);

        return `
        <h2>Etes vous sur de vouloir supprimer ${arme.name}</h2>
        <button id="annuler" onclick="location.href = '/#/armes/${arme.id}';">Annuler</button>
        <button id="confirmer">Oui</button>
        `
    }

    async afterRender() {
    let request = Utils.parseRequestURL();
    let armeId = request.id;

    document.getElementById("confirmer").addEventListener("click", async () => {
        let success = await ArmeProvider.deleteArme(armeId);

        if (success) {
            window.location.href = `/#/armes`;
        } else {
            document.getElementById("message").textContent = "Erreur lors de la suppression.";
        }
    });
    }
}