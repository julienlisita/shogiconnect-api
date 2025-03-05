const { Comment, Topic, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");
const { AdminActivity } = require("../db/sequelizeSetup");
const { updateAdminStats } = require('../services/adminStatsService');
const ROLE_ADMIN = 2;

const findAllComments = async (req, res) => {
    try 
    {
        const result = await Comment.findAll()
        return res.json({ data: result })
    } 
    catch(error) 
    {
        errorHandler(error, res)
    }
}

const findCommentByPk = async (req, res) => {
    try 
    {
        const result = await Comment.findByPk(req.params.id, { include: Role })
        if (!result) {
            return res.json({ message: 'Commentaire non trouvé' })
        }
        res.json({ data: result })
    } 
    catch(error) 
    {
        errorHandler(error, res);
    }
}


const createComment =  async (req, res) => {
    try
    {
        const { content, topicId, userId } = req.body;
       
        // Vérifier si l'utilisateur existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier si le topic existe
        const topic = await Topic.findByPk(topicId);
        if (!topic) {
            return res.status(404).json({ error: 'Topic non trouvé' });
        }

        // Créer le commentaire
        const result = await Comment.create({ content, TopicId: topicId, UserId: userId });

        // Répondre avec le commentaire créé
        res.status(201).json({message: `Commentaire créé`, data: result});

            // Enregistrer l'activité de création du commentaire
        await UserActivity.create({
            activity_type: 'CREATE_COMMENT',
            related_id: result.id, // ID du commentaire créé
            related_type: 'comment',
            related_name: null, // related_name est null
            user_id: userId, // ID de l'utilisateur qui a créé le commentaire
        });

        // Mettre à jour les statistiques de l'utilisateur
        await updateUserStats(userId, 'CREATE_COMMENT');
   
    }
    catch(error) 
    {
        errorHandler(error, res);
    }
}

const updateComment = async (req, res) => {
    try 
    {
        const result = await Comment.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
         }
    
         await result.update(req.body);
         res.status(201).json({ message: 'Commentaire modifié', data: result });
    }
    catch(error)
    {
        errorHandler(error, res);
    }
  };
  
const deleteComment = async (req, res) => {
    try
    {
        const userRole = req.user.RoleId;
        const commentId = req.params.id;
        const adminId = req.user.id; // ID de l'admin (si applicable)

        const result = await Comment.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        
        const commentAuthor = (await result.getUser()).username;

        await result.destroy();
        res.status(200).json({ message: 'Commentaire supprimé', data: result });

         // Si c'est un administrateur, enregistrer l'activité
         if (userRole === ROLE_ADMIN) {
            await AdminActivity.create({
                activity_type: 'DELETE_COMMENT',
                related_id: commentId,
                related_type: 'Comment',
                related_name: commentAuthor, // Sauvegarde du titre du topic supprimé
                admin_id: adminId
            });
        }
        // Mettre à jour les statistiques de l'admin
        await updateAdminStats(req.user.id, 'DELETE_COMMENT');
    }
    catch(error)
    {
        errorHandler(error, res);
    } 
  };

  
module.exports = { findAllComments, findCommentByPk, createComment, updateComment, deleteComment };