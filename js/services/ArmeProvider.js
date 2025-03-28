import {ENDPOINTA} from "../config.js";
import CharacterProvider from "./CharacterProvider.js";
export default class ArmeProvider{
    static fetchArme=async(limit=20)=>{
        const options={
            method:'GET',
            Headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const response=await fetch(`${ENDPOINTA}?_limit=${limit}`,options);
            const json=await response.json();
            return json;
        }
        catch(err){
            console.log("Error getting documents",err);
        }
    }

    static getArme=async(id)=>{
        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const response=await fetch(`${ENDPOINTA}/`+id,options);
            const json=await response.json();
            return json;
        }
        catch(err){
            console.log("Error getting documents",err);
        }
    }
  
    static async addArme(armeData) {
        try {
            let response = await fetch(`${ENDPOINTA}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(armeData),
            });
    
            return response.ok;
        } catch (err) {
            console.error("Erreur lors de l'ajout de l'arme", err);
            return false;
        }
    }

    static async updateArme(id, armeData) {
        try {
            let response = await fetch(`${ENDPOINTA}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(armeData),
            });
            CharacterProvider.updateAllCharacter();
            return response.ok;
        } catch (err) {
            console.error("Erreur lors de la modification de l'arme :", err);
            return false;
        }
    }

    static async deleteArme(id) {
        try {
            let response = await fetch(`${ENDPOINTA}/${id}`, {
                method: "DELETE",
            });
    
            return response.ok;
        } catch (err) {
            console.error("Erreur lors de la suppression de l'arme :", err);
            return false;
        }
    }

    static getNom=async(listeId)=>{
        if(listeId.length === 0) {
            return [];
        }
        let armesHtml = await Promise.all(
            listeId.map(async (idA) => {
                let arme = await this.getArme(idA); 
                return arme;
            })
        );
        return armesHtml;
    }

    static getMaxId = async () => {
        let response = await fetch(`${ENDPOINTA}`, { method: "GET" });
        let data = await response.json();
        let idMax = data.reduce((max, item) => Math.max(max, parseInt(item.id)), 0);
        return idMax;
      }
}


