const { addLogger } = require('../util/googleLogging');
var path = require('path');
const { env } = require('process');

// get AppLog Mode from environment
const AppLogMode = process.env.SERVER_APP_APPLOG_MODE;

const logLevels = {
  Error: 0,
  Warning: 1,
  Info: 2,
  // AuditSuccess: 3,
  // AuditFailure: 4,
};

let moduleName = '?';

function setModuleName(name) {
  moduleName = path.parse(name).name;
}

// handle log to console
function logToConsole(message, mode, label) {
  var isLogToConsole = false;

  switch (AppLogMode) {
    case 'DEV':
      //Log Everything
      if (mode === 'PROD_DEBUG' || mode === 'DEV') {
        isLogToConsole = true;
      }
      isLogToConsole = true;
      break;
    case 'PROD_DEBUG':
      if (mode === 'PROD_DEBUG') {
        //Log everything except DEV (Debug and down)
        isLogToConsole = true;
      }
      break;
    case 'PROD':
      //Log everything except Dev and Debug (Info and down)
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
    label +
    ':';

  if (isLogToConsole) {
    console.log(msg, message);
  }
}

// handle basic log
function log(label, message, severity, mode) {
  //  function log(message, severity) {

  //log("asdasda","alert") == logAlert("asdsdad")
  //log("adsda","debug") == logDebug("asdasd")
  //log("asdas","dev") == log("asdas")
  //

  //Everytime Applog logs anything, do the followings:
  //1. var mode = mapping(incoming severity) (def=dev, dev=dev, debug=debug, all others=prod)
  //2. Decide to log or skip as fast as possible (Inspect mode vs env.mode)
  //3. var src = {"client","server1","smsserver"}  => Source
  //4. var st = (If Env.StackTraceEnable, get it (stub) )   => label
  //5. if mode =dev, severity=default => label

  //Last step.
  //compose an log object
  //if Console, show object
  //If Google, send to google Log

  if (!mode) mode = 'DEV';
  if (!label) label = 'Server';

  // console.log('module name is ', path.parse(label).name);

  logToConsole(message, mode, label);

  switch (severity) {
    case logLevels.Error:
      severity = 'Error';
      break;
    case logLevels.Warning:
      severity = 'Warning';
      break;
    case logLevels.Info:
      severity = 'Info';
      break;

    default:
  }

  addLogger(severity, label, message, moduleName);

  return false;
}

// handle error
function error(label, message, mode) {
  if (!mode) mode = 'DEV';
  if (!label) label = 'Server';
  logToConsole(message, mode, label);

  addLogger('error', label, message, moduleName);
  return false;
}

// handle warning
function warn(label, message, mode) {
  if (env.enableLoggin) if (!mode) mode = 'DEV';
  if (!label) label = 'Server';
  logToConsole(message, mode, label);

  addLogger('warning', label, message, moduleName);
  return false;
}

// handle info
function info(label, message, mode) {
  if (!mode) mode = 'DEV';
  if (!label) label = 'Server';
  logToConsole(message, mode, label);

  addLogger('info', label, message, moduleName);
  return false;
}

module.exports = { log, error, warn, info, setModuleName };
