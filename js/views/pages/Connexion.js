export default class Connexion {
    async render() {
        return `
            <h2>Connexion</h2>
            <input type="text" id="username" placeholder="Entrez votre pseudo" />
            <button id="btnConnexion" onclick=window.location.href = '/#/characters'>Se connecter</button>
            <p id="message"></p>
        `;
    }

    async afterRender() {
        document.getElementById("btnConnexion").addEventListener("click", () => {
            let username = document.getElementById("username").value.trim();

            if (!username) {
                document.getElementById("message").textContent = "Veuillez entrer un pseudo valide";
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.includes(username)) {
                document.getElementById("message").textContent = "Ce pseudo est déjà pris";
            } else {
                users.push(username);
                window.location.href = '/#/characters'
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("username", username);
            }
        });
    }
}