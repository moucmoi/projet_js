import CharacterProvider from "../services/CharacterProvider.js";

export async function creerPersoController() {
    document.getElementById("creerPerso").addEventListener("click", async () => {
        let name = document.getElementById("name").value.trim();
        let description = document.getElementById("description").value.trim();
        let force = parseInt(document.getElementById("force").value.trim());
        let agilite = parseInt(document.getElementById("agilite").value.trim());
        let intelligence = parseInt(document.getElementById("intelligence").value.trim());
        let endurance = parseInt(document.getElementById("endurance").value.trim());
        let importance = document.getElementById("importance").value.trim();
        let niveau = 0;
        let imageFile = document.getElementById("image").files[0];
        let image = "../../../images/personnages/no_image.png";

        if (name === "" || description === "") {
            document.getElementById("message").textContent = "Le nom et la description doivent être remplis.";
            return;
        }
        
        if (!Number.isFinite(force) || !Number.isFinite(agilite) || !Number.isFinite(intelligence) || !Number.isFinite(endurance)) {
            document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres valides.";
            return;
        }
        
        if (force < 0 || agilite < 0 || intelligence < 0 || endurance < 0) {
            document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres positifs.";
            return;
        }
      
        if (imageFile) {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);

                await new Promise((resolve) => {
                    reader.onload = () => {
                        image = reader.result;
                        resolve();
                    };
                });
            } catch (error) {
                document.getElementById("message").textContent = "Erreur lors du chargement de l'image.";
                return;
            }
        }

        let characterData = {
            name,
            importance,
            description,
            characteristics: { force, agilite, intelligence, endurance },
            arme_ids: [],
            evolutions: [{ effects: {} }],
            niveau,
            image,
            bonus: { force: 0, endurance: 0, agilite: 0, intelligence: 0 }
        };

        let success = await CharacterProvider.addCharacter(characterData);

        if (success) {
            window.location.href = "/#/characters";
        } else {
            document.getElementById("message").textContent = "Erreur lors de la création du personnage.";
        }
    });
}
