import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class Notation {
    async render() {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);
        let username = localStorage.getItem("username");

        let userRating = character.ratings?.[username] || 0;

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="notation-personnage" class="page-container">
                <h2>Noter ${character.name}</h2>
                <label for="ratingSelect">Attribuez une note de 1 à 5</label>
                <select id="ratingSelect">
                <option value="1" ${userRating == 1 ? "selected" : ""}>1</option>
                <option value="2" ${userRating == 2 ? "selected" : ""}>2</option>
                <option value="3" ${userRating == 3 ? "selected" : ""}>3</option>
                <option value="4" ${userRating == 4 ? "selected" : ""}>4</option>
                <option value="5" ${userRating == 5 ? "selected" : ""}>5</option>
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
        let username = localStorage.getItem("username");

        document.getElementById("saveRating").addEventListener("click", async () => {
            let rating = document.getElementById("ratingSelect").value;

            let success = await CharacterProvider.rateCharacter(characterId, username, rating);

            if (success) {
                window.location.href = `/#/characters/${characterId}`;
            } else {
                document.getElementById("ratingMessage").textContent = "Erreur lors de l'enregistrement.";
            }
        });
    }
}