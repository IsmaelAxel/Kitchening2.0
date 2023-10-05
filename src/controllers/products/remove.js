const { readJSON, writeJSON } = require("../../data")
const db = require('../../database/models')
module.exports = (req,res) => {
    db.Product.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        return res.redirect('/admin')
    })
    .catch(error => console.log(error))
}