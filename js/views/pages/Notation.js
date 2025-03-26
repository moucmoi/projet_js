import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class Notation {
    async render() {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="notation-personnage" class="page-container">
                <h2>Noter ${character.name}</h2>
                <label for="ratingSelect">Attribuez une note de 1 à 5</label>
                <select id="ratingSelect">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <div class="page-buttons">
                    <button id="saveRating">Enregistrer</button>
                </div>

                <p id="ratingMessage"></p>
            </div>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let characterId = request.id;

        document.getElementById("saveRating").addEventListener("click", async () => {
            let rating = parseInt( document.getElementById("ratingSelect").value);

            let success = await CharacterProvider.rateCharacter(characterId, rating);

            if (success) {
                window.location.href = `/#/characters/${characterId}`;
            } else {
                document.getElementById("ratingMessage").textContent = "Erreur lors de l'enregistrement.";
            }
        });
    }
}
