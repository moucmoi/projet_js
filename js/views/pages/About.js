export default class About{
     async render(){
        return `
            <link rel="stylesheet" href='../../../css/about.css'>

            <div class="about-container">
                <h1 class="title-main">Bienvenue dans l’univers des criminels les plus légendaires de GTA ! 🚗💥</h1>

                <p class="intro-text">Plongez au cœur du chaos, là où les rues ne dorment jamais et où les balles pleuvent plus souvent que la pluie.
                    Cette application vous ouvre les portes du monde impitoyable de <strong>Grand Theft Auto</strong>, en vous permettant d’explorer 
                    <strong>les personnages les plus marquants</strong> de la saga et l’arsenal dévastateur qui les accompagne.
                </p>

                <h2 class="section-title" id="legends">Explorez les légendes du crime 👥</h2>
                <p class="section-description">Chaque personnage de GTA a une histoire, une réputation et un style bien à lui. Découvrez les 
                    <strong>plus grands gangsters, criminels et anti-héros</strong> de la franchise :
                </p>
                <ul class="character-list">
                    <li class="character-item"><strong>Trevor Phillips</strong>, l’incarnation du chaos pur. 🔥</li>
                    <li class="character-item"><strong>Carl "CJ" Johnson</strong>, le roi des rues de Los Santos. 🏙️</li>
                    <li class="character-item"><strong>Tommy Vercetti</strong>, le parrain de Vice City. 🕶️</li>
                    <li class="character-item">… et bien d’autres figures emblématiques !</li>
                </ul>

                <h2 class="section-title" id="arsenal">Découvrez leur arsenal de destruction 🔫</h2>
                <p class="section-description">Dans GTA, une bonne réputation se forge souvent à coups de feu. Chaque personnage possède son <strong>arme de prédilection</strong>, 
                    qu’il manie avec talent pour semer la terreur. Retrouvez un <strong>catalogue détaillé des armes</strong>, de la simple batte de baseball aux fusils d’assaut les plus destructeurs.
                </p>

                <h2 class="section-title" id="favorites">Ajoutez vos favoris et notez les personnages ⭐</h2>
                <p class="section-description">Vous avez un criminel préféré ? Un tueur de légende que vous respectez ?</p>
                <ul class="favorite-list">
                    <li class="favorite-item">📌 <strong>Ajoutez-le en favoris</strong> et retrouvez-le facilement à tout moment.</li>
                    <li class="favorite-item">⭐ <strong>Notez ses compétences</strong>, son style et son charisme pour comparer avec d’autres joueurs.</li>
                </ul>

                <h2 class="section-title" id="search">🔍 Recherchez, filtrez et plongez dans les données</h2>
                <p class="section-description">Notre <strong>moteur de recherche avancé</strong> vous permet de retrouver n’importe quel personnage en fonction de son nom, 
                    de son gang ou de son arme favorite. <strong>Trouvez en quelques secondes</strong> celui qui correspond à votre style de jeu.
                </p>

                <h2 class="section-title" id="app-features">📜 Une application complète et immersive</h2>
                <p class="section-description">Avec son <strong>interface fluide et intuitive</strong>, cette application vous propose une expérience totalement interactive, 
                    où vous pourrez naviguer à travers :
                </p>
                <ul class="features-list">
                    <li class="features-item">✅ Un <strong>listing des personnages</strong> avec leurs détails et statistiques.</li>
                    <li class="features-item">✅ Une <strong>fiche détaillée</strong> pour chaque criminel et son arsenal.</li>
                    <li class="features-item">✅ Un <strong>système de notation et de favoris</strong> pour garder une trace de vos préférés.</li>
                    <li class="features-item">✅ Une <strong>pagination optimisée</strong> pour afficher les données sans ralentissements.</li>
                </ul>

                <p class="closing-text"><strong>🌍 Dans GTA, seule la loi du plus fort règne. Qui sera votre personnage favori ? Plongez dès maintenant 
                    dans l’univers des légendes criminelles et choisissez votre camp !</strong> 🚔🔥
                </p>
            </div>

        `;
    }
}