const mongoose = require('mongoose');

// Get conversations list
exports.conversations = async (req, res) => {
    try {
        let from = mongoose.Types.ObjectId(req.user.id);
        const conversations = await Conversation.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'recipients',
                foreignField: '_id',
                as: 'recipientObj',
            },
        },
        ])
        .match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
        .project({
            'recipientObj.password': 0,
            'recipientObj.__v': 0,
            'recipientObj.date': 0,
        })
        // .exec((err, conversations) => {
        //     if (err) {
        //         console.log(err);
        //         res.setHeader('Content-Type', 'application/json');
        //         res.end(JSON.stringify({ message: 'Failure' }));
        //         res.sendStatus(500);
        //     } else {
        //         res.send(conversations);
        //     }
        // });
        res.send(conversations);
    
    } catch (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Failure' }));
        res.sendStatus(500);
    }
}

// Get messages from conversation
// based on to & from
exports.conversationsQuery = async (req, res) => {
    try {
        let user1 = mongoose.Types.ObjectId(req.user.id);
        let user2 = mongoose.Types.ObjectId(req.query.id);
        const messages = await Message.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'to',
                    foreignField: '_id',
                    as: 'toObj',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'from',
                    foreignField: '_id',
                    as: 'fromObj',
                },
            },
        ])
            .match({
                $or: [
                    { $and: [{ to: user1 }, { from: user2 }] },
                    { $and: [{ to: user2 }, { from: user1 }] },
                ],
            })
            .project({
                'toObj.password': 0,
                'toObj.__v': 0,
                'toObj.date': 0,
                'fromObj.password': 0,
                'fromObj.__v': 0,
                'fromObj.date': 0,
            })

            res.send(messages);
        
    } catch (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Failure' }));
        res.sendStatus(500);
    }
}


// Post private message
exports.privateMessage = (req, res) => {
    try {
        let from = mongoose.Types.ObjectId(req.user.id);
        let to = mongoose.Types.ObjectId(req.body.to);
    
        Conversation.findOneAndUpdate(
        {
            recipients: {
                $all: [
                    { $elemMatch: { $eq: from } },
                    { $elemMatch: { $eq: to } },
                ],
            },
        },
        {
            recipients: [req.user.id, req.body.to],
            lastMessage: req.body.body,
            date: Date.now(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
        function(err, conversation) {
            if (err) {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Failure' }));
                res.sendStatus(500);
            } else {
                let message = new Message({
                    conversation: conversation._id,
                    to: req.body.to,
                    from: req.user.id,
                    body: req.body.body,
                });

                req.io.sockets.emit('messages', req.body.body);

                message.save(err => {
                    if (err) {
                        console.log(err);
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Failure' }));
                        res.sendStatus(500);
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(
                            JSON.stringify({
                                message: 'Success',
                                conversationId: conversation._id,
                            })
                        );
                    }
                });
            }
        }
    );
        
    } catch (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Failure' }));
        res.sendStatus(500);
    }
}