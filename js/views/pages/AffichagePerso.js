export default class AffichagePerso{
    async render(character){
        return`
            <a href='/#/characters/${character.id}'>
            <section>
                <img href=${character.image} alt=${character.name}></img>
                <h3>${character.name}</h3>
                <h4>${character.importance}</h4>
            </section>
            </a>
        `
    }
}