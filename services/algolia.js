const algoliasearch = require('algoliasearch');
const appLog = require('../util/appLog');
// appLog.setModuleName(__filename);

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

const index = client.initIndex(ALGOLIA_INDEX_NAME);

const searchAlgolia = (req, res) => {
  // let result = await index.search(req.query.search);

  index.search(req.query.search).then((results) => {
    let documents = [];

    results.hits.map((result) => {
      console.log('result is ', result);
      data = {
        Title: result.Title,
        Area: result.Area,
        Language: result.Language,
        Year: result.Year,
        PostText: result.PostText,
        CoverURL: result.CoverURL,
        PostID: result.objectID,
      };
      documents.push(data);
    });
    // trace('world');

    console.log('documents is ', documents);
    return res.json(documents);
    // postsRef
    //   .where('uid', 'in', documents)
    //   .get()
    //   .then((data) => {
    //     console.log('data collection is ', data);
    //     let posts = [];
    //     data.forEach((doc) => {
    //       console.log('data is ', doc.data());
    //       posts.push(assign({}, doc.data(), { postID: doc.id }));
    //     });
    //     return res.json(posts);
    //   });

    // documents.forEach((document) => {
    //   console.log('document is', document);
    //   postsRef
    //     .doc(document.documentID)
    //     .get()
    //     .then((doc) => {
    //       // console.log('data is ', doc.data());
    //       posts.push(doc.data());
    //     });
    // });

    // console.log('posts data is ', posts);

    // return res.json(posts);
  });
};

const filterAlgolia = (req, res) => {
  // trace();
  // console.log('filter req is ', req.query);

  appLog.logNotice({ 'filter req is': req.query });
  // appLog.logError({ error: 'this is an error' });

  // var stack = new Error().stack;
  // console.log('stack is ', stack);

  let documents = [];
  var Album = req.query.Album ? req.query.Album : '';
  var Area = req.query.Area ? req.query.Area : '';
  var Year = req.query.Year ? req.query.Year : '';
  var Language = req.query.Language ? req.query.Language : '';
  var Genres = req.query.Genres ? req.query.Genres : '';
  index
    .search(req.query.search, {
      // objectID: ${req.query.PostID} AND
      // filters: `objectID: ${req.query.PostID} `,
      facetFilters: [
        `Album: ${Album} `,
        `Area: ${Area} `,
        `Year: ${Year}`,
        `Language: ${Language}`,
        `Genres: ${Genres}`,
      ],
    })
    .then((results) => {
      results.hits.map((result) => {
        // console.log('result is', result);
        data = {
          Title: result.Title,
          Area: result.Area,
          Language: result.Language,
          Year: result.Year,
          PostText: result.PostText,
          CoverURL: result.CoverURL,
          PostID: result.objectID,
          Genres: result.Genres,
          Album: result.Album,
        };
        documents.push(data);
      });
      return res.json(documents);
    })
    .catch((err) => console.log('err is ', err));
};

module.exports = { searchAlgolia, filterAlgolia };
