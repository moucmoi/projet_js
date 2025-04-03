import ArmeProvider from "../../services/ArmeProvider.js";
import AffichageArme from "../../controllers/AffichageArme.js";

export default class ArmesAll{
     async render(){
        let armes =await ArmeProvider.fetchArme();
        let affichageArme=new AffichageArme();
        let idMax = await ArmeProvider.getMaxId();
        
        let view = `
            <link rel="stylesheet" href='../../../css/PersoAll.css'>
            <div id="personnage-all-container" class="personnage-all-container">
                <h2 id="personnage-title" class="personnage-title">Les armes</h2>
                <a href='/#/nouvelle/${idMax+1}' class="personnage-card-link" id="personnage-card-link">
                    <section class="personnage-section" id="personnage-section">
                        <img src="../../../images/autres/plus.png" alt="creer arme" class="personnage-img" id="personnage-img">
                        <h3 class="personnage-name" id="personnage-name">Créer arme</h3>
                    </section>
                </a>
        `;
        armes.forEach(arme => {
            view += affichageArme.renderAll(arme);
        });

        view += `</div>`;
        return view;
    }
}