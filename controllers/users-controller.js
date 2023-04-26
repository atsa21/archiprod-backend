const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(result => {
                res.status(201).json({
                    message: "User was created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Invalid authentication credentials!"
            });
        });
    });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
            return res.status(401).json({
                message: "Auth failed"
            });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
            return res.status(401).json({
                message: "Auth failed"
            });
            }
            const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role },
            process.env.JWT_KEY,
            { expiresIn: "6h" }
            );
            
            res.status(200).json({
            token: token,
            expiresIn: 3600 * 6,
            role: fetchedUser.role,
            userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
            message: "Invalid authentication credentials!"
            });
        });
}

exports.getUsers = (req, res, next) => {

    if (req.userData.role !== "ADMIN") {
        return res.status(401).json({
            message: "Only admin can get users"
        });
    }

    const pageSize = +req.query.size;
    const currentPage = +req.query.page;
    const postQuery = User.find({ role: "USER" }).select('-password');
    let fetchedUsers;
    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.exec().then(users => {
        fetchedUsers = users;
        return User.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Product fetched succesfully!",
            data: fetchedUsers,
            totalElements: count
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching products failed"
        })
    });
}