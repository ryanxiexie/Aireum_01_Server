const fs = require('firebase-admin');

const serviceAccountFilePath = process.env.SERVICE_ACCOUNT_FILE_PATH;
const serviceAccount = require(serviceAccountFilePath);

// initialize firebase
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

const db = fs.firestore();
const auth = fs.auth();

// auth.createUser;

const logsRef = db.collection('logs');

module.exports = {
  logsRef,
};
