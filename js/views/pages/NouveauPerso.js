import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class NouveauPerso {
    async render() {

        return `
            <h2>Creer un nouveau personnage</h2>
            <label>Nom :</label>
            <input type="text" id="name" required />

            <label>Description :</label>
            <textarea id="description" required></textarea>

            <label>Importance :</label>
            <select id="importance" required>
                <option value="principale">Principale</option>
                <option value="secondaire">Secondaire</option>
                <option value="inconnu">Inconnu</option>
            </select>

            <label>Force :</label>
            <input type="number" id="force" required />

            <label>Agilité :</label>
            <input type="number" id="agilite" required />

            <label>Intelligence :</label>
            <input type="number" id="intelligence" required />

            <label>Endurance :</label>
            <input type="number" id="endurance" required />

            <button id="creerPerso">Créer</button>
            <p id="message"></p>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let id = request.id;

        document.getElementById("creerPerso").addEventListener("click", async () => {
            let name = document.getElementById("name").value.trim();
            let description = document.getElementById("description").value.trim();
            let force = document.getElementById("force").value.trim();
            let agilite = document.getElementById("agilite").value.trim();
            let intelligence = document.getElementById("intelligence").value.trim();
            let endurance = document.getElementById("endurance").value.trim();
            let importance = document.getElementById("importance").value.trim();
            let niveau = 0;
            let image = "../../../images/personnages/no_image.png"

            if (!name || !description || !force || !agilite || !intelligence || !endurance) {
                document.getElementById("message").textContent = "Tous les champs doivent être remplis.";
                return;
            }

            if (isNaN(force) || force <= 0 || isNaN(agilite) || agilite <= 0 || isNaN(intelligence) || intelligence <= 0 || isNaN(endurance) || endurance <= 0) {
                document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres positifs.";
                return;
            }

            let characterData = {
                id,
                name,
                importance,
                description,
                characteristics: {
                    force,
                    agilite,
                    intelligence,
                    endurance
                },
                evolutions: [
                    {
                        effects: {

                        }
                    }
                ],
                niveau,
                image,
                
            };

            let success = await CharacterProvider.addCharacter(characterData);

            if (success) {
                window.location.href = `/#/characters/${id}`;
            } else {
                document.getElementById("message").textContent = "Erreur lors de la création du personnage.";
            }
        });
    }
}
