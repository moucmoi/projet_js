import CharacterProvider from "../../services/CharacterProvider.js";
import Favoris from "../../localStorage/Favoris.js";
import Utils from "../../services/Utils.js";
import ArmeProvider from "../../services/ArmeProvider.js";
import AffichageArme from "../../controllers/AffichageArme.js"

export default class Personnage {
    async render(id) {
        let request = Utils.parseRequestURL();
        let character = await CharacterProvider.getCharacter(request.id);
        this.character = character;
        let contient = Favoris.contientF(parseInt(request.id));
        let maxId = await CharacterProvider.getMaxId();
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

        let noteText = "Aucun avis";
        if (character.ratings && character.ratings.length > 0) {
            let notes = character.ratings;
            let moyenne = notes.reduce((acc, val) => acc + val, 0) / notes.length;
            noteText = `${moyenne.toFixed(1)} / 5 : ${notes.length} avis`;
        }

        let affichageArme = new AffichageArme();

        let evolutionsHTML = '';
        if (character.evolutions && character.evolutions.length > 0) {
            const evolutionsValides = character.evolutions.filter(evo => evo.effects && Object.keys(evo.effects).length > 0);

            if (evolutionsValides.length > 0) {
                evolutionsHTML = evolutionsValides.map(evo => {
                    let debloquee = character.niveau >= evo.condition;
                    return `
                <div class="evolution-item ${debloquee ? 'debloquee' : 'verrouillee'}">
                    <strong>${evo.description}</strong> 
                    <p>Niveau requis : ${evo.condition} ${debloquee ? '✅ Débloquée' : '🔒 Verrouillée'}</p>
                    <p>Effets : Force +${evo.effects.force}, Endurance +${evo.effects.endurance}, Agilité +${evo.effects.agilite}, Intelligence +${evo.effects.intelligence}</p>
                </div>
            `;
                }).join('');
            } else {
                evolutionsHTML = `<p>Ce personnage n'a pas d'évolution</p>`;
            }
        } else {
            evolutionsHTML = `<p>Ce personnage n'a pas d'évolution</p>`;
        }


        // Génération de la vue
        let view = `
            <link rel="stylesheet" href='../../../css/Unperso.css'>
            <div class="arme-buttons">
                <a href="http://localhost:8000/#/characters"><button>Retour</button></a>
            </div>
            <div id="personnage-container">
                <div id="personnage-details">
                    <div id="btn-page">
                        ${parseInt(character.id) > 1 ? `<a href="/#/characters/${parseInt(character.id) - 1}">précédent</a>` : ''}
                        ${parseInt(character.id) < maxId ? `<a id="suivant" href="/#/characters/${parseInt(character.id) + 1}">suivant</a>` : ''}
                    </div>
                    <img loading="lazy" src="${character.image}" alt="Image de ${character.name}" id="image">

                    <h2 id="personnage-nom">${character.name} (${character.importance})</h2>
                    <h3 id="notes">${noteText}</h3>
                    <p id="personnage-description">${character.description}</p>

                    <h3>Caractéristiques</h3>
                    <ul id="caracteristiques">
                        <li>niveau : ${character.niveau}</li>
                        <li>Force : ${character.characteristics.force + character.bonus.force}</li>
                        <li>Endurance : ${character.characteristics.endurance + character.bonus.endurance}</li>
                        <li>Agilité : ${character.characteristics.agilite + character.bonus.agilite}</li>
                        <li>Intelligence : ${character.characteristics.intelligence + character.bonus.intelligence}</li>
                    </ul>

                    <h3>Évolutions</h3>
                    ${evolutionsHTML}

                    <h3>Armes :</h3>
                    ${armes.length !== 0
                ? armes.map(arme => affichageArme.renderAllArmePerso(arme, character.id)).join('')
                : `<p>Ce personnage ne possède pas d'armes</p>`
            }

                    <div class="button-group">
                        <section>
                            <button id="favoris-btn-${parseInt(character.id)}" class="bw-btn bw-btn-amber" onclick="window.toggleFavoris(${parseInt(character.id)})">${contient ? 'Enlever des favoris' : 'Ajouter aux favoris'}</button>
                            <button id="btnNotation" class="bw-btn bw-btn-amber" onclick="window.location.href='/#/notation/${character.id}'">Ajouter une note</button>
                        </section>
                        <section>
                            <button class="bw-btn bw-btn-green" onclick="window.location.href='/#/character/${character.id}/ajout'">Ajouter une arme</button>
                        </section>
                        <section>
                            <button class="bw-btn bw-btn-amber" onclick="window.location.href='/#/characters/${character.id}/modification'">Modifier</button>
                            <button id="btnSuppression" class="bw-btn bw-btn-red" onclick="window.location.href='/#/characters/${character.id}/suppression'">Supprimer le personnage</button>
                        </section>
                        <section>
                            <button id="niveau-sup" class="bw-btn bw-btn-amber">niveau +5</button>
                            <button id="niveau-reset" class="bw-btn bw-btn-amber">niveau 0</button>
                        </section>
                    </div>
                </div>
            </div>
        `;

        return view;
    }

    async afterRender() {
        document.getElementById('niveau-sup').addEventListener('click', async () => {
            let character = this.character;

            character.niveau += 5;
            const niveauElement = document.getElementById('caracteristiques').querySelector('li:first-child');
            if (niveauElement) {
                niveauElement.textContent = `niveau : ${character.niveau}`;
            }

            await CharacterProvider.addLevel(character.id);
            await CharacterProvider.updateCharacter(character.id);
            window.location.reload();
        })

        document.getElementById('niveau-reset').addEventListener('click', async () => {
            let character = this.character;

            character.niveau = 0;
            const niveauElement = document.getElementById('caracteristiques').querySelector('li:first-child');
            if (niveauElement) {
                niveauElement.textContent = `niveau : ${character.niveau}`;
            }

            await CharacterProvider.resetLevel(character.id);
            await CharacterProvider.updateCharacter(character.id);
            window.location.reload();
        });
    }
}
