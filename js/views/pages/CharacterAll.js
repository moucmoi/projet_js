import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";
export default class CharacterAll{
     async render(){
        let characters =await CharacterProvider.fetchCharacter(20);
        let view=`<h2>Les personnages</h2>`
        characters.map(character=>
            view+=AffichagePerso.render(character)
        );
        return view;
    }
}