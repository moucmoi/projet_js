import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

export default class Arme {
    async render() {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id);
        
        let view = `
            <button><a href="http://localhost:8000/#/armes">Retour</a></button>
            <h2>${arme.name}</h2>

            <h3>Effets</h3>
            <p>
                (Effets : Force ${arme.effects.force}, Endurance ${arme.effects.endurance}, Agilité ${arme.effects.agilite}, Intelligence ${arme.effects.intelligence})
            </p>
            <button onclick=window.location.href='/#/armes/${arme.id}/modification'>Modifier</button>
            <button onclick=window.location.href='/#/armes/${arme.id}/suppression'>Supprimer</button>
        `;
        return view;
    }
}