import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
export default class Personnage{
    async render(id) {
        let request = Utils.parseRequestURL();
        // Récupération d'un personnage par son id (assure-toi que getCharacter est défini dans CharacterProvider)
        let character = await CharacterProvider.getCharacter(request.id);
        
        let view = `
            <h2>${character.name} (${character.importance})</h2>
            <p>${character.description}</p>
            <h3>Caractéristiques</h3>
            <ul>
                <li>Force : ${character.characteristics.force}</li>
                <li>Endurance : ${character.characteristics.endurance}</li>
                <li>Agilité : ${character.characteristics['agilité']}</li>
                <li>Intelligence : ${character.characteristics.intelligence}</li>
            </ul>
            <h3>Évolutions</h3>
            ${character.evolutions.map(evo => `
                <p>
                    ${evo.description} 
                    (Effets : Force ${evo.effects.force}, Endurance ${evo.effects.endurance}, Agilité ${evo.effects.agilité}, Intelligence ${evo.effects.intelligence})
                </p>
            `).join('')}
        `;
        return view;
    }
    
}