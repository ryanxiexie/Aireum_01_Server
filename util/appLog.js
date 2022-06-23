const { addLogger } = require('./googleLogging');
var path = require('path');

// get AppLog Mode from .env
const AppLogMode = process.env.SERVER_APP_APPLOG_MODE;

// get LOG DESTINATION from .env
const isLogToGoogle = process.env.LOG_DESTINATION === 'GOOGLE';
// console.log('is Log to google ', isLogToGoogle);

// get srouce from .env
const src = process.env.SOURCE;

let moduleName = '?';

function setModuleName(name) {
  moduleName = path.parse(name).name;
}

// handle log to console
function logToConsole(message, mode) {
  var isLogToConsole = false;

  switch (AppLogMode) {
    case 'DEV':
      //Log Everything
      // if (mode === 'DEBUG' || mode === 'DEV') {
      //   isLogToConsole = true;
      // }
      isLogToConsole = true;
      break;
    case 'DEBUG':
      //Log everything except DEV (Debug and down)
      if (mode === 'DEBUG' || mode === 'PROD') {
        isLogToConsole = true;
      }
      break;
    case 'PROD':
      //Log everything except Dev and Debug (Info and down)
      if (mode === 'PROD') {
        isLogToConsole = true;
      }
      break;

    default:
  }

  const msg =
    new Date().toLocaleTimeString() +
    '|AppLog(' +
    mode +
    ')>' +
    moduleName +
    '>' +
    ':';

  if (isLogToConsole) {
    console.log(msg, message);
    // console.trace('here I am!');

    // process.env.STACKTRACE_ENABLE === 'T' && console.log('here I am', st);
  }
}

// handle basic log
function log(message, severity, source, stacktrace) {
  let mode = '';

  if (!severity) severity = 'DEFAULT';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;

  switch (severity.toUpperCase()) {
    case 'DEFAULT':
      mode = 'DEV';
      break;
    case 'DEV':
      mode = 'DEV';
      break;
    case 'DEBUG':
      mode = 'DEBUG';
      break;
    case 'INFO':
      mode = 'PROD';
      break;
    case 'NOTICE':
      mode = 'PROD';
      break;
    case 'WARNING':
      mode = 'PROD';
      break;
    case 'ERROR':
      mode = 'PROD';
      break;
    case 'CRITICAL':
      mode = 'PROD';
      break;
    case 'ALERT':
      mode = 'PROD';
      break;
    case 'EMERGENCY':
      mode = 'PROD';
      break;
    default:
      mode = 'DEV';
  }

  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger(severity, message, mode, source, moduleName, stacktrace);
  return false;
}

// handle debug
function logDebug(message, source, stacktrace) {
  let mode = 'DEBUG';
  // ?Default message
  if (!message) message = 'this is debug';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;

  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('DEBUG', message, mode, source, moduleName, stacktrace);
  return false;
}

// handle info, use for login, user login start/success/fail/logout, register start/success/fail.
function logInfo(message, source, stacktrace) {
  let mode = 'PROD';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;
  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('INFO', message, mode, source, moduleName, stacktrace);
  return false;
}

// handle notice
function logNotice(message, source, stacktrace) {
  let mode = 'PROD';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;
  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('NOTICE', message, mode, source, moduleName, stacktrace);
  return false;
}

// handle warning
function logWarning(message, source, stacktrace) {
  let mode = 'PROD';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;
  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('WARNING', message, mode, source, moduleName, stacktrace);
  return false;
}

// handle error
function logError(message, source, stacktrace) {
  let mode = 'PROD';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;
  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('ERROR', message, mode, source, moduleName, stacktrace);
  return false;
}

// handle critical
function logCritical(message, source, stacktrace) {
  let mode = 'PROD';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;
  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('CRITICAL', message, mode, source, moduleName, stacktrace);
  return false;
}

// handle alert
function logAlert(message, source, stacktrace) {
  let mode = 'PROD';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;
  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('ALERT', message, mode, source, moduleName, stacktrace);
  return false;
}

// handle emergency
function logEmergency(message, source, stacktrace) {
  let mode = 'PROD';
  if (!source) source = src;
  if (!stacktrace) stacktrace = new Error().stack;
  logToConsole(message, mode);
  isLogToGoogle &&
    addLogger('EMERGENCY', message, mode, source, moduleName, stacktrace);
  return false;
}

module.exports = {
  log,
  logDebug,
  logInfo,
  logNotice,
  logWarning,
  logError,
  logCritical,
  logAlert,
  logEmergency,
  setModuleName,
};
