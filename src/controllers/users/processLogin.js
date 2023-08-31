const { validationResult } = require("express-validator")
const { readJSON } = require("../../data")

module.exports = (req,res) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        const users = readJSON('users.json')
        const {id,name,role} = users.find(user => user.email === req.body.email)
        
        req.session.userLogin = {
            id,
            name,
            role
        }
        
        console.log(req.session.userLogin);
        
        return res.redirect('/')
    }else {
        return res.send(errors.mapped())
    }

  
}