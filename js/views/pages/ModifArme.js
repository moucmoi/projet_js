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
                <input type="text" id="name" value="${arme.name}" required />

                <label for="force">Force :</label>
                <input type="number" id="force" value="${arme.effects.force}" required />

                <label for="agilite">Agilité :</label>
                <input type="number" id="agilite" value="${arme.effects.agilite}" required />

                <label for="intelligence">Intelligence :</label>
                <input type="number" id="intelligence" value="${arme.effects.intelligence}" required />

                <label for="endurance">Endurance :</label>
                <input type="number" id="endurance" value="${arme.effects.endurance}" required />

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
    
        document.getElementById("modifArme").addEventListener("click", async () => {
            let name = document.getElementById("name").value.trim();
            let force = parseInt(document.getElementById("force").value.trim());
            let agilite = parseInt(document.getElementById("agilite").value.trim());
            let intelligence = parseInt(document.getElementById("intelligence").value.trim());
            let endurance = parseInt(document.getElementById("endurance").value.trim());
    
            if (!name || !force || !agilite || !intelligence || !endurance) {
                document.getElementById("message").textContent = "Tous les champs doivent être remplis.";
                return;
            }
    
            if (isNaN(force) || force < 0 || isNaN(agilite) || agilite < 0 || isNaN(intelligence) || intelligence < 0 || isNaN(endurance) || endurance < 0) {
                document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres positifs.";
                return;
            }
    
            let armeData = {
                name,
                effects: {
                    force,
                    agilite,
                    intelligence,
                    endurance
                }
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
