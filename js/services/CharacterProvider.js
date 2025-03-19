import {ENDPOINTC} from "../config.js";
export default class CharacterProvider{
    static fetchCharacter=async(limit=20)=>{
        const options={
            method:'GET',
            Headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const response=await fetch(`${ENDPOINTC}?_limit=${limit}`,options);
            const json=await response.json();
            return json;
        }
        catch(err){
            console.log("Error getting documents",err);
        }
    }

    static getCharacter=async(id)=>{
        const options={
            method:'GET',
            Headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const response=await fetch(`${ENDPOINTC}/`+id,options);
            const json=await response.json();
            return json;
        }
        catch(err){
            console.log("Error getting documents",err);
        }
    }

    static getFavoris=async()=>{
        const options={
            method:'GET',
            Headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const response=await fetch(`${ENDPOINTC}`,options);
            const json=await response.json();
            const liste_favoris = JSON.parse(localStorage.getItem("Favoris"));
            const filteredJson = json.filter(item => liste_favoris.includes(String(item.id)) || liste_favoris.includes(Number(item.id)));
            return filteredJson;
        }
        catch(err){
            console.log("Error getting documents",err);
        }
    }

    static updateCharacters=async()=>{

    }

    static ajouterArme=async(idPerso,id)=>{
        const personnage=this.getCharacter(idPerso);
        let lesArmes= personnage["armes_ids"];
        lesArmes.add(id);
        this.updateCharacters();
    }

    static retirerArme=async(idPerso,id)=>{
        const personnage=this.getCharacter(idPerso);
        let lesArmes= personnage["armes_ids"];
        lesArmes.remove(id);
        this.updateCharacters();
    }


}


