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
import ChoixEnleverArme from "./views/pages/ChoixEnleverArme.js";
import EnleverArme from "./views/pages/EnleverArme.js";
import ChoixAjoutArme from "./views/pages/ChoixAjoutArme.js";
import AjoutArme from "./views/pages/AjoutArme.js";
import CharacterProvider from "./services/CharacterProvider.js";


CharacterProvider.updateAllCharacter();


const routes={
    '/':About,
    '/about':About,
    '/characters':CharacterAll,
    '/characters/:id':Personnage,
    '/connexion':Connexion,
    '/notation/:id':Notation,
    '/armes/:id': Arme,
    '/favoris':Pagefavoris,
    '/characters/:id/modification':ModifPerso,
    '/characters/:id/suppression':SuppressionPerso,
    '/nouveau/:id': NouveauPerso,
    '/armes': ArmesAll,
    '/character/:id/suppression':ChoixEnleverArme,
    '/characters/:id/suppression/:id2':EnleverArme,
    '/character/:id/ajout':ChoixAjoutArme,
    '/characters/:id/ajout/:id2':AjoutArme
}



const router=async ()=>{
    const content=document.querySelector('#content');

    let request=Utils.parseRequestURL();
    console.log(request);

    let parseURL =(request.ressource ? '/' + request.ressource : '/') + (request.id ? '/:id' : '') + (request.verb      ? '/' + request.verb : '') + (request.id2       ? '/:id2' : '');
    let page=routes[parseURL] ? new routes[parseURL] : new Error404;

    content.innerHTML=await page.render();

    if (typeof page.afterRender === "function") {
        await page.afterRender();
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load",router);
