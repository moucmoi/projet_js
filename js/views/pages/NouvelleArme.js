import { creerArmeController } from "../../controllers/nouvelleArmeController.js";

export default class NouvelleArme {
    async render() {
        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="nouvelle-arme" class="page-container">
                <h2>Créer une nouvelle arme</h2>
                
                <label for="name">Nom :</label>
                <input type="text" id="name" required />
                
                <label for="force">Bonus de Force :</label>
                <input type="number" id="force" required />
                
                <label for="agilite">Bonus d'Agilité :</label>
                <input type="number" id="agilite" required />
                
                <label for="intelligence">Bonus d'Intelligence :</label>
                <input type="number" id="intelligence" required />
                
                <label for="endurance">Bonus d'Endurance :</label>
                <input type="number" id="endurance" required />

                <label for="image">Image (optionnel) :</label>
                <input type="file" id="image" accept="image/png" />
                
                <div class="page-buttons">
                    <button id="creerArme">Créer</button>
                </div>
                
                <p id="message"></p>
            </div>
        `;
    }

    async afterRender() {
        creerArmeController();
    }
}
