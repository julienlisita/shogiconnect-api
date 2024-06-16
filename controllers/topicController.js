const { Topic, Category, Post, User } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllTopics = async (req, res) => {
    try 
    {
        const result = await Topic.findAll()
        return res.json({ data: result })
    } 
    catch(error) 
    {
        errorHandler(error, res)
    }
}

const findTopicByPk = async (req, res) => {
    try 
    {
        const result = await Topic.findByPk(req.params.id, { include: Role })
        if (!result) {
            return res.json({ message: 'Topic non trouvé' })
        }
        res.json({ data: result })
    } 
    catch(error) 
    {
        errorHandler(error, res);
    }
}

const findTopicPosts = async (req, res) => {
    try {
            const topicId = req.params.id;
            const topic = await Topic.findByPk(topicId, {
                include: [{
                model: Post,
                }],
            });
        
            if (!topic) {
                return res.status(404).json({ error: 'Topic non trouvé' });
            }
            res.json(topic.Posts);
        } catch 
        (error) 
        {
            errorHandler(error, res)
        }
  };


const createTopic =  async (req, res) => {
    try
    {
        const { title, author, content, categoryId, userId } = req.body;
        const category = await Category.findByPk(categoryId);
        const user = await User.findByPk(userId);
        if (category && user) 
        {
            const result = await Topic.create({  title, author, content, CategoryId: categoryId, UserId: userId });
            res.status(201).json({message: `Topic créé`, data: result});
        } 
        else 
        {
            return res.status(400).json({ error: 'Catégorie ou utilisateur invalide' });
        }
    }
    catch(error) 
    {
        errorHandler(error, res);
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
         res.status(201).json({ message: 'Topic modifié', data: result });
    }
    catch(error)
    {
        errorHandler(error, res);
    }
  };
  
const deleteTopic = async (req, res) => {
    try
    {
        const result = await Topic.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Topic non trouvé' });
        }
        await result.destroy();
        res.status(200).json({ message: 'Topic supprimé', data: result });
    }
    catch(error)
    {
        errorHandler(error, res);
    } 
  };

  
module.exports = { findAllTopics, findTopicByPk, createTopic, updateTopic, deleteTopic, findTopicPosts };