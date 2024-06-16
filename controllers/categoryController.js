const { Category , Topic} = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllCategories = async (req, res) => {
    try {
        const result = await Category.findAll()
        return res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findCategoryByPk = async (req, res) => {
    try {
        const result = await Category.findByPk(req.params.id,{ include: Role })
        if (!result) {
            return res.json({ message: 'Categorie non trouvée' })
        }
        res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findCategoryTopics = async (req, res) => {
    try {

            const categoryId = req.params.id;
            const category = await Category.findByPk(categoryId, {
                include: [{
                model: Topic,
                }],
            });
        
            if (!category) {
                return res.status(404).json({ error: 'Categorie non trouvée' });
            }
        
            res.json(category.Topics);
        } catch 
        (error) 
        {
            errorHandler(error, res)
        }
  };

module.exports = { findAllCategories, findCategoryByPk, findCategoryTopics };