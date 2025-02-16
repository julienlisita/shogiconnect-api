const users = [
    {
        id: 1,
        username: "ShadowNinja",
        country: "France",
        biography: "Je suis un maître de la furtivité, et j'ai toujours un coup d'avance sur mes adversaires. Le Shogi est pour moi une manière de développer mon esprit tactique et de rester en éveil. Depuis des années, j'étudie les stratégies et les mouvements des grands maîtres du Shogi. J'aime aussi analyser chaque partie que je joue, en cherchant constamment à m'améliorer. Pour moi, le Shogi n'est pas seulement un jeu, c'est un art qui reflète l'harmonie entre la patience, la précision et la détermination. Mon objectif est de devenir un joueur reconnu sur la scène internationale.",
        RoleId: 1,
        password: "password123",
        email: "shadowninja@example.com",
        avatar: null
    },
    {
        id: 2,
        username: "SakuraBlossom",
        country: "France",
        biography: "Passionnée par les arts traditionnels japonais, je trouve dans le Shogi un parfait mélange entre réflexion et beauté. Je suis toujours à la recherche de nouvelles stratégies pour surprendre mes adversaires et perfectionner mon style de jeu.",
        RoleId: 2,
        password: "password123",
        email: "sakurablossom@example.com",
        avatar: null
    },
    {
        id: 3,
        username: "DragonSlayer",
        country: "USA",
        biography: "Ayant grandi avec une passion pour les jeux de stratégie, j'ai découvert le Shogi il y a quelques années et je ne me lasse plus d'y jouer. J'aime l'aspect imprévisible du jeu et la manière dont chaque partie peut se renverser en un instant.",
        RoleId: 1,
        password: "password123",
        email: "dragonslayer@example.com",
        avatar: null
    },
    {
        id: 4,
        username: "SamuraiJack",
        country: "France",
        biography: "Le Shogi est pour moi une manière d'honorer les samouraïs du passé, avec des combats stratégiques sur le plateau. Chaque partie est une bataille d'honneur, et j'essaie de toujours respecter mes adversaires, peu importe l'issue.",
        RoleId: 2,
        password: "password123",
        email: "samuraijack@example.com",
        avatar: null
    },
    {
        id: 5,
        username: "RoninWarrior",
        country: "France",
        biography: "En tant que ronin moderne, je vois le Shogi comme un art de guerre miniature. Je cherche à maîtriser les techniques ancestrales du jeu et à forger mon propre chemin dans le monde compétitif du Shogi.",
        RoleId: 1,
        password: "password123",
        email: "roninwarrior@example.com",
        avatar: null
    },
    {
        id: 6,
        username: "SilentKiller",
        country: "Germany",
        biography: "Je suis un joueur de Shogi discret mais redoutable. Je préfère laisser mes mouvements parler pour moi plutôt que d'annoncer mes stratégies. Le silence et la patience sont mes meilleurs alliés dans chaque partie.",
        RoleId: 2,
        password: "password123",
        email: "silentkiller@example.com",
        avatar: null
    },
    {
        id: 7,
        username: "ShogunMaster",
        country: "France",
        biography: "Maître des stratégies complexes, je cherche toujours à anticiper plusieurs coups à l'avance. Le Shogi est un art dans lequel chaque pièce a un rôle crucial à jouer, et je m'efforce de maîtriser chaque aspect du jeu.",
        RoleId: 1,
        password: "password123",
        email: "shogunmaster@example.com",
        avatar: null
    },
    {
        id: 8,
        username: "pyxia",
        country: "France",
        biography: "J'aime l'idée que le Shogi soit une réflexion de la vie, avec des décisions critiques à prendre à chaque instant. Je cherche toujours à améliorer mes tactiques et à apprendre des meilleurs joueurs.",
        RoleId: 1,
        password: "password123",
        email: "pyxia@example.com",
        avatar: null
    },
    {
        id: 9,
        username: "jlisita",
        country: "France",
        biography: "Le Shogi est pour moi un jeu d'équilibre, entre patience et audace. J'aime tester de nouvelles stratégies et m'adapter rapidement à la situation sur le plateau.",
        RoleId: 2,
        password: "password123",
        email: "jlisita@example.com",
        avatar: null
    },
    {
        id: 10,
        username: "evacapri",
        country: "France",
        biography: "La concentration et la discipline sont les clés du succès dans le Shogi. Je travaille constamment à perfectionner mon jeu, en cherchant des moyens innovants de surpasser mes adversaires.",
        RoleId: 1,
        password: "password123",
        email: "evacapri@example.com",
        avatar: null
    },
    {
        id: 11,
        username: "BushidoSpirit",
        country: "France",
        biography: "Je m'inspire des principes du Bushido dans ma manière de jouer au Shogi. Le respect, l'honneur et la persévérance sont essentiels pour exceller dans ce jeu.",
        RoleId: 2,
        password: "password123",
        email: "bushidospirit@example.com",
        avatar: null
    },
    {
        id: 12,
        username: "ShinobiSoul",
        country: "Germany",
        biography: "Avec une approche subtile et calculée, je préfère des mouvements discrets et inattendus dans mes parties. Le Shogi est une extension de ma personnalité, où l'ombre et la lumière se rencontrent pour former des stratégies uniques.",
        RoleId: 1,
        password: "password123",
        email: "shinobisoul@example.com",
        avatar: null
    },
    {
        id: 13,
        username: "FurySamurai",
        country: "France",
        biography: "Pour moi, chaque partie de Shogi est une bataille épique. J'aime prendre des risques calculés et défier mes adversaires avec des tactiques imprévisibles.",
        RoleId: 2,
        password: "password123",
        email: "furysamurai@example.com",
        avatar: null
    },
    {
        id: 14,
        username: "KuroHoshi",
        country: "France",
        biography: "Mon style de jeu est empreint de mystère. Je préfère que mes adversaires ne sachent jamais ce que je prépare, gardant mes intentions cachées jusqu'au dernier moment.",
        RoleId: 1,
        password: "password123",
        email: "kurohoshi@example.com",
        avatar: null
    },
    {
        id: 15,
        username: "WhiteTiger",
        country: "USA",
        biography: "Avec une passion pour la stratégie et l'adaptation rapide, le Shogi est le terrain parfait pour tester mes limites et apprendre des autres joueurs.",
        RoleId: 2,
        password: "password123",
        email: "whitetiger@example.com",
        avatar: null
    },
    {
        id: 16,
        username: "CrimsonBlade",
        country: "France",
        biography: "Chaque mouvement dans le Shogi est une danse, et j'essaie de rendre mes parties aussi fluides que possible, avec des stratégies élégantes et efficaces.",
        RoleId: 1,
        password: "password123",
        email: "crimsonblade@example.com",
        avatar: null
    },
    {
        id: 17,
        username: "YagyuWarrior",
        country: "France",
        biography: "Suivant les traces des grands guerriers Yagyu, je vois chaque partie de Shogi comme une opportunité de prouver ma valeur et d'améliorer mes compétences en stratégie.",
        RoleId: 2,
        password: "password123",
        email: "yagyuwarrior@example.com",
        avatar: null
    },
    {
        id: 18,
        username: "TacticianMaster",
        country: "Canada",
        biography: "Stratégie et calcul sont mes alliés dans le Shogi. J'adore passer des heures à analyser des parties historiques et à mettre en pratique mes connaissances contre d'autres joueurs. Mon rêve est de participer à des tournois internationaux.",
        RoleId: 1,
        password: "simplepassword123",
        email: "tacticianmaster@example.com",
        avatar: null
      },
      {
        id: 19,
        username: "KifuExpert",
        country: "Japon",
        biography: "Passionné de Shogi, je suis un expert en Kifu et j'adore enseigner aux débutants. J'espère créer une communauté autour de ce jeu fascinant.",
        RoleId: 1,
        password: "kifuexpert123",
        email: "kifu.expert@example.com",
        avatar: null
      },
      {
        id: 20,
        username: "StrategistKing",
        country: "USA",
        biography: "Je suis un stratège dans l'âme. J'adore passer des heures à réfléchir à des mouvements dans le Shogi et à apprendre de nouvelles techniques.",
        RoleId: 1,
        password: "strategistking123",
        email: "strategistking@example.com",
        avatar: null
      },
      {
        id: 21,
        username: "BishopQueen",
        country: "France",
        biography: "Enthousiaste du Shogi, je suis toujours à la recherche de nouveaux adversaires pour tester mes compétences.",
        RoleId: 1,
        password: "bishopqueen123",
        email: "bishop.queen@example.com",
        avatar: null
      },
      {
        id: 22,
        username: "KnightRider",
        country: "Royaume-Uni",
        biography: "Joueur de Shogi depuis 10 ans, je suis un grand fan de compétitions en ligne et j'aime partager mes expériences.",
        RoleId: 1,
        password: "knightrider123",
        email: "knight.rider@example.com",
        avatar: null
      },
      {
        id: 23,
        username: "PawnStorm",
        country: "Allemagne",
        biography: "Amateur de Shogi, je cherche constamment à m'améliorer et à rencontrer de nouveaux amis dans le monde du jeu.",
        RoleId: 1,
        password: "pawnstorm123",
        email: "pawn.storm@example.com",
        avatar: null
      },
      {
        id: 24,
        username: "GameMaster",
        country: "Espagne",
        biography: "Passionné par tous les jeux de stratégie, le Shogi est mon favori. J'aime l'aspect culturel et stratégique du jeu.",
        RoleId: 1,
        password: "gamemaster123",
        email: "game.master@example.com",
        avatar: null
      },
      {
        id: 25,
        username: "RookStar",
        country: "Italie",
        biography: "Le Shogi est plus qu'un jeu pour moi. C'est une forme d'art et de culture que j'apprécie profondément.",
        RoleId: 1,
        password: "rookstar123",
        email: "rook.star@example.com",
        avatar: null
      },
      {
        id: 26,
        username: "ShogiWizard",
        country: "Russie",
        biography: "Je suis un magicien du Shogi ! J'aime explorer des stratégies créatives et surprendre mes adversaires.",
        RoleId: 1,
        password: "shogiwizard123",
        email: "shogi.wizard@example.com",
        avatar: null
      },
      {
        id: 27,
        username: "EndgameGuru",
        country: "Chine",
        biography: "Expert en finales de Shogi, je peux vous aider à améliorer vos compétences dans cette phase cruciale du jeu.",
        RoleId: 1,
        password: "endgameguru123",
        email: "endgame.guru@example.com",
        avatar: null
      },
      {
        id: 28,
        username: "ShogiNinja",
        country: "Corée du Sud",
        biography: "Je suis un joueur de Shogi passionné, cherchant toujours de nouvelles techniques pour affiner mon jeu.",
        RoleId: 1,
        password: "shogininja123",
        email: "shogi.ninja@example.com",
        avatar: null
      },
      {
        id: 29,
        username: "CheckmateArtist",
        country: "Brésil",
        biography: "Le Shogi est ma passion et je considère chaque partie comme une œuvre d'art à créer.",
        RoleId: 1,
        password: "checkmateartist123",
        email: "checkmate.artist@example.com",
        avatar: null
      },
      {
        id: 30,
        username: "PawnMaster",
        country: "Argentine",
        biography: "Joueur de Shogi expérimenté, je me concentre sur les mouvements de pion pour construire des stratégies solides.",
        RoleId: 1,
        password: "pawnmaster123",
        email: "pawn.master@example.com",
        avatar: null
      },
      {
        id: 31,
        username: "TacticsMaster",
        country: "Inde",
        biography: "Stratégies et tactiques sont mon domaine. J'adore analyser les parties pour apprendre et m'améliorer.",
        RoleId: 1,
        password: "tacticsmaster123",
        email: "tactics.master@example.com",
        avatar: null
      },
      {
        id: 32,
        username: "ShogiFanatic",
        country: "Australie",
        biography: "Fanatique du Shogi, je suis toujours prêt à relever des défis contre d'autres passionnés.",
        RoleId: 1,
        password: "shogifanatic123",
        email: "shogi.fanatic@example.com",
        avatar: null
      },
      {
        id: 33,
        username: "KingOfStrategy",
        country: "Mexique",
        biography: "Le Shogi est une passion, et j'adore enseigner aux autres. Rejoignez-moi pour apprendre ensemble !",
        RoleId: 1,
        password: "kingofstrategy123",
        email: "king.of.strategy@example.com",
        avatar: null
      },
      {
        id: 34,
        username: "ShogiScholar",
        country: "Canada",
        biography: "Chercheur en stratégie de jeu, le Shogi est au cœur de mes études. J'adore analyser les parties.",
        RoleId: 1,
        password: "shogischolar123",
        email: "shogi.scholar@example.com",
        avatar: null
      },
      {
        id: 35,
        username: "KnightOfShogi",
        country: "Royaume-Uni",
        biography: "Je suis un passionné de Shogi et j'adore partager mes connaissances avec d'autres joueurs.",
        RoleId: 1,
        password: "knightofshogi123",
        email: "knight.of.shogi@example.com",
        avatar: null
      },
      {
        id: 36,
        username: "ShogiExplorer",
        country: "France",
        biography: "Explorateur du Shogi, j'aime découvrir de nouvelles stratégies et techniques à chaque partie.",
        RoleId: 1,
        password: "shogiexplorer123",
        email: "shogi.explorer@example.com",
        avatar: null
      },
      {
        id: 37,
        username: "EndgameStrategist",
        country: "Allemagne",
        biography: "Maître des fins de partie, j'adore enseigner aux autres comment bien terminer une partie.",
        RoleId: 1,
        password: "endgamestrategist123",
        email: "endgame.strategist@example.com",
        avatar: null
      },
      {
        id: 38,
        username: "ShogiSensei",
        country: "Japon",
        biography: "Enseignant de Shogi, je m'efforce de transmettre ma passion et mes connaissances aux nouvelles générations.",
        RoleId: 1,
        password: "shogisensei123",
        email: "shogi.sensei@example.com",
        avatar: null
      },
      {
        id: 39,
        username: "RookMaster",
        country: "Italie",
        biography: "Je suis un joueur passionné, cherchant toujours à perfectionner mon jeu. La stratégie est ma seconde nature.",
        RoleId: 1,
        password: "rookmaster123",
        email: "rook.master@example.com",
        avatar: null
      },
      {
        id: 40,
        username: "ShogiChampion",
        country: "USA",
        biography: "Champion de Shogi, je participe à des tournois internationaux et j'adore rencontrer d'autres passionnés.",
        RoleId: 1,
        password: "shogichampion123",
        email: "shogi.champion@example.com",
        avatar: null
      },
      {
        id: 41,
        username: "PawnStormer",
        country: "Brésil",
        biography: "Amateur de stratégie, je m'efforce d'améliorer mes compétences en jouant régulièrement au Shogi.",
        RoleId: 1,
        password: "pawnstormer123",
        email: "pawn.stormer@example.com",
        avatar: null
      },
      {
        id: 42,
        username: "ShogiLover",
        country: "France",
        biography: "Le Shogi est ma passion. J'aime enseigner et partager des conseils avec d'autres joueurs.",
        RoleId: 1,
        password: "shogilover123",
        email: "shogi.lover@example.com",
        avatar: null
      },
      {
        id: 43,
        username: "StrategyGuru",
        country: "Inde",
        biography: "Je suis un expert en stratégie et j'adore partager mes idées et techniques sur le Shogi.",
        RoleId: 1,
        password: "strategyguru123",
        email: "strategy.guru@example.com",
        avatar: null
      },
      {
        id: 44,
        username: "ShogiInnovator",
        country: "Canada",
        biography: "Innovateur du Shogi, j'aime expérimenter de nouvelles stratégies et concepts de jeu.",
        RoleId: 1,
        password: "shogiinnovator123",
        email: "shogi.innovator@example.com",
        avatar: null
      },
      {
        id: 45,
        username: "Tactician",
        country: "Royaume-Uni",
        biography: "Tacticien dans l'âme, je passe des heures à analyser les parties et à améliorer mon jeu.",
        RoleId: 1,
        password: "tactician123",
        email: "tactician@example.com",
        avatar: null
      },
      {
        id: 46,
        username: "ShogiStrategist",
        country: "Japon",
        biography: "Stratégiste du Shogi, j'adore partager mes analyses et mes stratégies avec d'autres joueurs.",
        RoleId: 1,
        password: "shogistrategist123",
        email: "shogi.strategist@example.com",
        avatar: null
      },
      {
        id: 47,
        username: "CheckmateMaster",
        country: "Allemagne",
        biography: "Maître des échecs, je suis également un passionné de Shogi, cherchant à relier les deux mondes.",
        RoleId: 1,
        password: "checkmatemaster123",
        email: "checkmate.master@example.com",
        avatar: null
      },
      {
        id: 48,
        username: "ShogiPhilosopher",
        country: "Espagne",
        biography: "Philosophe du Shogi, j'aime réfléchir à la stratégie et à la psychologie du jeu.",
        RoleId: 1,
        password: "shogiphilosopher123",
        email: "shogi.philosopher@example.com",
        avatar: null
      },
      {
        id: 49,
        username: "ShogiMaster",
        country: "Russie",
        biography: "Maître du Shogi, j'ai des années d'expérience et j'adore enseigner aux nouvelles générations.",
        RoleId: 1,
        password: "shogimaster123",
        email: "shogi.master@example.com",
        avatar: null
      },
      {
        id: 50,
        username: "KnightStrategist",
        country: "Corée du Sud",
        biography: "Je suis un stratège en quête de nouveaux défis au Shogi. J'adore apprendre des autres joueurs.",
        RoleId: 1,
        password: "knightstrategist123",
        email: "knight.strategist@example.com",
        avatar: null
      }
    ]


module.exports = users;