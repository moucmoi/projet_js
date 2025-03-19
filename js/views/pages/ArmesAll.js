import ArmeProvider from "../../services/ArmeProvider.js";
import AffichageArme from "./AffichageArme.js";
export default class ArmesAll{
     async render(){
        let armes =await ArmeProvider.fetchArme(20);
        let affichageArme=new AffichageArme();
        
        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Les armes</h2>
        `;
        armes.forEach(arme => {
            view += affichageArme.renderAll(arme);
        });

        // On ferme la div conteneur
        view += `</div>`;
        return view;
    }
}