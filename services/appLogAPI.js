const {
  log,
  logDebug,
  logInfo,
  logNotice,
  logWarning,
  logError,
  logCritical,
  logAlert,
  logEmergency,
} = require('../util/appLog');

const addLog = (req, res) => {
  const { message, severity, source, stacktrace } = req.query;
  log(message, severity, source, stacktrace);
  res.json({ message: 'wrote to log successfully' });
};

const addLogDebug = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logDebug(message, source, stacktrace);
  res.json({ message: 'wrote to logDebug successfully' });
};

const addLogInfo = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logInfo(message, source, stacktrace);
  res.json({ message: 'wrote to logInfo successfully' });
};

const addLogNotice = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logNotice(message, source, stacktrace);
  res.json({ message: 'wrote to logNotice successfully' });
};

const addLogWarning = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logWarning(message, source, stacktrace);
  res.json({ message: 'wrote to logWarning successfully' });
};

const addLogError = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logError(message, source, stacktrace);
  res.json({ message: 'wrote to logError successfully' });
};

const addLogCritical = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logCritical(message, source, stacktrace);
  res.json({ message: 'wrote to logCritical successfully' });
};

const addLogAlert = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logAlert(message, source, stacktrace);
  res.json({ message: 'wrote to logAlert successfully' });
};

const addLogEmergency = (req, res) => {
  const { message, source, stacktrace } = req.query;
  logEmergency(message, source, stacktrace);
  res.json({ message: 'wrote to logEmergency successfully' });
};

module.exports = {
  addLog,
  addLogDebug,
  addLogInfo,
  addLogNotice,
  addLogWarning,
  addLogError,
  addLogCritical,
  addLogAlert,
  addLogEmergency,
};
