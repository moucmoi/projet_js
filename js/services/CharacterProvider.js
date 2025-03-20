import { ENDPOINTC } from "../config.js";

export default class CharacterProvider {
    static fetchCharacter = async (limit = 20) => {
        const options = {
            method: 'GET',
            Headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINTC}?_limit=${limit}`, options);
            const json = await response.json();
            return json;
        }
        catch (err) {
            console.log("Error getting documents", err);
        }
    }

    static getCharacter = async (id) => {
        const options = {
            method: 'GET',
            Headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINTC}/` + id, options);
            const json = await response.json();
            return json;
        }
        catch (err) {
            console.log("Error getting documents", err);
        }
    }

    static getFavoris = async () => {
        const options = {
            method: 'GET',
            Headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINTC}`, options);
            const json = await response.json();
            const liste_favoris = JSON.parse(localStorage.getItem("Favoris"));
            const filteredJson = json.filter(item => liste_favoris.includes(String(item.id)) || liste_favoris.includes(Number(item.id)));
            return filteredJson;
        }
        catch (err) {
            console.log("Error getting documents", err);
        }
    }

    static async rateCharacter(id, username, rating) {
        try {
            let character = await this.getCharacter(id);
            character.ratings = character.ratings || {};
            character.ratings[username] = rating;

            let response = await fetch(`${ENDPOINTC}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ratings: character.ratings })
            });

            return response.ok;
        } catch (err) {
            console.error("Erreur lors de la notation :", err);
            return false;
        }
    }

    static ajouterArme = async (personnage, id) => {
        let lesArmes = personnage["armes_ids"];
        const numericId = Number(id);
    
        // Check to avoid duplicates
        if (!lesArmes.includes(numericId)) {
            lesArmes.push(numericId);
            console.log("Tableau après ajout:", lesArmes);
        } else {
            console.log("L'arme est déjà présente dans le tableau.");
        }
    
        // Update the data in the same way retirerArme does
        this.setArme(personnage["id"], lesArmes);
    };

    static retirerArme = async (personnage, id) => {
        let lesArmes = personnage["armes_ids"];
        const numericId = Number(id);
        
        const index = lesArmes.indexOf(numericId);
        
        if (index !== -1) {
          lesArmes.splice(index, 1);
          console.log("Tableau après splice:", lesArmes);
        } else {
          console.log("ID non trouvé dans le tableau");
        }
        this.setArme(personnage["id"],lesArmes);
      };
      

      static setArme = async (id, armesIds) => {
        try {
          const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ armes_ids: armesIds })
          };
      
          const response = await fetch(`${ENDPOINTC}/${id}`, options);
      

          if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour : ${response.statusText}`);
          }
      
          await response.json();
      
          console.log(`Les armes pour le personnage ${id} ont été mises à jour avec succès.`);
        } catch (err) {
          console.error("Erreur lors de la mise à jour des armes :", err);
        }
      };
      
}


