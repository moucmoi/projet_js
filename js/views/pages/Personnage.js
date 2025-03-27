import CharacterProvider from "../../services/CharacterProvider.js";
import Favoris from "../../localStorage/Favoris.js";
import Utils from "../../services/Utils.js";
import ArmeProvider from "../../services/ArmeProvider.js";
import AffichageArme from "./AffichageArme.js";

export default class Personnage {
    async render(id) {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);
        let contient = Favoris.contientF(parseInt(character.id));
        window.toggleFavoris = Favoris.toggleFavoris;
    
        let armes = [];
        if (character.armes_ids && character.armes_ids.length > 0) {
            armes = await ArmeProvider.getNom(character.armes_ids);
        }
    
        character.bonus = character.bonus || {
            force: 0,
            endurance: 0,
            agilite: 0,
            intelligence: 0
        };

        let notes = character.ratings;
        let moyenne = notes.reduce((acc, valeur) => acc + valeur, 0)/notes.length;
    
        let affichageArme = new AffichageArme();
        window.toggleFavoris = Favoris.toggleFavoris;
    
        let view = `
            <link rel="stylesheet" href='../../../css/Unperso.css'>
            <div class="arme-buttons">
                <a href="http://localhost:8000/#/characters"><button>Retour</button></a>
            </div>
            <div id="personnage-container">
                <div id="personnage-details">
                    <img loading="lazy" src="${character.image}" alt="Image de ${character.name}" id="image">
                    
                    <h2 id="personnage-nom">${character.name} (${character.importance})</h2>
                    <h3 id="notes">${moyenne.toFixed(1)} / 5 : ${notes.length} avis</h3>
    
                    <p id="personnage-description">${character.description}</p>
    
                    <h3>Caractéristiques</h3>
                    <ul id="caracteristiques">
                        <li>Force : ${character.characteristics.force + character.bonus.force}</li>
                        <li>Endurance : ${character.characteristics.endurance + character.bonus.endurance}</li>
                        <li>Agilité : ${character.characteristics.agilite + character.bonus.agilite}</li>
                        <li>Intelligence : ${character.characteristics.intelligence + character.bonus.intelligence}</li>
                    </ul>
    
                    <h3>Évolutions</h3>
                    ${character.evolutions.map(evo => `
                            <div class="evolution-item">
                                ${evo.description} 
                                (Effets : Force +${evo.effects.force}, Endurance +${evo.effects.endurance}, Agilité +${evo.effects.agilite}, Intelligence +${evo.effects.intelligence})
                            </div>
                        `).join('')
                    }
    
                    <h3>Armes :</h3>
                    ${armes.map(arme => affichageArme.renderAll(arme)).join('')}
    
                    <div class="button-group">
                    <section>
                        <button id="favoris-btn-${parseInt(character.id)}" class="bw-btn bw-btn-amber" onclick="window.toggleFavoris(${parseInt(character.id)})">${contient ? 'Enlever des favoris' : 'Ajouter aux favoris'}</button>
                        <button id="btnNotation" class="bw-btn bw-btn-amber" onclick="window.location.href='/#/notation/${character.id}'">Ajouter une note</button>
                    </section>
                    <section>
                        <button class="bw-btn bw-btn-green" onclick="window.location.href='/#/character/${character.id}/ajout'">Ajouter une arme</button>
                        <button class="bw-btn bw-btn-red"onclick="window.location.href='/#/character/${character.id}/suppression'">Enlever une arme</button>
                    </section>
                    <section>
                        <button class="bw-btn bw-btn-amber" onclick="window.location.href='/#/characters/${character.id}/modification'">Modifier</button>
                        <button id="btnSuppression" class="bw-btn bw-btn-red" onclick="window.location.href='/#/characters/${character.id}/suppression'">Supprimer le personnage</button>
                    </section>
                    </div>
                </div>
            </div>
        `;
    
        return view;
    }
    
}
