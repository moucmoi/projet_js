import {ENDPOINTC} from "../config.js";
import ArmeProvider from "./ArmeProvider.js";

export default class CharacterProvider {
  static fetchCharacter = async (trie) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch(`${ENDPOINTC}?_sort=${trie}`, options);
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

        let bonusForceEvo=0;
        let bonusEndEvo=0;
        let bonusAgiEvo=0;
        let bonusIntEvo=0;

        for(const amelioraion of personnage.evolutions){
          if(amelioraion["condition"]<=personnage.niveau){

            bonusForceEvo+=amelioraion["effects"]["force"];

            bonusEndEvo+=amelioraion["effects"]["endurance"];

            bonusAgiEvo+=amelioraion["effects"]["agilite"];

            bonusIntEvo+=amelioraion["effects"]["intelligence"];


          }
        }
  
        const statsFinales = {
          force: bonusForceEvo,
          endurance: bonusEndEvo,
          agilite: bonusAgiEvo,
          intelligence: bonusIntEvo
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
    try {
      const personnage = await this.getCharacter(id);
      
      console.log('perso:' +personnage);
      let bonusForceEvo=0;
      let bonusEndEvo=0;
      let bonusAgiEvo=0;
      let bonusIntEvo=0;

      for(const amelioraion of personnage.evolutions){
        if(amelioraion["condition"]<=personnage.niveau){
            
          bonusForceEvo+=amelioraion["effects"]["force"];

          bonusEndEvo+=amelioraion["effects"]["endurance"];

          bonusAgiEvo+=amelioraion["effects"]["agilite"];

          bonusIntEvo+=amelioraion["effects"]["intelligence"];


        }
      }

        const statsFinales = {
          force: bonusForceEvo,
          endurance: bonusEndEvo,
          agilite: bonusAgiEvo,
          intelligence: bonusIntEvo
        };


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

  static async addLevel(id) {
    try {
      const personnage = await this.getCharacter(id);
      let nouvNiveau = personnage.niveau + 5
      let payload = {niveau: nouvNiveau}

      const response = await fetch(`${ENDPOINTC}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      return response.ok;
    }catch (err) {
      console.error("Erreur lors de l'ajout de niveau :", err);
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
    } catch (err) {
      console.error("Erreur lors de la mise à jour des armes :", err);
    }
  };

  static getMaxId = async () => {
    let response = await fetch(`${ENDPOINTC}`, { method: "GET" });
    let data = await response.json();
    let idMax = data.reduce((max, item) => Math.max(max, parseInt(item.id)), 0);
    return idMax;
  }

  static async aGagne(personnage,chanceVictoire){
    let niveauPlus=null;
    if(chanceVictoire<0.1){
      niveauPlus=5;
    }
    else if(chanceVictoire<0.3){
      niveauPlus=4;
    }
    else if(chanceVictoire<0.5){
      niveauPlus=3;
    }
    else if(chanceVictoire<0.6){
      niveauPlus=2;
    }
    else{
      niveauPlus=1;
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
