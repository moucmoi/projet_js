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
        let armes = await ArmeProvider.getNom(character.armes_ids);
        let affichageArme = new AffichageArme();
        window.toggleFavoris = Favoris.toggleFavoris;

        let view = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nobrainr/botwacht@latest/dist/botwacht.min.css">
            <link href="./../../../css/Unperso.css" rel="stylesheet" />
            
            <div id="personnage-container" class="bw-card bw-glass bw-grid md:bw-grid-cols-[300px_1fr] bw-gap-6 bw-p-6 bw-max-w-5xl bw-mx-auto bw-my-10">
                <div>
                    <img loading="lazy" src="${character.image}" alt="${character.name}" id="image" class="bw-rounded-xl bw-shadow-lg bw-object-cover bw-w-full" />
                </div>

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


        let affichageArme = new AffichageArme();
        window.toggleFavoris = Favoris.toggleFavoris;

        let view = `
            <button><a href="http://localhost:8000/#/characters">Retour</a></button>
            <h2>${character.name} (${character.importance})</h2>
            <p>${character.description}</p>
            <h3>Caractéristiques</h3>
            <ul>
                <li>Force : ${character.characteristics.force + character.bonus.force}</li>
                <li>Endurance : ${character.characteristics.endurance + character.bonus.endurance}</li>
                <li>Agilité : ${character.characteristics.agilité + character.bonus.agilite}</li>
                <li>Intelligence : ${character.characteristics.intelligence + character.bonus.intelligence}</li>
            </ul>
            <h3>Évolutions</h3>
            ${character.evolutions.map(evo => `
                <p>
                    ${evo.description} 
                    (Effets : Force +${evo.effects.force}, Endurance +${evo.effects.endurance}, Agilité +${evo.effects.agilité}, Intelligence +${evo.effects.intelligence})
                </p>
            `).join('')}
            <h3>Armes :</h3>`;

        armes.forEach(arme => {
            view += affichageArme.renderAll(arme);
        });

        view += `<button id="favoris-btn-${parseInt(character.id)}" onclick="window.toggleFavoris(${parseInt(character.id)})">
                ${contient ? 'Enlever des favoris' : 'Ajouter aux favoris'}
            </button>
            <button id="btnNotation" onclick="window.location.href='/#/notation/${character.id}'">Ajouter une note</button>
            <button id="btnNotation" onclick="window.location.href='/#/characters/${character.id}/suppression'">supprimer</button>
            <button onclick="window.location.href='/#/character/${character.id}/suppression'">Enlever une arme</button>
            <button onclick="window.location.href='/#/character/${character.id}/ajout'">Ajouter une arme</button>`;

        return view;
    }
}
