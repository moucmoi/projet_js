import ArmeProvider from "../../services/ArmeProvider.js";
import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";

export default class ArmePerso {
    async render() {
        let request = Utils.parseRequestURL();
        let arme = await ArmeProvider.getArme(request.id2);
        
        let view = `
            <link href="./../../../css/Unearme.css" rel="stylesheet" />

            <div class="arme-buttons">
                <a href="/#/characters/${request.id}"><button>Retour</button></a>
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
                        <button id="bouton">Enlever</button>
                    </div>
                </div>
            </div>
        `;


        return view;
    };

    async afterRender(){
        document.getElementById("bouton").addEventListener("click",()=>{
            const request=Utils.parseRequestURL();
            CharacterProvider.getCharacter(request.id).then(character => {
                CharacterProvider.retirerArme(character, request.id2);
                window.location.href = "/#/characters/"+request.id;
                window.location.reload();
            });
            
        });

    }


}