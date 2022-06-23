const { contentsRef } = require('../util/fbAdmin');
const assign = require('lodash/assign');

// upload content

const uploadContent = (req, res) => {
  const newContent = {
    Album: req.body.Album,
    PostID: req.body.PostID,
    CNTOrder: req.body.CNTOrder,
    CNTType: req.body.CNTType,
    CoverOverrideURL: req.body.CoverOverrideURL,
    CNTURL: req.body.CNTURL,
    CNTText: req.body.CNTText,
    CNTDate: new Date().toISOString(),
    PostLikes: 0,
    PostDislikes: 0,
    SeriesSeason: req.body.SeriesSeason,
    SeriesEpisode: req.body.SeriesEpisode,

    TrailerURL: req.body.TrailerURL,

    Title: req.body.Title,
    Director: req.body.Director,
    Host: req.body.Host,
    Starring: req.body.Starring,
    Year: req.body.Year,
    StarRating: req.body.StarRating,
    MaturityRating: req.body.MaturityRating,
    Language: req.body.Language,
    Area: req.body.Area,
    UID: null,
    Genres: req.body.Genres,
    Category: req.body.Category,
    Subcategory: req.body.Subcategory,
    CreatedBy: null,
    ModifiedDate: null,
    ModifiedBy: null,
  };
  contentsRef
    .add(newContent)
    .then((doc) => {
      const resContent = newContent;
      resContent.ContentID = doc.id;
      res.json(resContent);
    })
    .catch((err) => {
      res.status(500).json({ error: 'upload content failed' });
      console.error(err);
    });
};

const getSingleContent = (req, res) => {
  contentsRef
    .doc(req.query.ContentID)
    .get()
    .then((doc) => {
      let content = {};

      assign(content, doc.data(), { ContentID: doc.id });

      return res.json(content);
    })
    .catch((err) => console.error(err));
};

module.exports = {
  uploadContent,
  getSingleContent,
};
