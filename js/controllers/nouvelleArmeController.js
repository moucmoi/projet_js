import ArmeProvider from "../services/ArmeProvider.js";
import Utils from "../services/Utils.js"

export async function creerArmeController() {
    document.getElementById("creerArme").addEventListener("click", async () => {
        let request = Utils.parseRequestURL();
        let id = request.id;
        let name = document.getElementById("name").value.trim();
        let force = parseInt(document.getElementById("force").value.trim());
        let agilite = parseInt(document.getElementById("agilite").value.trim());
        let intelligence = parseInt(document.getElementById("intelligence").value.trim());
        let endurance = parseInt(document.getElementById("endurance").value.trim());
        let imageFile = document.getElementById("image").files[0];
        let image = "../../../images/personnages/no_image.png";

        if (!name || isNaN(force) || isNaN(agilite) || isNaN(intelligence) || isNaN(endurance)) {
            document.getElementById("message").textContent = "Tous les champs doivent être remplis avec des valeurs valides.";
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

        let armeData = {
            id,
            name,
            effects: { force, agilite, intelligence, endurance },
            image,
        };

        let success = await ArmeProvider.addArme(armeData);

        if (success) {
            window.location.href = "/#/armes";
        } else {
            document.getElementById("message").textContent = "Erreur lors de la création de l'arme.";
        }
    });
}
