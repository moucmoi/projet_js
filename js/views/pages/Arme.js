import ArmeProvider from "../../services/ArmeProvider.js";
import Utils from "../../services/Utils.js";

export default class Arme {
    async render(id) {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id);

        con
    
        
        let view = `
            <button><a href="http://localhost:8000/#/armes">Retour</a></button>
            <h2>${arme.name}</h2>

            <h3>Effets</h3>
            ${arme.effects.map(evo => `
                <p>
                    (Effets : Force ${evo.force}, Endurance ${evo.endurance}, Agilité ${evo.agilité}, Intelligence ${evo.intelligence})
                </p>
            `).join('')}
        `;
        
        return view;
    }
}