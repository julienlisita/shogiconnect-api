const { Comment, Topic, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

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
        const {author, content, topicId, userId } = req.body;
        const topic = await Topic.findByPk(topicId);
        const user = await User.findByPk(userId);
        if (topic && user) 
        {
            const result = await Comment.create({ author, content, TopicId: topicId, UserId: userId });
            res.status(201).json({message: `Commentaire créé`, data: result});
        } 
        else 
        {
            return res.status(400).json({ error: 'Topic ou utilisateur invalide' });
        }
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
        const result = await Comment.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        await result.destroy();
        res.status(200).json({ message: 'Commentaire supprimé', data: result });
    }
    catch(error)
    {
        errorHandler(error, res);
    } 
  };

  
module.exports = { findAllComments, findCommentByPk, createComment, updateComment, deleteComment };