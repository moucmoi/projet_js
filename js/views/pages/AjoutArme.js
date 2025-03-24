import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
export default class AjoutArme {
    async render(){
        let request = Utils.parseRequestURL();
        let character=await CharacterProvider.getCharacter(request.id);
        let view='';
        try{
            console.log(request.id2)
            CharacterProvider.ajouterArme(character,request.id2);
            view+=`
            <h1>L'arme a bien été ajoutée</h1>
            <button onclick=window.location.href='/#/characters/${request.id}'>Retour</button>`;
        }
        catch{
            view+=`<h1>L'ajout' ne s'est pas fait</h1>`
        }
        return view;
    }
}