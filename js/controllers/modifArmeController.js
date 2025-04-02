import ArmeProvider from "../services/ArmeProvider.js";

export async function modifArmeController(armeID) {
    let arme = await ArmeProvider.getArme(armeID);

    document.getElementById("modifArme").addEventListener("click", async () => {
        let name = document.getElementById("name").value.trim();
        let force = parseInt(document.getElementById("force").value.trim());
        let agilite = parseInt(document.getElementById("agilite").value.trim());
        let intelligence = parseInt(document.getElementById("intelligence").value.trim());
        let endurance = parseInt(document.getElementById("endurance").value.trim());
        let imageFile = document.getElementById("image").files[0];
        let image = arme.image;

        if (name === "") {
            document.getElementById("message").textContent = "Le nom doit être rempli.";
            return;
        }

        if (!Number.isFinite(force) || !Number.isFinite(agilite) || !Number.isFinite(intelligence) || !Number.isFinite(endurance)) {
            document.getElementById("message").textContent = "Les caractéristiques doivent être des nombres valides.";
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
                document.getElementById("message").textContent =
                    "Erreur lors du chargement de l'image.";
                return;
            }
        }

        let armeData = {
            name,
            effects: {
                force,
                agilite,
                intelligence,
                endurance
            },
            image
        };

        let success = await ArmeProvider.updateArme(armeID, armeData);

        if (success) {
            window.location.assign(`/#/armes/${armeID}`);
        } else {
            document.getElementById("message").textContent = "Erreur de modification.";
        }
    });
}