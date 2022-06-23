const { videosRef } = require('../util/fbAdmin');
const assign = require('lodash/assign');

// movie

const getAllMovies = (req, res) => {
  videosRef
    .get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { MovieID: doc.id }));
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

const getRecommendedVideos = (req, res) => {
  videosRef
    .limit(6)
    .get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { MovieID: doc.id }));
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

const getSingleVideo = (req, res) => {
  videosRef
    .doc(req.query.MovieID)
    .get()
    .then((doc) => {
      let video = {};

      assign(video, doc.data(), { MovieID: doc.id });

      return res.json(video);
    })
    .catch((err) => console.error(err));
};

const getMoviesByFilter = (req, res) => {
  console.log('req is ', req.query);

  let q = videosRef;

  Object.keys(req.query).map((query) => {
    if (req.query[query] !== '') {
      var condition = query === 'Genre' ? 'array-contains' : '==';
      q = q.where(query, condition, req.query[query]);
    }
  });

  q.get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { MovieID: doc.id }));
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  getRecommendedVideos,
  getSingleVideo,
  getAllMovies,
  getMoviesByFilter,
};
