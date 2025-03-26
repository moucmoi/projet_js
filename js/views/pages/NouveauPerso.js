import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

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
        <input type="file" id="image" accept="image/*" />
        
        <div class="page-buttons">
          <button id="creerPerso">Créer</button>
        </div>
        
        <p id="message"></p>
      </div>
  `;

  }

  async afterRender() {
    let request = Utils.parseRequestURL();
    let id = request.id;

    document
      .getElementById("creerPerso")
      .addEventListener("click", async () => {
        let name = document.getElementById("name").value.trim();
        let description = document.getElementById("description").value.trim();
        let force = document.getElementById("force").value.trim();
        let agilite = document.getElementById("agilite").value.trim();
        let intelligence = document.getElementById("intelligence").value.trim();
        let endurance = document.getElementById("endurance").value.trim();
        let importance = document.getElementById("importance").value.trim();
        let imageFile = document.getElementById("image").files[0];
        let niveau = 0;
        let image = "../../../images/personnages/no_image.png";

        // Validate required fields
        if (
          !name ||
          !description ||
          !force ||
          !agilite ||
          !intelligence ||
          !endurance
        ) {
          document.getElementById("message").textContent =
            "Tous les champs doivent être remplis.";
          return;
        }

        // Validate numeric characteristics
        if (
          isNaN(force) ||
          force <= 0 ||
          isNaN(agilite) ||
          agilite <= 0 ||
          isNaN(intelligence) ||
          intelligence <= 0 ||
          isNaN(endurance) ||
          endurance <= 0
        ) {
          document.getElementById("message").textContent =
            "Les caractéristiques doivent être des nombres positifs.";
          return;
        }

        // Handle image upload if provided
        if (imageFile) {
          try {
            // Create a FileReader to convert image to base64
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);

            await new Promise((resolve) => {
              reader.onload = () => {
                image = reader.result;
                resolve();
              };
            });
          } catch (error) {
            document.getElementById("message").textContent =
              "Erreur lors du chargement de l'image.";
            return;
          }
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
            endurance,
          },
          evolutions: [
            {
              effects: {},
            },
          ],
          niveau,
          image,
        };

        let success = await CharacterProvider.addCharacter(characterData);

        if (success) {
          window.location.href = `/#/characters/${id}`;
        } else {
          document.getElementById("message").textContent =
            "Erreur lors de la création du personnage.";
        }
      });
  }
}