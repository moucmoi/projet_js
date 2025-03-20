import CharacterProvider from "../../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";
export default class Pagefavoris{
    async render(){
        let favoris= await CharacterProvider.getFavoris();
        let affichagePerso = new AffichagePerso();
        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Vos favoris</h2>
        `;

        favoris.forEach(character => {
            view += affichagePerso.render(character);
        });

        // On ferme la div conteneur
        view += `</div>`;
        return view;
    }
}