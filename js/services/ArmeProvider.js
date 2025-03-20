import {ENDPOINTA} from "../config.js";
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
}


