import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
export default class AjoutArme {
    async render(){
        let request = Utils.parseRequestURL();
        let character=await CharacterProvider.getCharacter(request.id);
        let view='';
        try{
            await CharacterProvider.ajouterArme(character,request.id2);
            view+=`
            <link href="./../../../css/AjoutSupp.css" rel="stylesheet" />
            <div id="suppression-arme" class="page-container">
                <h2>L'arme a bien été ajoutée</h2>
                <div class="confirm-buttons">
                    <button onclick=window.location.href='/#/characters/${request.id}'>Retour</button>
                </div>
            </div>`;
        }
        catch{
            view+=`<h2>L'arme a bien été ajoutée</h2>`
        }
        return view;
    }
}