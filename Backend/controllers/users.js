const mongoose = require('mongoose');

// @route       GET api/users
// @desc        User Profile
// @access      Private
exports.viewProfile = async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send("Server Error!!!");
    }
}


// @route       GET api/users
// @desc        GET ALL Users
// @access      Private
exports.listUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ date: -1 })
        return res.json(users)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error!!")
    }
}


// @route       GET api/users
// @desc        GET ALL Users
// @access      Private
exports.list = async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.user.id);
        console.log(id);

        const users = await User.aggregate()
            .match({ _id: { $not: { $eq: id } } })
            .project({
                password: 0,
                __v: 0,
                date: 0,
            })
            res.send(users)
    } catch (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ msg: 'Unauthorized' }));
        res.sendStatus(401);
    }
}