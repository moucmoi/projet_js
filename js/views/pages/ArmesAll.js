import ArmeProvider from "../../services/ArmeProvider.js";
export default class ArmesAll{
     async render(){
        let armes =await ArmeProvider.fetchArme(20);
        console.log(armes);
        let view=`
        <h2>Les armes</h2>
        <ul>
        ${armes.map(arme=>
            `
            <a href='/#/armes/${arme.id}'><li>${arme.name}</li></a>
            `
        ).join('\n')}
        </ul>
        `;
        return view;
    }
}