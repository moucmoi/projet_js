import CharacterProvider from "../../services/CharacterProvider.js";
import Favoris from "../../localStorage/Favoris.js";
import Utils from "../../services/Utils.js";

export default class Personnage{
    async render(id) {
        let request = Utils.parseRequestURL();
        // Récupération d'un personnage par son id (assure-toi que getCharacter est défini dans CharacterProvider)
        let character = await CharacterProvider.getCharacter(request.id);
        console.log(request.id);
        console.log(character);
        let contient = Favoris.contientF(parseInt(character.id));
        
        window.toggleFavoris = toggleFavoris;

        function toggleFavoris(id) {
            let bouton = document.getElementById(`favoris-btn-${id}`);
        
            if (!bouton) {
                console.error("Bouton favoris introuvable pour l'ID:", id);
                return;
            }
        
            if (Favoris.contientF(id)) {
                Favoris.retirerF(id);
                bouton.textContent = "Ajouter aux favoris";
            } else {
                Favoris.ajoutF(id);
                bouton.textContent = "Enlever des favoris";
            }
        }
        
        let view = `
            <button><a href="http://localhost:8000/#/characters">Retour</a></button>
            <h2>${character.name} (${character.importance})</h2>
            <p>${character.description}</p>
            <h3>Caractéristiques</h3>
            <ul>
                <li>Force : ${character.characteristics.force}</li>
                <li>Endurance : ${character.characteristics.endurance}</li>
                <li>Agilité : ${character.characteristics.agilite}</li>
                <li>Intelligence : ${character.characteristics.intelligence}</li>
            </ul>
            <h3>Évolutions</h3>
            ${character.evolutions.map(evo => `
                <p>
                    ${evo.description} 
                    (Effets : Force +${evo.effects.force}, Endurance +${evo.effects.endurance}, Agilité +${evo.effects.agilité}, Intelligence +${evo.effects.intelligence})
                </p>
            `).join('')}
            <button id="favoris-btn-${parseInt(character.id)}" onclick="window.toggleFavoris(${parseInt(character.id)})">
                ${contient ? 'Enlever des favoris' : 'Ajouter aux favoris'}
            </button>
            <button id=btnNotation onclick=window.location.href='/#/notation/${character.id}'>ajouter une note</button>
            <button onclick=window.location.href='/#/characters/${character.id}/modification'>Modifier</button>
            <button onclick=window.location.href='/#/characters/${character.id}/suppression'>Supprimer</button>
        `;
        
        return view;
    }

}