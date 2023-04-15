const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message, image } = req.body;
        const data = await messageModel.create({
            message: { text: message, image },
            users: [from, to],
            sender: from,
        });
        if (data) {
            res.send({ status: "ok", msg: "Message added successfully." });
        } else {
            res.json({ msg: "Failed to add message to the database." });
        }
    } catch (ex) {
        next(ex);
        res.send({ Status: "error" });
    }
};


module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                image: msg.message.image
            };
        });
        res.json(projectMessages);
    } catch (ex) {
        next(ex);
    }
};