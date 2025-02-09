const userActivities = [
    {
      id: 1,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 1, // L'utilisateur qui crée le topic
      related_id: 1, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 2,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 10, // L'utilisateur qui commente
      related_id: 1, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 3,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 12, // L'utilisateur qui crée le topic
      related_id: 2, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 4,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 25, // L'utilisateur qui commente
      related_id: 2, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 5,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 7, // L'utilisateur qui crée le topic
      related_id: 3, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 6,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 18, // L'utilisateur qui commente
      related_id: 3, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 7,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 9, // L'utilisateur qui crée le topic
      related_id: 4, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 8,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 5, // L'utilisateur qui commente
      related_id: 4, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 9,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 15, // L'utilisateur qui crée le topic
      related_id: 5, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 10,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 12, // L'utilisateur qui commente
      related_id: 5, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 11,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 20, // L'utilisateur qui crée le topic
      related_id: 6, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 12,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 23, // L'utilisateur qui commente
      related_id: 6, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 13,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 25, // L'utilisateur qui crée le topic
      related_id: 7, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 14,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 7, // L'utilisateur qui commente
      related_id: 7, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 15,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 30, // L'utilisateur qui crée le topic
      related_id: 8, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 16,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 14, // L'utilisateur qui commente
      related_id: 8, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 17,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 35, // L'utilisateur qui crée le topic
      related_id: 9, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 18,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 32, // L'utilisateur qui commente
      related_id: 9, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
    {
      id: 19,
      activity_type: 1, // Type d'activité : Création d'un topic
      UserId: 40, // L'utilisateur qui crée le topic
      related_id: 10, // L'ID du topic
      related_type: "topic", // Type de l'objet lié : topic
    },
    {
      id: 20,
      activity_type: 2, // Type d'activité : Commentaire sur un topic
      UserId: 16, // L'utilisateur qui commente
      related_id: 10, // L'ID du commentaire
      related_type: "comment", // Type de l'objet lié : commentaire
    },
  ];
  
  module.exports = userActivities;