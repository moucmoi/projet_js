import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

export default class ModifArme {
    async render() {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id);

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="modification-arme" class="page-container">
                <h2>Modifier ${arme.name}</h2>

                <label for="name">Nom :</label>
                <input type="text" id="name" value="${arme.name}"/>

                <label for="force">Force :</label>
                <input type="number" id="force" value="${arme.effects.force}"/>

                <label for="agilite">Agilité :</label>
                <input type="number" id="agilite" value="${arme.effects.agilite}"/>

                <label for="intelligence">Intelligence :</label>
                <input type="number" id="intelligence" value="${arme.effects.intelligence}"/>

                <label for="endurance">Endurance :</label>
                <input type="number" id="endurance" value="${arme.effects.endurance}"/>

                <label for="image">Image (optionnel) :</label>
                <input type="file" id="image" accept="image/png" />

                <div class="page-buttons">
                <button id="annuler" onclick="location.href = '/#/armes/${arme.id}';">Annuler</button>
                <button id="modifArme">Modifier</button>
                </div>

                <p id="message"></p>
            </div>
        `;

    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let armeID = request.id;
        let arme = await ArmeProvider.getArme(armeID);
    
        document.getElementById("modifArme").addEventListener("click", async () => {
            let name = document.getElementById("name").value.trim();
            let force = parseInt(document.getElementById("force").value.trim());
            let agilite = parseInt(document.getElementById("agilite").value.trim());
            let intelligence = parseInt(document.getElementById("intelligence").value.trim());
            let endurance = parseInt(document.getElementById("endurance").value.trim());
            let imageFile = document.getElementById("image").files[0];
            let image = arme.image;
    
            if (name === "") {
              document.getElementById("message").textContent = "Le nom doit être rempli.";
              return;
            }
        
            if (!Number.isFinite(force) || !Number.isFinite(agilite) || !Number.isFinite(intelligence) || !Number.isFinite(endurance)) {
                document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres valides.";
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
                name,
                effects: {
                    force,
                    agilite,
                    intelligence,
                    endurance
                },
                image
            };
    
            let success = await ArmeProvider.updateArme(armeID, armeData);
    
            if (success) {
                window.location.assign(`/#/armes/${armeID}`);
            } else {
                document.getElementById("message").textContent = "Erreur de modification.";
            }
        });
    }
}
