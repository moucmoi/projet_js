import CharacterProvider from "../services/CharacterProvider.js";
import AffichagePerso from "./AffichagePerso.js";
import Utils from "../services/Utils.js";

export default class derouleCombat{
  render() {
    const view = `
      <link rel="stylesheet" href='../../../css/deroulementCombat.css'>
      <div id="combat-container">
  <h2 id="title" class="title">Combat en cours...</h2>
  <div class="progress-container" id="progress-container">
    <div class="progress-bar" id="bar"></div>
  </div>
  <div id="résultat"></div>
</div>
    `;
    return view;
  }

  afterRender() {
    console.log("test répétition 1");
    const bar = document.getElementById("bar");
    const title = document.getElementById("title");
    const resultat = document.getElementById("résultat");
    const divBar= document.getElementById("progress-container");
    const url = Utils.parseRequestURL();
    const affichagePerso = new AffichagePerso();

    const duree = 5000; 

    const commencement = performance.now();


    Promise.all([
      CharacterProvider.getCharacter(url.id),
      CharacterProvider.getCharacter(url.id2)
    ]).then(([perso1, perso2]) => {
      const statsp1 = perso1.characteristics.force + perso1.bonus.force +
                      perso1.characteristics.endurance + perso1.bonus.endurance +
                      perso1.characteristics.agilite + perso1.bonus.agilite +
                      perso1.characteristics.intelligence + perso1.bonus.intelligence;

      const statsp2 = perso2.characteristics.force + perso2.bonus.force +
                      perso2.characteristics.endurance + perso2.bonus.endurance +
                      perso2.characteristics.agilite + perso2.bonus.agilite +
                      perso2.characteristics.intelligence + perso2.bonus.intelligence;

      const total = statsp1 + statsp2;
      const ratiop1 = statsp1 / total;
      const ratiop2 = statsp2 / total;
      const tirage = Math.random();
      const gagnant = tirage < ratiop1 ? perso1 : perso2;
      const perdant = tirage > ratiop1 ? perso1 : perso2;


      let chancesV=null;
      let chancesL=null;
      if(gagnant==perso1){
        chancesV=ratiop1;
        chancesL=ratiop2;
      }
      else{
        chancesV=ratiop2;
        chancesL=ratiop1;
      }


      const animer = (time) => {
        const elapsed = time - commencement;
        const progress = Math.min(elapsed / duree, 1);
        bar.style.width = (progress * 100) + "%";

        if (progress < 1) {
          title.textContent = "Combat en cours...";
          requestAnimationFrame(animer);
        } else {
          console.log("test répétition 2");
          title.textContent = "";
          divBar.remove();
          resultat.innerHTML = `<h2 id="title" class="title">Le gagnant est :</h2>`;
          resultat.innerHTML += affichagePerso.render(gagnant);
          CharacterProvider.aGagne(gagnant,chancesV);
          CharacterProvider.aPerdu(perdant,chancesL);
          CharacterProvider.updateCharacter(gagnant.id);
          CharacterProvider.updateCharacter(perdant.id);
        }
      };

      requestAnimationFrame(animer);
    });
  }
}
