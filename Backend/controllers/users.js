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