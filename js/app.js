import About from "./views/pages/About.js";
import ArticleAll from "./views/pages/ArticleAll.js";
import Utils from "./services/Utils.js";
import UnArticle from "./views/pages/UnArticle.js";
import Error404 from "./views/pages/Error404.js";


const routes={
    '/':About,
    '/about':About,
    '/articles':ArticleAll,
    '/articles/:id':UnArticle
}

const router=async ()=>{
    const content=document.querySelector('#content');

    let request=Utils.parseRequestURL();
    console.log(request);

    let parseURL=(request.ressource ? '/'+request.ressource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/'+request.verb : '');
    let page=routes[parseURL] ? new routes[parseURL] : new Error404;
    console.log(page);

    content.innerHTML=await page.render();
}

window.addEventListener("hashchange", router);
window.addEventListener("load",router);