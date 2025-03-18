import CharacterProvider from "../../services/CharacterProvider.js";
export default class Pagefavoris{
    async render(){
        let favoris= await CharacterProvider.getFavoris();
        let view=`
        <h2>Vos favoris</h2>
        <ul>
        ${favoris.map(character=>
            `
            <a href='/#/characters/${character.id}'><li>${character.name}</li></a>
            `
        ).join('\n')}
        </ul>
        `;
        return view;
    }
}