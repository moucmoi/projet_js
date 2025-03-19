import About from "./views/pages/About.js";
import CharacterAll from "./views/pages/CharacterAll.js";
import Utils from "./services/Utils.js";
import Personnage from "./views/pages/Personnage.js";
import Error404 from "./views/pages/Error404.js";
import Connexion from "./views/pages/Connexion.js";
import Notation from "./views/pages/Notation.js";

const routes={
    '/':About,
    '/about':About,
    '/characters':CharacterAll,
    '/characters/:id':Personnage,
    '/connexion':Connexion,
    '/notation/:id':Notation
}

const router=async ()=>{
    const content=document.querySelector('#content');

    let request=Utils.parseRequestURL();
    console.log(request);

    let parseURL=(request.ressource ? '/'+request.ressource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/'+request.verb : '');
    let page=routes[parseURL] ? new routes[parseURL] : new Error404;
    console.log(page);

    content.innerHTML=await page.render();

    if (typeof page.afterRender === "function") {
        await page.afterRender();
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("load",router);