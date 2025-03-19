export default class EnleverArme{
    async render(){
        let armes=await ArmeProvider.getNom(character.armes_ids);
        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Quel arme voulez vous supprimer ?</h2>
        `;
        armes.forEach(arme => {
            view += affichageArme.render(arme);
        });
        return view;
    }
}