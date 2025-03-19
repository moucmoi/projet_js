export default class EnleverArme{
    async render(){
        let armes=await ArmeProvider.getNom(character.armes_ids);
        let view='<h2>Quel arme voulez vous supprimer ?</h2>'
        armes.forEach(arme => {
            view += affichageArme.render(arme);
        });
    }
}