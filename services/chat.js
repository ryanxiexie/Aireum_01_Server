const { conversationRef } = require('../util/fbAdmin');

const createConversation = (req, res) => {
  const newConversation = {
    members: {
      0: {
        uid: req.query.sender.uid,
        displayName: req.query.sender.displayName,
      },
      1: {
        uid: req.query.receiver.uid,
        displayName: req.query.receiver.displayName,
      },
    },
  };
  conversationRef
    .add(newConversation)
    .then((doc) => {
      res.json(doc.data());
    })
    .catch((err) => {
      res.status(500).json({ error: 'something goes wrong' });
    });
};

module.exports = { createConversation };
