// google logging document: https://cloud.google.com/logging/docs/reference/libraries
// Imports the Google Cloud client library
const { Logging } = require('@google-cloud/logging');

(projectId = 'aireumapp'), // Your Google Cloud Platform project ID
  (logName = 'snf_dev'); // The name of the log to write to
const serviceAccountFilePath = process.env.LOGGER_SERVICE_ACCOUNT_FILE_PATH;

// Creates a client
const logging = new Logging({
  projectId: projectId,
  keyFilename: serviceAccountFilePath,
});

// Selects the log to write to
const log = logging.log(logName);

const addLogger = async (severity, message, mode, source, moduleName, st) => {
  const logData = {
    severity: severity && severity.toUpperCase(),
    labels: {
      from: moduleName,
      timestamp: new Date().toISOString(),
      source,
      mode,
      st: process.env.STACKTRACE_ENABLE === 'T' ? st : '',
    },
    // A default log resource is added for some GCP environments
    // This log resource can be overwritten per spec:
    // https://cloud.google.com/logging/docs/reference/v2/rest/v2/MonitoredResource
    resource: {
      type: 'global',
    },
  };

  const text = 'Hello, world!';
  // const message = {
  //   name: 'King Arthur',
  //   quest: 'Find the Holy Grail',
  //   favorite_color: 'Blue',
  // };

  const json_Entry = log.entry(logData, message);

  // Asynchronously batch write the log entries
  await log.write(json_Entry).catch((err) => console.log(err));
};

module.exports = { log, addLogger };
