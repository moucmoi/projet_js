import { creerPersoController } from "../../controllers/nouveauPersoController.js";

export default class NouveauPerso {
  async render() {
    return `
      <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
      <div id="nouveau-perso" class="page-container">
        <h2>Créer un nouveau personnage</h2>
        
        <label for="name">Nom :</label>
        <input type="text" id="name" required />
        
        <label for="description">Description :</label>
        <textarea id="description" required></textarea>
        
        <label for="importance">Importance :</label>
        <select id="importance" required>
          <option value="principal">Principal</option>
          <option value="secondaire">Secondaire</option>
          <option value="inconnu">Inconnu</option>
        </select>
        
        <label for="force">Force :</label>
        <input type="number" id="force" required />
        
        <label for="agilite">Agilité :</label>
        <input type="number" id="agilite" required />
        
        <label for="intelligence">Intelligence :</label>
        <input type="number" id="intelligence" required />
        
        <label for="endurance">Endurance :</label>
        <input type="number" id="endurance" required />
        
        <label for="image">Image (optionnel) :</label>
        <input type="file" id="image" accept="image/png" />
        
        <div class="page-buttons">
          <button id="creerPerso">Créer</button>
        </div>
        
        <p id="message"></p>
      </div>
    `;
  }

  async afterRender() {
    creerPersoController();
  }
}
