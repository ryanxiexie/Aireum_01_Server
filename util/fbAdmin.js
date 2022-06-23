const fs = require('firebase-admin');

const serviceAccountFilePath = process.env.SERVICE_ACCOUNT_FILE_PATH;
const serviceAccount = require(serviceAccountFilePath);

// initialize firebase
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();
const auth = fs.auth();

auth.createUser;

const mediaRef = db.collection('media');
const albumsRef = db.collection('mediaAlbums');
const conversationRef = db.collection('conversations');
const postsRef = db.collection('posts');
const commentsRef = db.collection('comments');
const contentsRef = db.collection('contents');
const videosRef = db.collection('videos');
const audiosRef = db.collection('audios');
const playlistsRef = db.collection('playlists');

module.exports = {
  fs,
  mediaRef,
  albumsRef,
  conversationRef,
  postsRef,
  commentsRef,
  contentsRef,
  videosRef,
  audiosRef,
  playlistsRef,
};
