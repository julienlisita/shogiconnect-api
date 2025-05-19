const { ScheduledGame, User, UserActivity } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");
const { AdminActivity } = require("../db/sequelizeSetup");
const { updateAdminStats } = require('../services/adminStatsService');
const { updateSiteStats } = require("../services/siteStatsService");
const { updateUserStats } = require("../services/userStatsService");
const ROLE_ADMIN = 2;

// Récupérer la liste des parties créées
const findAllScheduledGames = async (req, res) => {
    try {
        const result = await ScheduledGame.findAll();
        return res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Récupérer une partie par id
const findScheduledGameById = async (req, res) => {
    try {
        const result = await ScheduledGame.findByPk(req.params.id, { include: User });
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }
        res.json({ data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Créer une partie en tant qu'organisateur
const createScheduledGame = async (req, res) => {
    try {
        const { status = "disponible", level, rendezVousAt } = req.body;
        const OrganizerId = req.user.id; // ID de l'utilisateur authentifié

        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(OrganizerId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Créer le scheduled game
        const result = await ScheduledGame.create({ 
            OrganizerId, // Utiliser l'ID de l'utilisateur authentifié
            ParticipantId: null, 
            status, 
            level, 
            rendezVousAt 
        });

        // Répondre avec le scheduled game créé
        res.status(201).json({ message: 'Jeu créé', data: result });

        // Enregistrer l'activité de création du scheduled game
        await UserActivity.create({
            activity_type: 'CREATE_SCHEDULED_GAME',
            related_id: result.id,
            related_type: 'scheduled_game',
            related_name: null,
            user_id: OrganizerId,
        });

        // Mettre à jour les statistiques de l'utilisateur
        await updateUserStats(OrganizerId, 'CREATE_SCHEDULED_GAME');
        // Mettre à jour les statistique du site    
        await updateSiteStats('CREATE_SCHEDULED_GAME');
    } catch (error) {
        errorHandler(error, res);
    }
};

// Modifier une partie en tant qu'organisateur
const updateScheduledGame = async (req, res) => {
    try {
        const result = await ScheduledGame.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }

        await result.update(req.body);
        res.status(200).json({ message: 'Jeu modifié', data: result });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Supprimer une partie en tant qu'organisateur
const deleteScheduledGame = async (req, res) => {
    try {

        const userRole = req.user.RoleId;
        const squeduledGameId = req.params.id;
        const adminId = req.user.id; // ID de l'admin (si applicable)
        
        const scheduledGame = await ScheduledGame.findByPk(req.params.id, {
            include: { model: User, as: 'Organizer' } 
        });

        if (!scheduledGame) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }
        
        if (scheduledGame.OrganizerId !== req.user.id && req.user.RoleId !== ROLE_ADMIN) {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer cette partie." });
        }

        // Récupérer le nom de l'organisateur
        const organizerName = scheduledGame.Organizer ? scheduledGame.Organizer.username : "Inconnu";


        await scheduledGame.destroy();
        res.status(200).json({ message: 'Partie supprimée avec succès' });

         // Si c'est un administrateur, enregistrer l'activité
         if (userRole === ROLE_ADMIN) {
            await AdminActivity.create({
                activity_type: 'DELETE_SCHEDULED_GAME',
                related_id: squeduledGameId,
                related_type: 'Comment',
                related_name: organizerName, 
                admin_id: adminId
            });
        }
        // Mettre à jour les statistiques de l'admin
        await updateAdminStats(req.user.id, 'DELETE_SCHEDULED_GAME');
        // Mettre à jour les statistique du site    
        await updateSiteStats('DELETE_SCHEDULED_GAME');

    } catch (error) {
        errorHandler(error, res);
    }
};

 // S'inscrire à une partie en tant que participant
const joinScheduledGame = async (req, res) => {
    try {
        const scheduledGame = await ScheduledGame.findByPk(req.params.id);
        if (!scheduledGame) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }

        if (scheduledGame.ParticipantId) {
            return res.status(400).json({ message: 'Cette partie a déjà un participant' });
        }

        scheduledGame.ParticipantId = req.user.id;
        scheduledGame.status = "reservée";
        await scheduledGame.save();

        res.status(200).json({ message: 'Inscription réussie', data: scheduledGame });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Se désinscrire d'une partie en tant que participant
const unsubscribeFromScheduledGame = async (req, res) => {
    try {
        const scheduledGame = await ScheduledGame.findByPk(req.params.id);

        if (!scheduledGame) {
            return res.status(404).json({ message: 'Partie non trouvée' });
        }

        // Vérification : seul le participant lui même ou un admin pour le désinscrire
        if (scheduledGame.ParticipantId !== req.user.id && req.user.RoleId !== ROLE_ADMIN) {
            return res.status(403).json({ message: "Vous n'avez pas de droit de désincrire ce participant" });
        }

        scheduledGame.ParticipantId = null;
        scheduledGame.status = "disponible";
        await scheduledGame.save();

        res.status(200).json({ message: 'Désinscription réussie', data: scheduledGame });
    } catch (error) {
        errorHandler(error, res);
    }
};

module.exports = { findAllScheduledGames, findScheduledGameById, createScheduledGame, updateScheduledGame, deleteScheduledGame, joinScheduledGame, unsubscribeFromScheduledGame };