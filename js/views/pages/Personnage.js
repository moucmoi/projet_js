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

                <div class="bw-flex bw-flex-col bw-gap-4">
                    <h2 id="personnage-nom" class="bw-text-2xl bw-font-bold bw-text-yellow-400">
                        ${character.name} <span class="bw-text-sm bw-text-white/60">(${character.importance})</span>
                    </h2>

                    <p id="personnage-description" class="bw-text-sm bw-text-white/80">
                        ${character.description}
                    </p>

                    <h3 class="bw-text-lg bw-font-semibold bw-border-b bw-border-white/10 bw-pb-1">Caractéristiques</h3>
                    <ul id="caracteristiques" class="bw-space-y-2">
                        <li class="bw-bg-white/5 bw-p-2 bw-rounded">Force : ${character.characteristics.force + character.bonus.force}</li>
                        <li class="bw-bg-white/5 bw-p-2 bw-rounded">Endurance : ${character.characteristics.endurance + character.bonus.endurance}</li>
                        <li class="bw-bg-white/5 bw-p-2 bw-rounded">Agilité : ${character.characteristics.agilité + character.bonus.agilite}</li>
                        <li class="bw-bg-white/5 bw-p-2 bw-rounded">Intelligence : ${character.characteristics.intelligence + character.bonus.intelligence}</li>
                    </ul>

                    <h3 class="bw-text-lg bw-font-semibold bw-border-b bw-border-white/10 bw-pb-1">Évolutions</h3>
                    ${character.evolutions.map(evo => `
                        <p class="evolution-item bw-bg-white/5 bw-p-3 bw-rounded">
                            ${evo.description}<br />
                            <span class="bw-text-sm bw-text-white/60">
                                (Effets : Force +${evo.effects.force}, Endurance +${evo.effects.endurance}, 
                                Agilité +${evo.effects.agilité}, Intelligence +${evo.effects.intelligence})
                            </span>
                        </p>
                    `).join('')}

                    <h3 class="bw-text-lg bw-font-semibold bw-border-b bw-border-white/10 bw-pb-1">Armes</h3>
                    ${armes.map(arme => affichageArme.renderAll(arme)).join('')}

                    <div class="button-group bw-flex bw-flex-wrap bw-gap-3 bw-mt-4">
                        <button id="favoris-btn-${parseInt(character.id)}" class="bw-btn bw-btn-red" onclick="window.toggleFavoris(${parseInt(character.id)})">
                            ${contient ? 'Enlever des favoris' : 'Ajouter aux favoris'}
                        </button>
                        <button class="bw-btn bw-btn-amber" onclick="window.location.href='/#/notation/${character.id}'">
                            Ajouter une note
                        </button>
                        <button class="bw-btn bw-btn-slate" onclick="window.location.href='/#/character/${character.id}/suppression'">
                            Enlever une arme
                        </button>
                        <button class="bw-btn bw-btn-green" onclick="window.location.href='/#/character/${character.id}/ajout'">
                            Ajouter une arme
                        </button>
                    </div>
                </div>
            </div>
        `;

        return view;
    }
}
