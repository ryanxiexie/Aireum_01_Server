const { albumsRef, mediaRef } = require('../util/fbAdmin');
const assign = require('lodash/assign');

//album
const getMyAlbums = (req, res) => {
  albumsRef
    .where('uid', '==', req.query.uid)
    .orderBy('createdAt')
    .get()
    .then((data) => {
      let albums = [];
      data.forEach((doc) => {
        // albums.push(doc.data(), doc.id);
        albums.push(assign({}, doc.data(), { AlbumID: doc.id }));
      });
      return res.json(albums);
    })
    .catch((err) => console.error(err));
};

const getAllMedia = (req, res) => {
  mediaRef
    .get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(doc.data());
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

const getMediaByAlbumID = async (req, res) => {
  // listen to changes on album collection
  await albumsRef
    // .where('albumName', '==', 'Xmas Songs')
    .onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        // if (change.type === 'added') {
        //   console.log('New Album: ', change.doc.data());
        // }
        if (change.type === 'modified') {
          change.doc.id === req.query.albumID &&
            // console.log('Modified Album: ', change.doc.data());
            mediaRef
              .where('albumID', '==', req.query.albumID)
              .get()
              .then((data) => {
                data.docs.forEach((doc) => {
                  console.log('data is ', doc);
                  mediaRef
                    .doc(doc.id)
                    .update({ albumName: change.doc.data().albumName });

                  // doc.update({ albumName: change.doc.data().albumName });
                });
              });
        }
        // if (change.type === 'removed') {
        //   console.log('Removed Album: ', change.doc.data());
        // }
      });
    });

  // get media by album id
  mediaRef
    .where('albumID', '==', req.query.albumID)
    .orderBy('description')
    .get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(doc.data());
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getMyAlbums,
  getAllMedia,
  getMediaByAlbumID,
};
