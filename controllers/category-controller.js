const Category = require("../models/category");
const cloudinary = require("../middleware/cloudinary");

exports.createCategory = async (req, res) => {
    const url = await cloudinary.uploads(req.file.path, 'categories');
    const imagePath = url.secure_url;

    const categoryType = {
        typeName: req.body.typeName,
        image: imagePath,
        brands: req.body.brands,
        materials: req.body.materials,
        shapes: req.body.shapes,
        extras: req.body.extras
    };

    const category = new Category({
        name: req.body.name,
        image: imagePath,
        type: [categoryType],
        creator: req.userData.userId
    });
    category.save().then( crearedCategory => {
        res.status(201).json({
            message:"Category added succesfully",
            category: {
                ...crearedCategory,
                id: crearedCategory._id,
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Server error'
        })
    });
}

exports.addCategoryTypeById = (req, res, next) => {
    const categoryType = {
        typeName: req.body.typeName,
        brands: req.body.brands,
        materials: req.body.materials,
        shapes: req.body.shapes,
        extras: req.body.extras
    };

    Category.updateOne({ _id: req.params.id }, { $push: { type: categoryType } }).then( result => {
        if (result.matchedCount) {
            res.status(200).json({
                message:"Category update succesfully",
                result: result
            });
        } else {
            res.status(401).json({
                message: "Not authorized"
            }) 
        }
    }).catch(error => {
        res.status(500).json({ message: "Couldn't update category" });
    });
}

exports.editTypeByName = (req, res, next) => {
    const typeName = req.body.typeName;
    const categoryType = {
        brands: req.body.brands,
        materials: req.body.materials,
        shapes: req.body.shapes,
        extras: req.body.extras
    };

    Category.updateOne({ _id: req.params.id, "type.typeName": typeName }, 
        { $set: { 
            "type.$.brands": categoryType.brands, 
            "type.$.materials": categoryType.materials,
            "type.$.shapes": categoryType.shapes,
            "type.$.extras": categoryType.extras
        } }).then( result => {
        if (result.matchedCount) {
            res.status(200).json({
                message:"Category update succesfully",
                result: result
            });
        } else {
            res.status(401).json({
                message: "Not authorized"
            }) 
        }
    }).catch(error => {
        res.status(500).json({ message: "Couldn't update category" });
    });
}

exports.getCategories = (req, res) => {
    const categoryName = req.query.category;

    if(categoryName) {
        Category.findOne({name: categoryName}).then(documents => {
            res.status(200).json({
                message: "Category getted by name succesfully!",
                data: documents
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Server error"
            })
        });
    } else {
        Category.find().then(documents => {
            res.status(200).json({
                message: "Category fetched succesfully!",
                data: documents
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Server error"
            })
        });
    }
}

exports.getCategoriesList = (req, res) => {
    Category.find().then(documents => {
        const categoriesList = documents.map(el => el.name);
        res.status(200).json({
            message: "Category fetched succesfully!",
            data: categoriesList
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Server error"
        })
    });
}

exports.getCategoryById = (req, res, next) => {
    const categoryId = req.params.id;
    
    Category.findById(categoryId).then(documents => {
        res.status(200).json({
            message: "Category getted by id succesfully!",
            data: documents
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Server error"
        })
    });
}

exports.deleteCategoryById = (req, res) => {
    Category.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        if (result.deletedCount) {
            res.status(200).json({ message: "Category deleted!"})
        } else {
            res.status(401).json({
                message: "Not authorized"
            })
        }
        
    });
}
