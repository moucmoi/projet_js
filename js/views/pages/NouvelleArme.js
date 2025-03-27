import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

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
        let request = Utils.parseRequestURL();
        let id = request.id;

        document.getElementById("creerArme").addEventListener("click", async () => {
            let name = document.getElementById("name").value.trim();
            let force = document.getElementById("force").value.trim();
            let agilite = document.getElementById("agilite").value.trim();
            let intelligence = document.getElementById("intelligence").value.trim();
            let endurance = document.getElementById("endurance").value.trim();
            let imageFile = document.getElementById("image").files[0];
            let image = "../../../images/personnages/no_image.png"

            if (name === null || force === null || agilite === null || intelligence === null || endurance === null) {
                document.getElementById("message").textContent = "Tous les champs doivent être remplis.";
                return;
            }

            if (imageFile) {
                try {
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
