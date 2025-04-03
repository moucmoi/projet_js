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

    static toggleFavoris(id) {
        let bouton = document.getElementById(`favoris-btn-${id}`);
    
        if (!bouton) {
            console.error("Bouton favoris introuvable pour l'ID:", id);
            return;
        }
    
        if (Favoris.contientF(id)) {
            Favoris.retirerF(id);
            bouton.textContent = "Ajouter aux favoris";
        } else {
            Favoris.ajoutF(id);
            bouton.textContent = "Enlever des favoris";
        }
    }
}