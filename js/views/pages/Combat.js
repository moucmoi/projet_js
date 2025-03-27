import AffichagePerso from "./AffichagePerso.js";
import CharacterProvider from "../../services/CharacterProvider.js";
import Utils from "../../services/Utils.js";
export default class Combat{
    render(){
        const affichagePerso=new AffichagePerso();
        let view=`<link rel="stylesheet" href='../../../css/combat.css'>`;
        view+=affichagePerso.render( CharacterProvider.getCharacter(Utils.parseRequestURL().id));
        view+=`<img id='imageCombat' src='./../../images/autres/versus.png' alt='imageVS'>`;
        view+=affichagePerso.render( CharacterProvider.getCharacter(Utils.parseRequestURL().id2));
        return view;
    }
}