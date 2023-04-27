const Product = require("../models/product");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

exports.createProduct = (req, res, next) => {
    const url = cloudinary.uploader.upload(req.file.path);
    const { category, type, materials, shape, extras, brand, collectionName, inStock, fullPrice, currency, isOnSale } = req.body;

    const dimensions = {
        height: req.body.height,
        width: req.body.width ? req.body.width : null,
        depth: req.body.depth ? req.body.depth : null,
        diameter: req.body.diameter ? req.body.diameter : null,
        measurementUnits: req.body.measurementUnits
    };

    const prodPrice = {
        fullPrice: fullPrice,
        currency: currency,
        isOnSale: isOnSale,
        discount: req.body.discount ? req.body.discount : null,
        discountedPrice: req.body.discountedPrice ? req.body.discountedPrice : null
    };

    const productDetails = {
        collectionName: collectionName,
        shape: shape,
        materials: materials,
        extras: extras,
        productCode: req.body.productCode ? req.body.productCode : null,
        year: req.body.year ? req.body.year : null
    };

    const product = new Product({
        category: category,
        type: type,
        imagePath: url.secure_url,
        brand: brand,
        dimensions: dimensions,
        price: prodPrice,
        details: productDetails,
        inStock: inStock,
        creator: req.userData.userId
    });
    product.save().then( createdProd => {
        res.status(201).json({
            message:"Product added succesfully",
            product: {
                ...createdProd,
                id: createdProd._id,
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: error
        })
    });
}

exports.getProducts = (req, res, next) => {
    const pageSize = +req.query.size;
    const currentPage = +req.query.page;
    const postQuery = Product.find();
    let fetchedProduct;
    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.then(documents => {
        fetchedProduct = documents;
        return Product.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Product fetched succesfully!",
            data: fetchedProduct,
            totalElements: count
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching products failed"
        })
    });
}

exports.getProductsOnSale = (req, res, next) => {
    const pageSize = +req.query.size;
    const currentPage = +req.query.page;
    const isOnSale = req.query.isOnSale;
    const postQuery = Product.find({ 'price.isOnSale': isOnSale });
    let fetchedProduct;
    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.then(documents => {
        fetchedProduct = documents;
        return Product.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Product fetched succesfully!",
            data: fetchedProduct,
            totalElements: count
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching products failed"
        })
    });
}

exports.getProductById = (req, res, next) => {
    Product.find().then(product => {
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({
                message: "Product not found"
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Get product by id failed"
        })
    });
}

exports.updateProduct = (req, res, next) => {
    let imagePath = req.body.imagePath;
    const { category, type, materials, shape, extras, brand, collectionName, inStock, fullPrice, currency, isOnSale } = req.body;
    const result = cloudinary.uploader.upload(req.file.path);

    if(req.file) {
        // const url = req.protocol + "://" + req.get("host");
        imagePath = result.secure_url;
    }

    const dimensions = {
        height: req.body.height,
        width: req.body.width ? req.body.width : null,
        depth: req.body.depth ? req.body.depth : null,
        diameter: req.body.diameter ? req.body.diameter : null,
        measurementUnits: req.body.measurementUnits
    };

    const prodPrice = {
        fullPrice: fullPrice,
        currency: currency,
        isOnSale: isOnSale,
        discount: req.body.discount ? req.body.discount : null,
        discountedPrice: req.body.discountedPrice ? req.body.discountedPrice : null
    };

    const productDetails = {
        collectionName: collectionName,
        shape: shape,
        materials: materials,
        extras: extras,
        productCode: req.body.productCode ? req.body.productCode : null,
        year: req.body.year ? req.body.year : null
    };

    const product = new Product({
        _id: req.body.id,
        category: category,
        type: type,
        imagePath: imagePath,
        brand: brand,
        dimensions: dimensions,
        price: prodPrice,
        details: productDetails,
        inStock: inStock,
        creator: req.userData.userId
    });
    Product.updateOne({ _id: req.params.id }, product).then(result => {
        if (result.matchedCount) {
            res.status(200).json({
                message:"Post succesfully updated!"
            });
        } else {
            res.status(401).json({
                message: "The post has not been found"
            }) 
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Updating product failed"
        })
    });
}

exports.deleteProductById = (req, res, next) => {
    Product.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        if (result.deletedCount) {
            res.status(200).json({ message: "Deleting product successful!"});
        } else {
            res.status(401).json({
                message: "Not authorized"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Deleting post failed"
        })
    });
}




