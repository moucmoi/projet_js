import Utils from "../../services/Utils.js";
export default class AffichageArme {
    renderAll(arme) {
        return `
            <link rel="stylesheet" href='../../../css/PersonnageMenu.css'>

            <a href='/#/armes/${arme.id}' class="personnage-card-link" id="personnage-card-link">
                <section class="personnage-section" id="personnage-section">
                    <img loading="lazy" src="${arme.image}" alt="${arme.name}" class="personnage-img" id="personnage-img">
                    <h3 class="personnage-name" id="personnage-name">${arme.name}</h3>
                </section>
            </a>
        `;
    }

    renderSupp(arme) {
        let request = Utils.parseRequestURL();
        return `
          <link rel="stylesheet" href='../../../css/PersonnageMenu.css'>
          <a href='/#/characters/${request.id}/suppression/${arme.id}' class="personnage-card-link" id="personnage-card-link">
              <section class="personnage-section" id="personnage-section">
                  <img loading="lazy"  src="${arme.image}" alt="${arme.name}" class="personnage-img" id="personnage-img">
                  <h3 class="personnage-name" id="personnage-name">${arme.name}</h3>
              </section>
          </a>
        `;
    }

      renderAdd(arme) {
        let request = Utils.parseRequestURL();
        return `
          <link rel="stylesheet" href='../../../css/PersonnageMenu.css'>
          <a href='/#/characters/${request.id}/ajout/${arme.id}' class="personnage-card-link" id="personnage-card-link">
              <section class="personnage-section" id="personnage-section">
                  <img loading="lazy"  src="${arme.image}" alt="${arme.name}" class="personnage-img" id="personnage-img">
                  <h3 class="personnage-name" id="personnage-name">${arme.name}</h3>
              </section>
          </a>
        `;
    }
}

