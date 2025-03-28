import { ENDPOINTC } from "../config.js";
import ArmeProvider from "./ArmeProvider.js";

export default class CharacterProvider {
  static fetchCharacter = async (limit = 20) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(`${ENDPOINTC}?_limit=${limit}`, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("Error getting documents", err);
    }
  };

  static getCharacter = async (id) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(`${ENDPOINTC}/${id}`, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("Error getting documents", err);
    }
  };

  static getFavoris = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(`${ENDPOINTC}`, options);
      const json = await response.json();
      const liste_favoris = JSON.parse(localStorage.getItem("Favoris"));
      const filteredJson = json.filter(item =>
        liste_favoris.includes(String(item.id)) || liste_favoris.includes(Number(item.id))
      );
      return filteredJson;
    } catch (err) {
      console.log("Error getting documents", err);
    }
  };

  static async addCharacter(characterData) {
    try {
        let response = await fetch(`${ENDPOINTC}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(characterData),
        });

        return response.ok;
    } catch (err) {
        console.error("Erreur lors de l'ajout du personnage :", err);
        return false;
    }
}

static async deleteCharacter(characterId) {
  try {
      let response = await fetch(`${ENDPOINTC}/${characterId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      });

      return response.ok;
  } catch (err) {
      console.error("Erreur lors de la suppression du personnage :", err);
      return false;
  }
}

  static async updateAllCharacter() {
    try {
      const personnages = await this.fetchCharacter(100);
  
      for (const personnage of personnages) {
        const id = personnage.id;
  
        const statsFinales = {
          force: 0,
          endurance: 0,
          agilite: 0,
          intelligence: 0
        };
  
        for (const idarme of personnage.armes_ids) {
          const arme = await ArmeProvider.getArme(idarme);
  
          statsFinales.force += arme.effects.force;
          statsFinales.endurance += arme.effects.endurance;
          statsFinales.agilite += arme.effects.agilite;
          statsFinales.intelligence += arme.effects.intelligence;
        }
  
        const payload = {
          bonus: statsFinales
        };
  
        const response = await fetch(`${ENDPOINTC}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
  
        return response.ok;
      }
    } catch (err) {
      return false;
    }
  }
  

  static async updateCharacter(id) {
    const statsFinales = {
      "force": 0,
      "endurance": 0,
      "agilite": 0,
      "intelligence": 0
    };
    try {
      const personnage = await this.getCharacter(id);
      for (const idarme of personnage["armes_ids"]) {
        const arme = await ArmeProvider.getArme(idarme);

        statsFinales.force += arme.effects.force;
        statsFinales.endurance += arme.effects.endurance;
        statsFinales.agilite += arme.effects.agilite;
        statsFinales.intelligence += arme.effects.intelligence;

      }

      const payload = {
        bonus: statsFinales
      };

      const response = await fetch(`${ENDPOINTC}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });

      return response.ok;
    } catch (err) {
      console.error("Erreur lors de la notation :", err);
      return false;
    }
  }


  static async rateCharacter(id, rating) {
    try {
      let character = await this.getCharacter(id);
      character.ratings = character.ratings || [];
      character.ratings.push(rating);

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

    if (!lesArmes.includes(numericId)) {
      lesArmes.push(numericId);
    } else {
      console.log("L'arme est déjà présente dans le tableau.");
    }

    this.setArme(personnage["id"], lesArmes);
    this.updateCharacter(personnage["id"]);
  };

  static retirerArme = async (personnage, id) => {
    let lesArmes = personnage["armes_ids"];
    const numericId = Number(id);

    const index = lesArmes.indexOf(numericId);

    if (index !== -1) {
      lesArmes.splice(index, 1);
    } else {
      console.log("ID non trouvé dans le tableau");
    }
    this.setArme(personnage["id"], lesArmes);
    this.updateCharacter(personnage["id"]);
  };

  static async updateCharacterStats(id, characterData) {
    try {
        let response = await fetch(`${ENDPOINTC}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(characterData),
        });

        return response.ok;
    } catch (err) {
        console.error("Erreur lors de la modification du personnage :", err);
        return false;
    }
}

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
    } catch (err) {
      console.error("Erreur lors de la mise à jour des armes :", err);
    }
  };

  static async aGagne(personnage,chanceVictoire){
    let niveauPlus=null;
    if(chanceVictoire<0.1){
      niveauPlus=5;
    }
    else if(chanceVictoire<0.3){
      niveauPlus=3;
    }
    else if(chanceVictoire<0.5){
      niveauPlus=2;
    }
    else if(chanceVictoire<0.6){
      niveauPlus=1;
    }
    else{
      niveauPlus=0;
    }
    const niveauActurel=personnage.niveau;

    const futurNiveau=niveauPlus+niveauActurel;

    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ niveau: futurNiveau })
      };

      const response = await fetch(`${ENDPOINTC}/${personnage.id}`, options);

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour : ${response.statusText}`);
      }

      await response.json();
    } catch (err) {
      console.error("Erreur lors de la mise à jour des armes :", err);
    }
  }

  static async aPerdu(personnage,chanceVictoire){
    let niveauMoins=null;
    if(chanceVictoire<0.2){
      niveauMoins=0;
    }
    else if(chanceVictoire<0.5){
      niveauMoins=1;
    }
    else{
      niveauMoins=3;
    }
    const niveauActurel=personnage.niveau;
    let futurNiveau=niveauActurel-niveauMoins;

    if(futurNiveau<0){
      futurNiveau=0;
    }

    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ niveau: futurNiveau })
      };

      const response = await fetch(`${ENDPOINTC}/${personnage.id}`, options);

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour : ${response.statusText}`);
      }

      await response.json();
    } catch (err) {
      console.error("Erreur lors de la mise à jour des armes :", err);
    }
  }
}
