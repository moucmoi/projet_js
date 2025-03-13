import CharacterProvider from "../../services/CharacterProvider.js";
export default class CharacterAll{
     async render(){
        let characters =await CharacterProvider.fetchCharacter(20);
        let view=`
        <h2>Les personnages</h2>
        <ul>
        ${characters.map(character=>
            `
            <a href='/#/characters/${character.id}'><li>${character.name}</li></a>
            `
        ).join('\n')}
        </ul>
        `;
        return view;
    }
}