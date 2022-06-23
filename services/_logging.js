const { log, addLogger } = require('../util/googleLogging');
// Imports the Google Cloud client library
// const { Logging } = require('@google-cloud/logging');

// (projectId = 'aireumapp'), // Your Google Cloud Platform project ID
//   (logName = 'snf_dev'); // The name of the log to write to

// // Creates a client
// const logging = new Logging({
//   projectId: projectId,
//   keyFilename: '../../aireumapp-logger-service-account-file.json',
// });

// // Selects the log to write to
// const log = logging.log(logName);

const writeLogEntry = async (req, res) => {
  const { severity, message } = req.query;
  console.log('query is ', req.query);
  addLogger(severity, message);
  res.json({ message: 'wrote to log successfully' });
};

// async function printEntryMetadata() {
//   // List the most recent entries for a given log
//   // See https://googleapis.dev/nodejs/logging/latest/Logging.html#getEntries
//   const [entries] = await log.getEntries();
//   console.log('Logs:');
//   entries.forEach((entry) => {
//     const metadata = entry.metadata;
//     console.log(`${metadata.timestamp}:`, metadata[metadata.payload]);
//   });
// }

// async function deleteLog() {
//   // Deletes a logger and all its entries.
//   // Note that a deletion can take several minutes to take effect.
//   // See https://googleapis.dev/nodejs/logging/latest/Log.html#delete
//   await log.delete();
// }
module.exports = {
  writeLogEntry,
  // printEntryMetadata, deleteLog
};
