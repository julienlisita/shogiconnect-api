const userActivities = [
    {
      id: 1,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 1, // L'utilisateur qui crée le topic
      related_id: 1, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 2,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 12, // L'utilisateur qui crée le topic
      related_id: 2, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 3,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 7, // L'utilisateur qui crée le topic
      related_id: 3, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 4,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 9, // L'utilisateur qui crée le topic
      related_id: 4, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 5,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 15, // L'utilisateur qui crée le topic
      related_id: 5, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 6,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 20, // L'utilisateur qui crée le topic
      related_id: 6, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 7,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 25, // L'utilisateur qui crée le topic
      related_id: 7, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 8,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 30, // L'utilisateur qui crée le topic
      related_id: 8, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 9,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 35, // L'utilisateur qui crée le topic
      related_id: 9, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 10,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 40, // L'utilisateur qui crée le topic
      related_id: 10, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 11,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 5, // L'utilisateur qui crée le topic
      related_id: 11, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 12,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 6, // L'utilisateur qui crée le topic
      related_id: 12, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 13,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 18, // L'utilisateur qui crée le topic
      related_id: 13, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 14,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 14, // L'utilisateur qui crée le topic
      related_id: 14, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 15,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 10, // L'utilisateur qui crée le topic
      related_id: 15, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 16,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 45, // L'utilisateur qui crée le topic
      related_id: 16, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 17,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 2, // L'utilisateur qui crée le topic
      related_id: 17, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 18,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 3, // L'utilisateur qui crée le topic
      related_id: 18, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 19,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 19, // L'utilisateur qui crée le topic
      related_id: 19, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 20,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 11, // L'utilisateur qui crée le topic
      related_id: 20, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
      description: "a créé un topic",
    },
    {
      id: 21,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 10, // L'utilisateur qui commente
      related_id: 1, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 22,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 25, // L'utilisateur qui commente
      related_id: 2, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 23,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 18, // L'utilisateur qui commente
      related_id: 3, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 24,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 5, // L'utilisateur qui commente
      related_id: 4, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 25,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 12, // L'utilisateur qui commente
      related_id: 5, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 26,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 23, // L'utilisateur qui commente
      related_id: 6, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 27,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 7, // L'utilisateur qui commente
      related_id: 7, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 28,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 14, // L'utilisateur qui commente
      related_id: 8, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 29,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 32, // L'utilisateur qui commente
      related_id: 9, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 30,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 16, // L'utilisateur qui commente
      related_id: 10, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 31,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 28, // L'utilisateur qui commente
      related_id: 11, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 32,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 21, // L'utilisateur qui commente
      related_id: 12, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 33,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 11, // L'utilisateur qui commente
      related_id: 13, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 34,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 24, // L'utilisateur qui commente
      related_id: 14, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 35,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 6, // L'utilisateur qui commente
      related_id: 15, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 36,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 17, // L'utilisateur qui commente
      related_id: 16, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 37,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 7, // L'utilisateur qui commente
      related_id: 17, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 38,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 33, // L'utilisateur qui commente
      related_id: 18, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 39,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 9, // L'utilisateur qui commente
      related_id: 19, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 40,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 13, // L'utilisateur qui commente
      related_id: 20, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 41,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 2, // L'utilisateur qui commente
      related_id: 21, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 42,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 4, // L'utilisateur qui commente
      related_id: 22, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 43,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 29, // L'utilisateur qui commente
      related_id: 23, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 44,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 5, // L'utilisateur qui commente
      related_id: 24, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 45,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 26, // L'utilisateur qui commente
      related_id: 25, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 46,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 19, // L'utilisateur qui commente
      related_id: 26, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 47,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 8, // L'utilisateur qui commente
      related_id: 27, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 48,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 3, // L'utilisateur qui commente
      related_id: 28, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 49,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 27, // L'utilisateur qui commente
      related_id: 29, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 50,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 20, // L'utilisateur qui commente
      related_id: 30, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 51,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 15, // L'utilisateur qui commente
      related_id: 31, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 52,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 31, // L'utilisateur qui commente
      related_id: 32, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 53,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 22, // L'utilisateur qui commente
      related_id: 33, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 54,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 9, // L'utilisateur qui commente
      related_id: 34, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 55,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 34, // L'utilisateur qui commente
      related_id: 35, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 56,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 2, // L'utilisateur qui commente
      related_id: 36, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 57,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 35, // L'utilisateur qui commente
      related_id: 37, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 58,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 10, // L'utilisateur qui commente
      related_id: 38, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 59,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 8, // L'utilisateur qui commente
      related_id: 39, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 60,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 36, // L'utilisateur qui commente
      related_id: 40, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 61,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 17, // L'utilisateur qui commente
      related_id: 41, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 62,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 12, // L'utilisateur qui commente
      related_id: 42, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 63,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 19, // L'utilisateur qui commente
      related_id: 43, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 64,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 23, // L'utilisateur qui commente
      related_id: 44, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },

    {
      id: 65,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 6, // L'utilisateur qui commente
      related_id: 45, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 66,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 15, // L'utilisateur qui commente
      related_id: 46, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 67,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 39, // L'utilisateur qui commente
      related_id: 47, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 68,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 25, // L'utilisateur qui commente
      related_id: 48, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 69,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 40, // L'utilisateur qui commente
      related_id: 49, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
    {
      id: 70,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 11, // L'utilisateur qui commente
      related_id: 50, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
      description: "a créé un commentaire",
    },
  ];
  
  module.exports = userActivities;