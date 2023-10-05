const db = require("../../database/models");

module.exports = (req,res) => {

    const id = req.params.id;

    const product = db.Product.findByPk(id,{
        include: {
            all: true
        }
    });
    const categories = db.Category.findAll({
        order : ['name']
    });
    const sections = db.Section.findAll({
        order : ['name']
    });

    Promise.all([product, categories, sections])
        .then(([product, categories, sections]) => {
            return res.render('productEdit',{
                categories,
                sections,
                ...product?.dataValues
            })
        })
        .catch(error => console.log(error))

    


}