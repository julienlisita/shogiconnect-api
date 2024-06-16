const { Post, Topic, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllPosts = async (req, res) => {
    try 
    {
        const result = await Post.findAll()
        return res.json({ data: result })
    } 
    catch(error) 
    {
        errorHandler(error, res)
    }
}

const findPostByPk = async (req, res) => {
    try 
    {
        const result = await Post.findByPk(req.params.id, { include: Role })
        if (!result) {
            return res.json({ message: 'Post non trouvé' })
        }
        res.json({ data: result })
    } 
    catch(error) 
    {
        errorHandler(error, res);
    }
}


const createPost =  async (req, res) => {
    try
    {
        const {author, content, topicId, userId } = req.body;
        const topic = await Topic.findByPk(topicId);
        const user = await User.findByPk(userId);
        if (topic && user) 
        {
            const result = await Post.create({ author, content, TopicId: topicId, UserId: userId });
            res.status(201).json({message: `Post créé`, data: result});
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

const updatePost = async (req, res) => {
    try 
    {
        const result = await Post.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Post non trouvé' });
         }
    
         await result.update(req.body);
         res.status(201).json({ message: 'Post modifié', data: result });
    }
    catch(error)
    {
        errorHandler(error, res);
    }
  };
  
const deletePost = async (req, res) => {
    try
    {
        const result = await Post.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }
        await result.destroy();
        res.status(200).json({ message: 'Post supprimé', data: result });
    }
    catch(error)
    {
        errorHandler(error, res);
    } 
  };

  
module.exports = { findAllPosts, findPostByPk, createPost, updatePost, deletePost };