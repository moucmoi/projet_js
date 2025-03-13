import ArticleProvider from "../../services/ArticleProvider.js";
import Utils from "../../services/Utils.js";
export default class UnArticle{
     async render(id){
        let request=Utils.parseRequestURL();
        let article=await ArticleProvider.getArticle(request.id);
        let view=`
        <h2>Title : ${article.title}</h2>
        <p>${article.text}</p>
        `;
        return view;
    }
}