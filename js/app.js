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
import ChoixEnleverArme from "./views/pages/ChoixEnleverArme.js";
import EnleverArme from "./views/pages/EnleverArme.js";


const routes={
    '/':About,
    '/about':About,
    '/characters':CharacterAll,
    '/characters/:id':Personnage,
    '/connexion':Connexion,
    '/notation/:id':Notation,
    '/armes/:id': Arme,
    '/favoris':Pagefavoris,
    '/armes': ArmesAll,
    '/character/:id/suppression':ChoixEnleverArme,
    '/characters/:id/suppression/:id2':EnleverArme
}

const router=async ()=>{
    const content=document.querySelector('#content');

    let request=Utils.parseRequestURL();

    let parseURL=(request.ressource ? '/'+request.ressource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/'+request.verb : '');
    let page=routes[parseURL] ? new routes[parseURL] : new Error404;
    console.log(page);
    console.log("aaaaaaaaaaaaaaaaa");


    content.innerHTML=await page.render();

    if (typeof page.afterRender === "function") {
        await page.afterRender();
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load",router);