const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;

// const { login } = require('./services/user');

const {
  getMyAlbums,
  getAllMedia,
  getMediaByAlbumID,
} = require('./services/albums');

const {
  // getRecommendedVideos,
  // getSingleVideo,
  getAllMovies,
  getMoviesByFilter,
} = require('./services/videos');

const {
  getAllAudios,
  getRecommendedAudios,
  getSingleAudio,
  getAudiosByFilter,
} = require('./services/audios');

const {
  getMyPosts,
  getAllPost,
  getOnePost,
  createPost,
  getRecommendedPosts,
  getPostsByAlbum,
  getPostsByFilter,
} = require('./services/posts');

const {
  createPlaylist,
  addContent,
  getPlaylistInfo,
  getPlaylistURL,
} = require('./services/playlist');

const { uploadContent, getSingleContent } = require('./services/contents');

const { createConversation } = require('./services/chat');

const { searchAlgolia, filterAlgolia } = require('./services/algolia');

const {
  addLog,
  addLogDebug,
  addLogInfo,
  addLogNotice,
  addLogWarning,
  addLogError,
  addLogCritical,
  addLogAlert,
  addLogEmergency,
} = require('./services/appLogAPI');

// user
// app.post('/user', login);

// Album routes
app.get('/all_media', getAllMedia);
app.get('/my_albums', getMyAlbums);
app.get('/media_in_album', getMediaByAlbumID);

//Video routes
// app.get('/recommended_videos', getRecommendedVideos);
// app.get('/movie', getSingleVideo);
app.get('/movies', getAllMovies);
app.get('/movies_filter', getMoviesByFilter);

//Audio routes
app.get('/audios', getAllAudios);
app.get('/recommended_audios', getRecommendedAudios);
app.get('/audio', getSingleAudio);
app.get('/audios_filter', getAudiosByFilter);

// Posts routes
app.get('/my_posts', getMyPosts);
app.get('/all_posts', getAllPost);
app.get('/post', getOnePost);
app.get('/recommended_posts', getRecommendedPosts);
app.post('/create_post', createPost);
app.get('/album', getPostsByAlbum);
app.get('/posts_filter', getPostsByFilter);

// Playlists routes
app.post('/create_playlist', createPlaylist);
app.post('/add_to_playlist', addContent);
app.get('/playlist_info', getPlaylistInfo);
app.get('/playlist_urls', getPlaylistURL);

// Algolia search
app.get('/search', searchAlgolia);
app.get('/filter', filterAlgolia);

// Contents routes
app.post('/upload_content', uploadContent);
app.get('/content', getSingleContent);

// Chat routes
app.post('/create_conversation', createConversation);

// Logging routes

app.post('/log', addLog);
app.post('/log_debug', addLogDebug);
app.post('/log_info', addLogInfo);
app.post('/log_notice', addLogNotice);
app.post('/log_warning', addLogWarning);
app.post('/log_error', addLogError);
app.post('/log_critical', addLogCritical);
app.post('/log_alert', addLogAlert);
app.post('/log_emergency', addLogEmergency);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
