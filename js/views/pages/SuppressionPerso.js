import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class NouveauPerso {
    async render() {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);

        return `
        <h2>Etes vous sur de vouloir supprmier ${character.name}</h2>
        <button id="annuler" href="/#/characters">Annuler</button>
        <button id="confirmer">Oui</button>
        `
    }

    async afterRender() {
    let request = Utils.parseRequestURL();
    let characterId = request.id;

    document.getElementById("confirmer").addEventListener("click", async () => {
        let success = await CharacterProvider.deleteCharacter(characterId);

        if (success) {
            window.location.href = `/#/characters`;
        } else {
            document.getElementById("message").textContent = "Erreur lors de la suppression.";
        }
    });
    }
}