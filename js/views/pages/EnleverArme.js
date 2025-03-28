import Utils from "./../../services/Utils.js"


import CharacterProvider from "../../services/CharacterProvider.js"
export default class EnleverArme {
    async render(){
      let request = Utils.parseRequestURL();
      let character = await CharacterProvider.getCharacter(request.id);
      let view = '';
      try {
        await CharacterProvider.retirerArme(character, request.id2);
        view += `
          <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
          <div id="enlever-arme" class="page-container">
            <h2>L'arme a bien été supprimée</h2>
            <div class="confirm-buttons">
              <button id="retour-enlever-arme" onclick="window.location.href='/#/characters/${request.id}'">Retour</button>
            </div>
          </div>
        `;
      } catch {
        view += `<h2>La suppression ne s'est pas faite</h2>`;
      }
      return view;
    }
  }
  