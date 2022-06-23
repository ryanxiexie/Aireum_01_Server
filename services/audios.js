const { audiosRef } = require('../util/fbAdmin');
const assign = require('lodash/assign');

// movie

const getAllAudios = (req, res) => {
  audiosRef
    .get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { AudioID: doc.id }));
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

const getRecommendedAudios = (req, res) => {
  audiosRef
    .limit(6)
    .get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { AudioID: doc.id }));
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

const getSingleAudio = (req, res) => {
  console.log('get single audio req is ', req.query);
  audiosRef
    .doc(req.query.AudioID)
    .get()
    .then((doc) => {
      let media = {};

      assign(media, doc.data(), { AudioID: doc.id });

      return res.json(media);
    })
    .catch((err) => console.error(err));
};

const getAudiosByFilter = (req, res) => {
  console.log('req is ', req.query);

  let q = audiosRef;

  Object.keys(req.query).map((query) => {
    if (req.query[query] !== '') {
      var condition = query === 'Category' ? 'array-contains' : '==';
      q = q.where(query, condition, req.query[query]);
    }
  });

  q.get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { AudioID: doc.id }));
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getRecommendedAudios,
  getAllAudios,
  getSingleAudio,
  getAudiosByFilter,
};
