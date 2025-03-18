export default class Favoris {
    static ajoutF(id) {
        let liste_favoris = JSON.parse(localStorage.getItem("Favoris"));
        liste_favoris.push(id);
        localStorage.setItem("Favoris", JSON.stringify(liste_favoris));
    }

    static retirerF(id) {
        let liste_favoris = JSON.parse(localStorage.getItem("Favoris"));
        liste_favoris = liste_favoris.filter(item => item !== id);
        localStorage.setItem("Favoris", JSON.stringify(liste_favoris));
    }

    static contientF(id){
        let liste_favoris = JSON.parse(localStorage.getItem("Favoris"));
        return liste_favoris.includes(id);
    }
}