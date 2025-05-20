const { Topic, Category, Comment, User, UserActivity } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");
const { AdminActivity } = require("../db/sequelizeSetup");
const { updateAdminStats } = require('../services/adminStatsService');
const { updateSiteStats } = require("../services/siteStatsService");
const { updateUserStats } = require("../services/userStatsService");

const ROLE_USER = 1;
const ROLE_ADMIN = 2;

const findAllTopics = async (req, res) => {
    try 
    {
        const result = await Topic.findAll()
        return res.json({ data: result })
    } 
    catch(error) 
    {
        return errorHandler(error, res)
    }
}

const findTopicByPk = async (req, res) => {
    try 
    {
        const result = await Topic.findByPk(req.params.id, { include: Role })
        if (!result) {
            return res.json({ message: 'Topic non trouvé' })
        }
        return res.json({ data: result })
    } 
    catch(error) 
    {
        return errorHandler(error, res);
    }
}

const findTopicComments = async (req, res) => {
    try {
            const topicId = req.params.id;
            const topic = await Topic.findByPk(topicId, {
                include: [{
                model: Comment,
                }],
            });
        
            if (!topic) {
                return res.status(404).json({ error: 'Topic non trouvé' });
            }
            return res.json(topic.comments);
        } catch 
        (error) 
        {
             return errorHandler(error, res)
        }
  };


const createTopic =  async (req, res) => {
    try
    {
        const { title, content, categoryId, userId } = req.body;
        
        // Vérifier si la categorie existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        
        // Créer le topic
        const result = await Topic.create({  title, content, CategoryId: categoryId, UserId: userId });

        // Enregistrer l'activité
        await UserActivity.create({
            activity_type: 'CREATE_TOPIC',
            related_id: result.id,
            related_type: 'Topic',
            related_name: null, 
            user_id: userId
        });

        // Mettre à jour les statistiques de le l'utilisateur
        await updateUserStats(userId, 'CREATE_TOPIC');
        // Mettre à jour les statistique du site    
        await updateSiteStats('CREATE_TOPIC');

        // Répondre avec le topic créé
        return res.status(201).json({message: `Topic créé`, data: result});
    }
    catch(error) 
    {
        return errorHandler(error, res);
    }
}

const updateTopic = async (req, res) => {
    try 
    {
        const result = await Topic.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Topic non trouvé' });
         }
    
         await result.update(req.body);
         return res.status(201).json({ message: 'Topic modifié', data: result });
    }
    catch(error)
    {
        return errorHandler(error, res);
    }
  };
  
const deleteTopic = async (req, res) => {
    try
    {
        const userRole = req.user.RoleId;
        const topicId = req.params.id;
        const adminId = req.user.id; // ID de l'admin (si applicable)

        const result = await Topic.findByPk(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Topic non trouvé' });
        }
        const topicAuthor = (await result.getUser()).username;
        await result.destroy();

        // Si c'est un administrateur, enregistrer l'activité
        if (userRole === 2) {
            await AdminActivity.create({
                activity_type: 'DELETE_TOPIC',
                related_id: topicId,
                related_type: 'Topic',
                related_name: topicAuthor, 
                admin_id: adminId
            });
        }
        // Mettre à jour les statistiques de l'admin
        await updateAdminStats(req.user.id, 'DELETE_TOPIC');
        // Mettre à jour les statistique du site    
        await updateSiteStats('DELETE_TOPIC');

        return res.status(200).json({ message: 'Topic supprimé', data: result });
}
    catch(error)
    {
        return errorHandler(error, res);
    } 
  };

  
module.exports = { findAllTopics, findTopicByPk, createTopic, updateTopic, deleteTopic, findTopicComments };