import {ENDPOINT} from "../config.js";
export default class CharacterProvider{
    static fetchCharacter=async(limit=20)=>{
        const options={
            method:'GET',
            Headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            const response=await fetch(`${ENDPOINT}?_limit=${limit}`,options);
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
            const response=await fetch(`${ENDPOINT}/`+id,options);
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
            const response=await fetch(`${ENDPOINT}`,options);
            const json=await response.json();
            const liste_favoris = JSON.parse(localStorage.getItem("Favoris"));
            const filteredJson = json.filter(item => liste_favoris.includes(String(item.id)) || liste_favoris.includes(Number(item.id)));
            return filteredJson;
        }
        catch(err){
            console.log("Error getting documents",err);
        }
    }

}


