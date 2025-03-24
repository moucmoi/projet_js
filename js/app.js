import About from "./views/pages/About.js";
import CharacterAll from "./views/pages/CharacterAll.js";
import Utils from "./services/Utils.js";
import Personnage from "./views/pages/Personnage.js";
import Error404 from "./views/pages/Error404.js";
import Connexion from "./views/pages/Connexion.js";
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

const routes={
    // AUTRES
    '/':About,
    '/about':About,
    '/connexion':Connexion,
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
    '/nouvelle/:id': NouvelleArme
}

const router=async ()=>{
    const content=document.querySelector('#content');

    let request=Utils.parseRequestURL();
    console.log(request);
    let parseURL=(request.ressource ? '/'+request.ressource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/'+request.verb : '');
    let page=routes[parseURL] ? new routes[parseURL] : new Error404;

    content.innerHTML=await page.render();

    if (typeof page.afterRender === "function") {
        await page.afterRender();
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load",router);