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
            Headers:{
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

    static getNom=async(listeId)=>{
        let armesHtml = await Promise.all(
            listeId.map(async (idA) => {
                let arme = await this.getArme(idA); 
                return arme;
            })
        );
        return armesHtml;
    }
}


