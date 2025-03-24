import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

export default class NouvelleArme {
    async render() {

        return `
            <h2>Creer une nouvelle arme</h2>
            <label>Nom :</label>
            <input type="text" id="name" required />

            <label>bonus de Force :</label>
            <input type="number" id="force" required />

            <label>bonus d'Agilité :</label>
            <input type="number" id="agilite" required />

            <label>bonus d'Intelligence :</label>
            <input type="number" id="intelligence" required />

            <label>bonus d'Endurance :</label>
            <input type="number" id="endurance" required />

            <button id="creerArme">Créer</button>
            <p id="message"></p>
        `;
    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let id = request.id;

        document.getElementById("creerArme").addEventListener("click", async () => {
            let name = document.getElementById("name").value.trim();
            let force = document.getElementById("force").value.trim();
            let agilite = document.getElementById("agilite").value.trim();
            let intelligence = document.getElementById("intelligence").value.trim();
            let endurance = document.getElementById("endurance").value.trim();
            let image = "../../../images/personnages/no_image.png"

            if (!name || !force || !agilite || !intelligence || !endurance) {
                document.getElementById("message").textContent = "Tous les champs doivent être remplis.";
                return;
            }

            if (isNaN(force) || force <= 0 || isNaN(agilite) || agilite <= 0 || isNaN(intelligence) || intelligence <= 0 || isNaN(endurance) || endurance <= 0) {
                document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres positifs.";
                return;
            }

            let armeData = {
                id,
                name,
                effects: {
                    force,
                    agilite,
                    intelligence,
                    endurance
                },
                image,
            };

            let success = await ArmeProvider.addArme(armeData);

            if (success) {
                window.location.href = `/#/armes/${id}`;
            } else {
                document.getElementById("message").textContent = "Erreur lors de la création de l'arme.";
            }
        });
    }
}
