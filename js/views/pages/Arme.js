import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

export default class Arme {
    async render() {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id);
        
        let view = `
            <link href="./../../../css/Unearme.css" rel="stylesheet" />

            <div class="arme-buttons">
                <a href="http://localhost:8000/#/armes"><button>Retour</button></a>
            </div>

            <div id="arme-container">
                <div>
                    <img loading="lazy" src="${arme.image}" alt="${arme.name}" id="img-arme">
                </div>

                <div id="arme-details">
                

                    <h2 id="arme-nom">${arme.name}</h2>

                    <h3>Effets</h3>
                    <p id="arme-effets">
                        Force : ${arme.effects.force} <br>
                        Endurance : ${arme.effects.endurance} <br>
                        Agilité : ${arme.effects.agilite} <br>
                        Intelligence : ${arme.effects.intelligence}
                    </p>

                    <div class="arme-buttons">
                        <button onclick="window.location.href='/#/armes/${arme.id}/modification'">Modifier</button>
                        <button onclick="window.location.href='/#/armes/${arme.id}/suppression'">Supprimer</button>
                    </div>
                </div>
            </div>
        `;

        return view;
    }


}