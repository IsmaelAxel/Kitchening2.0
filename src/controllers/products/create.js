const {unlinkSync, existsSync} = require('fs');
const {validationResult} = require('express-validator');
const db = require('../../database/models');


module.exports = (req,res) => {

    const errors = validationResult(req);
    if(errors.isEmpty()){
        
        const {title,price, discount, description, categoryId, sectionId} = req.body;
        db.Product.create({
            title : title.trim(),
            price,
            discount: discount || 0,
            sectionId,
            categoryId,
            description : description.trim()
        })
            .then(product => {
                if(req.files.image){
                    db.Image.create({
                        file :  req.files.image[0].filename,
                        main : true,
                        productId : product.id
                    })
                        .then( () => {
                            if(req.files.images){
                               const images = req.files.images.map(({filename}) => {
                                return {
                                    file: filename,
                                    main : false,
                                    productId : product.id
                                }
                               })

                               db.Image.bulkCreate(images,{
                                validate : true
                               }).then(result => console.log(result))
                            }
                        } )
                }
                return res.redirect('/admin')
            })
            .catch(error => console.log(error))
       
    }else {

        // eliminando imágenes
        (req.files.image && existsSync(`./public/img/products/${req.files.image[0].filename }`)) && unlinkSync(`./public/img/products/${req.files.image[0].filename }`);

        if(req.files.images) {
            req.files.images.forEach(file => {
                existsSync(`./public/img/products/${file.filename}`) && unlinkSync(`./public/img/products/${file.filename}`)
            })
        } 

        const categories = db.Category.findAll({
            order : ['name']
        });
        const sections = db.Section.findAll({
            order : ['name']
        });
    
        Promise.all([categories,sections])
            .then(([categories, sections]) => {
                return res.render('productAdd',{
                    categories,
                    sections,
                    errors : errors.mapped(),
                    old : req.body
                })
            })
            .catch(error => console.log(error))


    }
    

}