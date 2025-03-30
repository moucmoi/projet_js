import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class ModifPerso {
    async render() {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);

        return `
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="modification-personnage" class="page-container">
                <h2>Modifier ${character.name}</h2>

                <label for="name">Nom :</label>
                <input type="text" id="name" value="${character.name}"/>

                <label for="description">Description :</label>
                <textarea id="description" required>${character.description}</textarea>

                <label for="force">Force :</label>
                <input type="number" id="force" value="${character.characteristics.force}"required/>

                <label for="agilite">Agilité :</label>
                <input type="number" id="agilite" value="${character.characteristics.agilite}"required/>

                <label for="intelligence">Intelligence :</label>
                <input type="number" id="intelligence" value="${character.characteristics.intelligence}"required/>

                <label for="endurance">Endurance :</label>
                <input type="number" id="endurance" value="${character.characteristics.endurance}"required/>

                <label for="image">Image (optionnel) :</label>
                <input type="file" id="image" accept="image/png" />

                <div class="page-buttons">
                <button id="annuler" onclick="location.href = '/#/characters/${character.id}';">Annuler</button>
                <button id="modifPerso">Modifier</button>
                </div>

                <p id="message"></p>
            </div>
        `;

    }

    async afterRender() {
        let request = Utils.parseRequestURL();
        let characterId = request.id;
        let character = await CharacterProvider.getCharacter(characterId);
        console.log(character.image);

        document.getElementById("modifPerso").addEventListener("click", async () => {
            let name = document.getElementById("name").value.trim();
            let description = document.getElementById("description").value.trim();
            let force = parseInt(document.getElementById("force").value.trim());
            let agilite = parseInt(document.getElementById("agilite").value.trim());
            let intelligence = parseInt(document.getElementById("intelligence").value.trim());
            let endurance = parseInt(document.getElementById("endurance").value.trim());
            let imageFile = document.getElementById("image").files[0];
            let image = character.image;

            if (name === "" || description === "") {
                document.getElementById("message").textContent = "Le nom et la description doivent être remplis.";
                return;
            }
    
            if (isNaN(force) || isNaN(agilite) || isNaN(intelligence) || isNaN(endurance)) {
                document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres valides.";
                return;
            }
    
            if (force < 0 || agilite < 0 || intelligence < 0 || endurance < 0) {
                document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres positifs.";
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

            let characterData = {
                name,
                description,
                characteristics: {
                    force,
                    agilite,
                    intelligence,
                    endurance
                },
                image
            };


            let success = await CharacterProvider.updateCharacterStats(characterId, characterData);

            if (success) {
                window.location.href = `/#/characters/${characterId}`;
            } else {
                document.getElementById("message").textContent = "Erreur de modification.";
            }
        });
    }
}
