import Utils from "./services/Utils.js";
import CharacterProvider from "./services/CharacterProvider.js";

import About from "./views/pages/About.js";
import CharacterAll from "./views/pages/CharacterAll.js";
import Personnage from "./views/pages/Personnage.js";
import Error404 from "./views/pages/Error404.js";
import Notation from "./views/pages/Notation.js";
import Pagefavoris from "./views/pages/Pagefavoris.js";
import ArmesAll from "./views/pages/ArmesAll.js";
import Arme from "./views/pages/Arme.js";
import ModifPerso from "./views/pages/ModifPerso.js";
import NouveauPerso from "./views/pages/NouveauPerso.js";
import SuppressionPerso from "./views/pages/SuppressionPerso.js";
import ModifArme from "./views/pages/ModifArme.js";
import NouvelleArme from "./views/pages/NouvelleArme.js";
import SuppressionArme from "./views/pages/SuppressionArme.js";
import EnleverArme from "./views/pages/EnleverArme.js";
import ChoixAjoutArme from "./views/pages/ChoixAjoutArme.js";
import AjoutArme from "./views/pages/AjoutArme.js";
import ArmePerso from "./views/pages/ArmePerso.js";


CharacterProvider.updateAllCharacter();


const routes={
    // AUTRES
    '/':About,
    '/about':About,
    '/favoris':Pagefavoris,

    // PERSO
    '/characters':CharacterAll,
    '/characters/:id':Personnage,
    '/characters/:id/modification':ModifPerso,
    '/characters/:id/suppression':SuppressionPerso,
    '/nouveau/:id': NouveauPerso,
    '/notation/:id':Notation,

    // ARMES
    '/armes': ArmesAll,
    '/armes/:id': Arme,
    '/armes/:id/modification':ModifArme,
    '/armes/:id/suppression':SuppressionArme,
    '/nouvelle/:id': NouvelleArme,
    '/characters/:id/suppression/:id2':EnleverArme,
    '/character/:id/ajout':ChoixAjoutArme,
    '/character/:id/armes/:id2': ArmePerso,
    '/characters/:id/ajout/:id2':AjoutArme

}



const router=async ()=>{
    const content=document.querySelector('#content');

    let request=Utils.parseRequestURL();

    let parseURL =(request.ressource ? '/' + request.ressource : '/') + (request.id ? '/:id' : '') + (request.verb      ? '/' + request.verb : '') + (request.id2       ? '/:id2' : '');
    let page=routes[parseURL] ? new routes[parseURL] : new Error404;

    content.innerHTML=await page.render();
    window.scrollTo(0, 0); 

    if (typeof page.afterRender === "function") {
        await page.afterRender();
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load",router);
