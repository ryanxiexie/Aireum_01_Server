const { postsRef, commentsRef, contentsRef } = require('../util/fbAdmin');
const assign = require('lodash/assign');
const orderBy = require('lodash/orderBy');

const getMyPosts = (req, res) => {
  postsRef
    .where('uid', '==', req.query.uid)
    .orderBy('postDate')
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        // albums.push(doc.data(), doc.id);
        posts.push(assign({}, doc.data(), { postID: doc.id }));
      });
      return res.json(posts);
    })
    .catch((err) => console.error(err));
};

const getAllPost = (req, res) => {
  postsRef
    .limit(20)
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push(assign({}, doc.data(), { postID: doc.id }));
      });
      return res.json(posts);
    })
    .catch((err) => console.error(err));
};
const getPostsByAlbum = (req, res) => {
  postsRef
    .where('Album', '==', req.query.Album)
    .limit(20)
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push(assign({}, doc.data(), { PostID: doc.id }));
      });
      return res.json(posts);
    })
    .catch((err) => console.error(err));
};

const getOnePost = (req, res) => {
  console.log('get one post');
  let postData = {};
  postsRef
    .doc(req.query.postID)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'post not found' });
      }
      postData = doc.data();
      postData.postID = doc.id;
      return commentsRef.where('postID', '==', req.query.postID).get();
    })
    .then((data) => {
      postData.comments = [];
      data.forEach((doc) => {
        postData.comments.push(doc.data());
      });
      return contentsRef.where('PostID', '==', req.query.postID).get();
    })
    .then((data) => {
      postData.contents = [];
      data.forEach((doc) => {
        postData.contents.push(assign({}, doc.data(), { ContentID: doc.id }));
      });

      let newContents = orderBy(postData.contents, ['CNTOrder'], ['asc']);
      postData.contents = newContents;

      return res.json(postData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// create a post
const createPost = (req, res) => {
  const newPost = {
    Album: req.body.Album,
    PGID: req.body.PGID,
    PostOrder: req.body.PostOrder,
    PostType: req.body.PostType,
    CoverURL: req.body.CoverURL,
    PostText: req.body.PostText,
    PostDate: new Date().toISOString(),
    IsDraft: false,
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
  postsRef
    .add(newPost)
    .then((doc) => {
      const resPost = newPost;
      resPost.postID = doc.id;
      res.json(resPost);
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
};

// get recommended videos (movies)
const getRecommendedPosts = (req, res) => {
  postsRef
    // .where('PostType', '==', 'Vid Upload')
    // .limit(6)
    .get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { PostID: doc.id }));
      });
      return res.json(media);
    })
    .catch((err) => console.error(err));
};

// get posts by filter
const getPostsByFilter = (req, res) => {
  console.log('req is ', req.query);

  let q = postsRef;

  Object.keys(req.query).map((query) => {
    if (req.query[query] !== '') {
      var condition = query === 'Genres' ? 'array-contains' : '==';
      q = q.where(query, condition, req.query[query]);
    }
  });

  q.get()
    .then((data) => {
      let media = [];
      data.forEach((doc) => {
        media.push(assign({}, doc.data(), { PostID: doc.id }));
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
  getMyPosts,
  getAllPost,
  getOnePost,
  createPost,
  getRecommendedPosts,
  getPostsByAlbum,
  getPostsByFilter,
};
