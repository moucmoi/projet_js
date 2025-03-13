import ArticleProvider from "../../services/ArticleProvider.js";
export default class ArticleAll{
     async render(){
        let articles =await ArticleProvider.fetchArticles(200);
        let view=`
        <h2>Les articles</h2>
        <ul>
        ${articles.map(article=>
            `
            <a href='/#/articles/${article.id}'><li>${article.title}</li></a>
            `
        ).join('\n')}
        </ul>
        `;
        return view;
    }
}