import {ENDPOINT} from "../config.js";

export default class CharacterProvider{
    static fetchCharacter=async(limit=10)=>{
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

    static rateCharacter = async (id, username, note) => {
        try {
            let character = await this.getCharacter(id);
    
            if (!character.notes) {
                character.notes = {};
            }
            character.notes[username] = note;
    
            const response = await fetch(`${ENDPOINT}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notes: character.notes })
            });
    
            return response.ok;
        } catch (err) {
            console.log("Error rating character", err);
        }
    }

}