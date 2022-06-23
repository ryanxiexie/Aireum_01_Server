const { playlistsRef, contentsRef } = require('../util/fbAdmin');
const { FieldValue } = require('firebase-admin/firestore');

// create a playlist
const createPlaylist = (req, res) => {
  const newPlaylist = {
    PLOrder: req.body.PLOrder,
    PLTitle: req.body.PLTitle,
    CoverURL: req.body.CoverURL,

    PLType: req.body.PLType,
    PLDate: new Date().toISOString(),
    UID: null,
    DisplayName: 'user1',
    PLContents: [],
    CreatedBy: null,
    ModifiedDate: null,
    ModifiedBy: null,
  };
  playlistsRef
    .add(newPlaylist)
    .then((doc) => {
      const resPlaylist = newPlaylist;
      resPlaylist.PLID = doc.id;
      res.json(resPlaylist);
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
};

// add a content to playlist
const addContent = (req, res) => {
  let contentData = {};
  contentsRef
    .doc(req.query.contentID)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'content not found' });
      }
      const { Title, Host, CoverOverrideURL, Length, CNTURL } = doc.data();
      contentData = { Title, Host, CoverOverrideURL, Length, CNTURL };
      contentData.postID = doc.id;
      contentData.CNTOrder = '1';
      contentData.CreatedDate = new Date().toISOString();
    })
    .then(() => {
      // playlistsRef.doc(req.query.playlistID).update('PLContents', contentData);
      playlistsRef.doc(req.query.playlistID).update({
        PLContents: FieldValue.arrayUnion(contentData),
      });
    })
    .then(() => {
      return res.json({ message: 'details added successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// get a playlist info
const getPlaylistInfo = (req, res) => {
  playlistsRef
    .doc(req.query.playlistID)
    .get()
    .then((doc) => {
      let playlistData = {};
      if (!doc.exists) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
      playlistData = doc.data();
      playlistData.playlistID = doc.id;
      return res.json(playlistData);
    })
    .catch((err) => console.error(err));
};

// get a playlist url array
const getPlaylistURL = (req, res) => {
  playlistsRef
    .doc(req.query.playlistID)
    .get()
    .then((doc) => {
      let playlistURL = [];
      if (!doc.exists) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
      doc.data().PLContents.map((content) => {
        playlistURL.push(content.CNTURL);
      });

      return res.json(playlistURL);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  createPlaylist,
  addContent,
  getPlaylistInfo,
  getPlaylistURL,
};
