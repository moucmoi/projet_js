import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
export default class EnleverArme{
    async render(){
        console.log("aaaaaaaaaaaaaaaaa");
        let request = Utils.parseRequestURL();
        let character=await CharacterProvider.getCharacter(request.id);
        try{
            CharacterProvider.retirerArme(character,request.id2["id"]);
            view=`<button onclick=window.location.href='/#/character/${character.id}'>Le personnage a bien été créé, retour/button>`;
        }
        catch{
            view=`<h1>La suppression ne s'est pas faite</h1>`
        }
        return view;
    }
}