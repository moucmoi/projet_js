import CharacterProvider from "../../services/CharacterProvider.js";
import Favoris from "../../localStorage/Favoris.js";
import Utils from "../../services/Utils.js";
import ArmeProvider from "../../services/ArmeProvider.js";
import AffichageArme from "./AffichageArme.js";
export default class Personnage{
    async render(id) {
        let request = Utils.parseRequestURL();
        // Récupération d'un personnage par son id (assure-toi que getCharacter est défini dans CharacterProvider)
        let character = await CharacterProvider.getCharacter(request.id);
        let contient = Favoris.contientF(parseInt(character.id));
        let armes=await ArmeProvider.getNom(character.armes_ids);
        let affichageArme=new AffichageArme();
        window.toggleFavoris = Favoris.toggleFavoris;
        console.log(character.bonus.force);

        let view = `
            <button><a href="http://localhost:8000/#/characters">Retour</a></button>
            <h2>${character.name} (${character.importance})</h2>
            <p>${character.description}</p>
            <h3>Caractéristiques</h3>
            <ul>
                <li>Force : ${character.characteristics.force+character.bonus.force}</li>
                <li>Endurance : ${character.characteristics.endurance+character.bonus.endurance}</li>
                <li>Agilité : ${character.characteristics.agilité+character.bonus.agilite}</li>
                <li>Intelligence : ${character.characteristics.intelligence+character.bonus.intelligence}</li>
            </ul>
            <h3>Évolutions</h3>
            ${character.evolutions.map(evo => `
                <p>
                    ${evo.description} 
                    (Effets : Force +${evo.effects.force}, Endurance +${evo.effects.endurance}, Agilité +${evo.effects.agilité}, Intelligence +${evo.effects.intelligence})
                </p>
            `).join('')}
            <h3>Armes :</h3>`
            armes.forEach(arme => {
                view += affichageArme.renderAll(arme);
            });

            view+=`<button id="favoris-btn-${parseInt(character.id)}" onclick="window.toggleFavoris(${parseInt(character.id)})">
                ${contient ? 'Enlever des favoris' : 'Ajouter aux favoris'}
            </button>
            <button id=btnNotation onclick=window.location.href='/#/notation/${character.id}'>Ajouter une note</button>
            <button onclick=window.location.href='/#/character/${character.id}/suppression'>Enlever une arme</button>
            <button onclick=window.location.href='/#/character/${character.id}/ajout'>Ajouter une arme</button>

        `;
        
        return view;
    }

}